"use client";

import SelectCategoryDropdown from "@/components/admin/addProduct/SelectCategoryDropdown";
import { PrivateRoute } from "@/components/admin/AdminRouteWrappers";
import { uploadImageToCloudinary } from "@/utils/cloudinary";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { PiImageLight } from "react-icons/pi";
import { useForm, Controller } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProductById, updateProductDetails } from "@/utils/adminApi";
import DataFetchError from "@/components/DataFetchError";
import IsFetchingLoader from "@/components/IsFetchingLoader";

const Page = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  // Form setup
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  // Image state management
  const [newImages, setNewImages] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const fileInputRef = useRef(null);

  // Fetch product data
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await getProductById(id);
      reset({
        productName: res.data.productName,
        price: res.data.price,
        offerPercentage: res.data.offerPercentage,
        description: res.data.description,
        isOutOfStock: res.data.isOutOfStock,
        category: res.data.category,
      });
      setExistingImages(res.data.imageUrls || []);

      return res.data;
    },
  });

  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: (updatedProduct) =>
      updateProductDetails({ id, data: updatedProduct }),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["product", "products", id]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update product");
    },
  });

  // Image processing
  const resizeImageToSquare = (file, size = 500) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = document.createElement("img");
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = size;
          canvas.height = size;

          const minSize = Math.min(img.width, img.height);
          const sx = (img.width - minSize) / 2;
          const sy = (img.height - minSize) / 2;

          ctx.drawImage(img, sx, sy, minSize, minSize, 0, 0, size, size);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(new File([blob], file.name, { type: "image/jpeg" }));
              } else {
                reject(new Error("Image processing failed"));
              }
            },
            "image/jpeg",
            0.92
          );
        };

        img.onerror = () => reject(new Error("Failed to load image"));
      };

      reader.onerror = (error) => reject(error);
    });
  };

  // Count vacant slots and total active images
  const getImageCounts = () => {
    const activeImages = existingImages.filter((img) => img !== null);
    const vacantSlots = existingImages.filter((img) => img === null).length;
    const totalVacancies = 5 - activeImages.length;

    return {
      activeCount: activeImages.length,
      vacantSlots,
      totalVacancies,
    };
  };

  // Handle file selection
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const { totalVacancies } = getImageCounts();

    // Check if adding these files would exceed the maximum limit
    if (files.length > totalVacancies) {
      toast.error(`You can only upload up to ${totalVacancies} more images.`);
      return;
    }

    try {
      const processedImages = await Promise.all(
        files.map((file) => resizeImageToSquare(file, 500))
      );
      setNewImages((prev) => [...prev, ...processedImages]);

      const newPreviews = processedImages.map((image) =>
        URL.createObjectURL(image)
      );
      setNewImagePreviews((prev) => [...prev, ...newPreviews]);
    } catch (error) {
      toast.error("Error processing images");
      console.error(error);
    }
  };

  // Handle deleting existing image
  const handleDeleteExistingImage = (index) => {
    // Create a new array with the image at index set to null
    const updatedImages = [...existingImages];
    updatedImages[index] = null;
    setExistingImages(updatedImages);
  };

  // Handle removing a new image from the queue
  const handleRemoveNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Upload images to Cloudinary and update existing images
  const uploadImagesToCloudinary = async () => {
    if (!newImages.length) {
      toast.error("No new images to upload");
      return;
    }

    setUploading(true);
    const UPLOAD_PRESET = "Products";
    const uploadedUrls = [];

    try {
      // Upload all new images
      for (const image of newImages) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", UPLOAD_PRESET);

        const res = await uploadImageToCloudinary(formData);
        if (res.status === 200) {
          uploadedUrls.push(res.data.secure_url);
        }
      }

      if (uploadedUrls.length !== newImages.length) {
        toast.error("Some images failed to upload");
        return;
      }

      // Merge with existing images - replace nulls first
      let finalImageUrls = [...existingImages];
      let newImageIndex = 0;

      // First, fill any null slots with new images
      for (let i = 0; i < finalImageUrls.length; i++) {
        if (finalImageUrls[i] === null && newImageIndex < uploadedUrls.length) {
          finalImageUrls[i] = uploadedUrls[newImageIndex];
          newImageIndex++;
        }
      }

      // Then add any remaining new images at the end
      while (newImageIndex < uploadedUrls.length) {
        finalImageUrls.push(uploadedUrls[newImageIndex]);
        newImageIndex++;
      }

      // Remove null values
      finalImageUrls = finalImageUrls.filter((url) => url !== null);

      // Update existing images state
      setExistingImages(finalImageUrls);

      // Clear new images
      setNewImages([]);
      setNewImagePreviews([]);

      toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
    } catch (error) {
      toast.error("Failed to upload images");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  // Form submission
  const onSubmit = async (data) => {
    // Check if we have at least one image
    const activeImages = existingImages.filter((img) => img !== null);
    if (activeImages.length === 0) {
      toast.error("Please keep at least one image");
      return;
    }

    // If there are new images that haven't been uploaded yet, alert the user
    if (newImages.length > 0) {
      toast.error("Please upload new images before submitting");
      return;
    }

    try {
      const res = await updateProductDetails({
        id,
        data: {
          ...data,
          imageUrls: existingImages.filter((url) => url !== null),
        },
      });

      if (res.data.success) {
        console.log(res.data);
        toast.success(res.data.message);
        queryClient.invalidateQueries("products");
        router.push("/admin/products");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to update product");
      console.error(error);
    }
  };

  if (isLoading)
    return (
      <PrivateRoute>
        <IsFetchingLoader />
      </PrivateRoute>
    );
  if (isError)
    return (
      <PrivateRoute>
        <DataFetchError error={error} />
      </PrivateRoute>
    );

  const { activeCount, totalVacancies } = getImageCounts();
  const remainingVacancies = totalVacancies - newImages.length;
  const canUploadMore = remainingVacancies > 0;

  return (
    <PrivateRoute>
      <div className="space-y-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="mt-2 md:mt-0">
            <span className="text-sm text-gray-400 block">
              Home &gt; All Products &gt; Edit Product
            </span>
          </div>
        </div>

        <div className="flex flex-col-reverse xl:grid grid-cols-2 gap-7">
          {/* Product Details Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4 h-fit"
          >
            <h3 className="text-xl font-medium">Product Details</h3>

            <div className="space-y-1">
              <label className="text-sm">Product Name</label>
              <input
                type="text"
                placeholder="Product Name"
                className="border p-2 border-white/70 rounded-lg w-full outline-none text-white bg-transparent"
                {...register("productName", {
                  required: "Product name is required",
                  minLength: {
                    value: 2,
                    message: "Product name must be at least 2 characters",
                  },
                })}
              />
              {errors.productName && (
                <small className="text-red-500">
                  {errors.productName.message}
                </small>
              )}
            </div>

            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <SelectCategoryDropdown
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.category}
                />
              )}
            />

            <div className="space-y-1">
              <label className="text-sm">Description</label>
              <textarea
                rows="6"
                placeholder="Enter HTML like <p>Your product description here</p>"
                className="border p-2 border-white/70 rounded-lg w-full outline-none text-white bg-transparent"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
                  },
                })}
              />
              {errors.description && (
                <small className="text-red-500">
                  {errors.description.message}
                </small>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm">Price</label>
              <input
                type="number"
                placeholder="Enter Price"
                className="border p-2 border-white/70 rounded-lg w-full outline-none text-white bg-transparent"
                {...register("price", {
                  required: "Price is required",
                  min: {
                    value: 0,
                    message: "Price must be positive",
                  },
                  valueAsNumber: true,
                })}
                min="0"
                step="0.01"
              />
              {errors.price && (
                <small className="text-red-500">{errors.price.message}</small>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm">Offer Percentage</label>
              <input
                type="number"
                placeholder="Enter Offer Percentage"
                className="border p-2 border-white/70 rounded-lg w-full outline-none text-white bg-transparent"
                {...register("offerPercentage", {
                  required: "Offer percentage is required",
                  min: {
                    value: 0,
                    message: "Offer must be positive",
                  },
                  max: {
                    value: 100,
                    message: "Offer cannot exceed 100%",
                  },
                  valueAsNumber: true,
                })}
                min="0"
                max="100"
              />
              {errors.offerPercentage && (
                <small className="text-red-500">
                  {errors.offerPercentage.message}
                </small>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                {...register("isOutOfStock")}
                className="rounded-md outline-none w-5 h-5 text-black accent-primary"
              />
              <label className="text-sm">
                Tick the checkbox if the product is out of stock
              </label>
            </div>

            <button
              type="submit"
              className="primary-btn w-full mt-3"
              disabled={
                isSubmitting ||
                updateProductMutation.isPending ||
                uploading ||
                newImages.length > 0
              }
            >
              {isSubmitting || updateProductMutation.isPending
                ? "Updating..."
                : newImages.length > 0
                ? "Upload Images First"
                : "Update Product"}
            </button>
          </form>

          {/* Product Images Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Product Gallery</h3>

            {/* Main Preview Image */}
            {(newImagePreviews.length > 0 ||
              existingImages.some((img) => img !== null)) && (
              <div className="aspect-video bg-white/10 flex items-center justify-center rounded-xl">
                <img
                  src={
                    newImagePreviews[0] ||
                    existingImages.find((img) => img !== null)
                  }
                  className="h-full w-full object-contain aspect-square"
                  alt="Product preview"
                />
              </div>
            )}

            {/* Upload Button - Only show if there's room for more images and no pending uploads */}
            {canUploadMore && newImages.length === 0 && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full flex-col items-center text-center space-y-2 bg-white/10 p-4 rounded-xl"
              >
                <PiImageLight size={45} />
                <span className="text-white/40 font-light text-sm">
                  Browse your image here, <br />
                  Jpeg, jpg & png are allowed
                  <br />
                  <strong>Available slots: {remainingVacancies}/5</strong>
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  accept="image/jpeg, image/png, image/jpg"
                  multiple
                  onChange={handleFileChange}
                />
              </button>
            )}

            {/* New Images Preview and Upload Button */}
            {newImagePreviews.length > 0 && (
              <div className="space-y-4">
                <h6 className="text-white font-medium">
                  New Images ({newImagePreviews.length})
                </h6>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {newImagePreviews.map((src, index) => (
                    <div
                      key={`preview-${index}`}
                      className="p-3 bg-white rounded-lg relative"
                    >
                      <img
                        src={src}
                        alt="Preview"
                        className="rounded-lg object-contain w-full aspect-square"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveNewImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        aria-label="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                {/* Button to upload new images */}
                <button
                  type="button"
                  onClick={uploadImagesToCloudinary}
                  disabled={uploading || newImages.length === 0}
                  className="primary-btn w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? "Uploading..." : "Upload New Images"}
                </button>

                {/* Add more images button - only show if there's room for more */}
                {remainingVacancies > 0 && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex w-full flex-col items-center text-center space-y-2 bg-white/10 p-4 rounded-xl"
                  >
                    <PiImageLight size={45} />
                    <span className="text-white/40 font-light text-sm">
                      Add more images
                      <br />
                      <strong>Remaining slots: {remainingVacancies}/5</strong>
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      hidden
                      accept="image/jpeg, image/png, image/jpg"
                      multiple
                      onChange={handleFileChange}
                    />
                  </button>
                )}
              </div>
            )}

            {/* Current Images with Delete Option */}
            {existingImages.some((img) => img !== null) && (
              <div className="space-y-2">
                <h6 className="text-white font-medium">
                  Current Images ({activeCount}/5)
                </h6>
                <div className="grid grid-cols-5 gap-3">
                  {existingImages.map(
                    (src, index) =>
                      src !== null && (
                        <div
                          key={`existing-${index}`}
                          className="p-1 bg-white rounded-md relative"
                        >
                          <img
                            src={src}
                            alt="Product image"
                            className="rounded-md object-contain w-full aspect-square"
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteExistingImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                            aria-label="Delete image"
                          >
                            ×
                          </button>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Page;
