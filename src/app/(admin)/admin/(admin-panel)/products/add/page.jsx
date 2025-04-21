"use client";

import SelectCategoryDropdown from "@/components/admin/addProduct/SelectCategoryDropdown";
import { PrivateRoute } from "@/components/admin/AdminRouteWrappers";
import { uploadImageToCloudinary } from "@/utils/cloudinary";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { PiImageLight } from "react-icons/pi";
import { useForm, Controller } from "react-hook-form";
import { addProduct } from "@/utils/adminApi";

const Page = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      productName: "",
      price: 0,
      offerPercentage: 0,
      description: "",
      isOutOfStock: false,
      category: "",
    },
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const fileInputRef = useRef(null);

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

  const uploadImagesToCloudinary = async () => {
    const UPLOAD_PRESET = "Products";

    if (images.length === 0) {
      toast.error("Please select at least one image before proceeding.");
      return;
    }
    if (uploadedUrls.length + images.length > 5) {
      toast.error("You can only upload up to 5 images.");
      return;
    }

    setUploading(true);
    const urls = [];

    for (const image of images) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", UPLOAD_PRESET);

      try {
        const res = await uploadImageToCloudinary(formData);
        if (res.status === 200) {
          urls.push(res.data.secure_url);
        } else {
          toast.error("Image upload failed.");
        }
      } catch (err) {
        console.error("Upload failed:", err);
        toast.error("Image upload failed.");
      }
    }

    if (urls.length > 0) {
      toast.success(`${urls.length} image(s) uploaded successfully.`);
    }

    setUploadedUrls((prevUrls) => [...prevUrls, ...urls]);
    setImages([]);
    setPreview([]);
    setUploading(false);
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (
      files.length + images.length > 5 ||
      files.length + uploadedUrls.length > 5
    ) {
      toast.error("You can only upload up to 5 images.");
      return;
    }

    try {
      const processedImages = await Promise.all(
        files.map((file) => resizeImageToSquare(file, 500))
      );

      setImages((prev) => [...prev, ...processedImages]);
      const updatedPreviews = processedImages.map((image) =>
        URL.createObjectURL(image)
      );
      setPreview((prev) => [...prev, ...updatedPreviews]);
    } catch (error) {
      toast.error("Error processing images");
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    if (uploadedUrls.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    try {
      const productDetails = {
        ...data,
        imageUrls: uploadedUrls,
      };

      const res = await addProduct(productDetails);
      if (res.data.success) {
        toast.success(res.data.message);
        setUploadedUrls([]);
        setImages([]);
        setPreview([]);
        reset();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
      console.error(err);
    }
  };

  return (
    <PrivateRoute>
      <div className="space-y-6 text-white">
        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="mt-2 md:mt-0">
            <span className="text-sm text-gray-400 block">
              Home &gt; All Products &gt; Add Product
            </span>
          </div>
        </div>

        <div className="flex flex-col-reverse xl:grid grid-cols-2 gap-7">
          {/* Product Details */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4 h-fit"
          >
            <h3 className="text-xl font-medium">Product Details</h3>

            {/* Product Name */}
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

            {/* Category */}
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

            {/* Description */}
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

            {/* Price */}
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

            {/* Offer Percentage */}
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

            {/* Out of Stock Checkbox */}
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

            {/* Submit Button */}
            <button
              type="submit"
              className="primary-btn w-full mt-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Product"}
            </button>
          </form>

          {/* Product Images */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Product Gallery</h3>
            {(preview.length > 0 || uploadedUrls.length > 0) && (
              <div className="aspect-video bg-white/10 flex items-center justify-center rounded-xl">
                <img
                  src={preview[0] || uploadedUrls[0]}
                  className="h-full w-full object-contain aspect-square"
                  alt="Product"
                />
              </div>
            )}

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadedUrls.length === 5}
              className="disabled:cursor-not-allowed flex w-full flex-col items-center text-center space-y-2 bg-white/10 p-4 rounded-xl"
            >
              <PiImageLight size={45} />
              {uploadedUrls.length < 5 ? (
                <span className="text-white/40 font-light text-sm">
                  Browse your image here, <br />
                  Jpeg, jpg & png are allowed
                </span>
              ) : (
                <span className="text-white/40 font-light text-sm">
                  Maximum 5 images are allowed
                </span>
              )}
              <input
                ref={fileInputRef}
                type="file"
                hidden
                accept="image/jpeg, image/png, image/jpg"
                multiple
                onChange={handleFileChange}
              />
            </button>

            {preview.length > 0 && (
              <div className="space-y-2">
                <h6 className="text-white font-medium">
                  Preview ({preview.length})
                </h6>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {preview.map((src, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg">
                      <img
                        src={src}
                        alt="Preview"
                        width="150"
                        className="rounded-lg object-contain w-full aspect-square"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {uploadedUrls.length > 0 && (
              <div className="space-y-2">
                <h6 className="text-white font-medium">
                  Uploaded ({uploadedUrls.length})
                </h6>
                <div className="grid grid-cols-5 gap-3">
                  {uploadedUrls.map((src, index) => (
                    <div key={index} className="p-1 bg-white rounded-md">
                      <img
                        src={src}
                        alt="Uploaded"
                        width="50"
                        className="rounded-md object-contain w-full aspect-square"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(uploadedUrls.length === 0 || uploadedUrls.length < 5) && (
              <button
                type="button"
                onClick={uploadImagesToCloudinary}
                disabled={uploading || preview.length === 0}
                className="primary-btn !bg-white/20 border border-white/50 w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? "Uploading..." : "Upload Images"}
              </button>
            )}
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Page;
