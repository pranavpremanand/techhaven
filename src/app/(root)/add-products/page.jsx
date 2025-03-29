"use client";

// import { useForm } from "react-hook-form";
// import React, { useState } from "react";
// import { uploadImageToCloudinary } from "@/utils/cloudinary";

// function AddProduct() {
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [uploadedUrl, setUploadedUrl] = useState("");

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     setError,
//     formState: { errors },
//   } = useForm();

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleUpload = async () => {
//     if (!image) {
//       alert("Please select an image first!");
//       return;
//     }

//     setLoading(true);
//     try {
//       const url = await uploadImageToCloudinary(image);
//       setUploadedUrl(url);
//       alert("Image uploaded successfully!");
//     } catch (error) {
//       alert("Upload failed. Please try again.");
//     }
//     setLoading(false);
//   };

//   return (
//     <>
//       {" "}
//       <div className="space-y-7">
//         <div className="header-height section-py px-10">
//           <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
//             <div className="grid sm:grid-cols-1 gap-4">
//               {/* Image Upload */}
//               <div className="flex flex-col gap-1">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                 />
//                 {preview && (
//                   <img
//                     src={preview}
//                     alt="Preview"
//                     width="150"
//                     style={{ marginTop: 10 }}
//                   />
//                 )}
//                 <button
//                   onClick={handleUpload}
//                   // disabled={loading}
//                   className="primary-btn"
//                 >
//                   {/* {loading ? "Uploading..." : "Upload Image"} */}
//                   Upload Image
//                 </button>
//                 {uploadedUrl && (
//                   <div>
//                     <p>Uploaded Image:</p>
//                     <img src={uploadedUrl} alt="Uploaded" width="200" />
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="grid sm:grid-cols-2 gap-4">
//               {/* First Name */}
//               <div className="flex flex-col gap-1">
//                 <label className="text-sm">Product Name</label>
//                 <input
//                   type="text"
//                   {...register("firstName")}
//                   className={`p-2 rounded-md outline-none border-2 w-full "text-black"`}
//                 />
//                 {errors.firstName && (
//                   <small className="text-red-600">
//                     {errors.firstName.message}
//                   </small>
//                 )}
//               </div>

//               {/* Last Name */}
//               <div className="flex flex-col gap-1">
//                 <label className="text-sm">Price</label>
//                 <input
//                   type="text"
//                   {...register("lastName")}
//                   className={`p-2 rounded-md outline-none border-2 w-full "text-black"`}
//                 />
//                 {errors.lastName && (
//                   <small className="text-red-600">
//                     {errors.lastName.message}
//                   </small>
//                 )}
//               </div>
//             </div>

//             <div className="grid sm:grid-cols-2 gap-4">
//               {/* Email */}
//               <div className="flex flex-col gap-1">
//                 <label className="text-sm">Offer Percentage</label>
//                 <input
//                   type="email"
//                   {...register("email")}
//                   className={`p-2 rounded-md outline-none border-2 w-full "text-black"`}
//                 />
//                 {errors.email && (
//                   <small className="text-red-600">{errors.email.message}</small>
//                 )}
//               </div>

//               {/* Phone Number */}
//               <div className="flex flex-col gap-1">
//                 <label className="text-sm">Description</label>
//                 <input
//                   type="tel"
//                   {...register("phone")}
//                   className={`p-2 rounded-md outline-none border-2 w-full "text-black"`}
//                   placeholder="Enter phone number"
//                 />
//                 {errors.phone && (
//                   <small className="text-red-600">{errors.phone.message}</small>
//                 )}
//               </div>
//             </div>

//             <div className="flex gap-5">
//               <button type="submit" className="primary-btn">
//                 Add products
//               </button>
//               <button type="button" className="secondary-btn">
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AddProduct;

import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { uploadImageToCloudinary } from "@/utils/cloudinary";
import toast from "react-hot-toast";

const UploadProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState([]);

  const resizeImageToSquare = (file, size = 500) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();
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

          canvas.toBlob((blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: "image/jpeg" }));
            } else {
              reject(new Error("Image processing failed"));
            }
          }, "image/jpeg");
        };
      };

      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      alert("You can only upload up to 5 images.");
      return;
    }

    const processedImages = await Promise.all(
      files.map((file) => resizeImageToSquare(file, 500))
    );

    setImages((prev) => [...prev, ...processedImages]);
    setPreview(processedImages.map((image) => URL.createObjectURL(image)));
  };

  const uploadImagesToCloudinary = async () => {
    const UPLOAD_PRESET = "Products"; // Your upload preset name

    if (images.length == 0) {
      toast.error("Please Select at least one image before proceeding.");
      return;
    }
    setUploading(true);
    const urls = [];

    for (const image of images) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", UPLOAD_PRESET);

      try {
        const res = await uploadImageToCloudinary(formData); //cloudinary upload area
        console.log(res, "ress");

        urls.push(res.data.secure_url);
        console.log(urls, "url");
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
    setUploadedUrls((prevUrls) => [...prevUrls, ...urls]);
    setImages([]);
    setPreview([]);
    setUploading(false);
  };

  const onSubmit = async (data) => {
    if (uploadedUrls.length === 0) {
      alert("Please upload at least one image.");
      return;
    }
    const productDetails = { ...data, imageUrls: uploadedUrls };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products`,
        productDetails
      );
      console.log("Product saved:", res.data);
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  return (
    <>
      <div className="space-y-7">
        <div className="header-height section-py px-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4"
          >
            <div className="grid sm:grid-cols-1 gap-4">
              <div className="flex flex-col gap-1">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
                {preview.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt="Preview"
                    width="150"
                    style={{ marginTop: 10 }}
                  />
                ))}
                <button
                  type="button"
                  onClick={uploadImagesToCloudinary}
                  className="primary-btn"
                >
                  {uploading ? "Uploading..." : "Upload Images"}
                </button>
                <div className="flex gap-5">
                  {uploadedUrls.length > 0 &&
                    uploadedUrls.map((url, index) => (
                      <div key={index}>
                        <img src={url} alt="Uploaded" width="200" />
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm">Product Name</label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Product name is required",
                  })}
                  className="p-2 rounded-md outline-none border-2 w-full"
                />
                {errors.name && (
                  <small className="text-red-600">{errors.name.message}</small>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm">Price</label>
                <input
                  type="text"
                  {...register("price", { required: "Price is required" })}
                  className="p-2 rounded-md outline-none border-2 w-full"
                />
                {errors.price && (
                  <small className="text-red-600">{errors.price.message}</small>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm">Offer Percentage</label>
                <input
                  type="text"
                  {...register("offer", {
                    required: "Offer percentage is required",
                  })}
                  className="p-2 rounded-md outline-none border-2 w-full"
                />
                {errors.offer && (
                  <small className="text-red-600">{errors.offer.message}</small>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm">Description</label>
                <input
                  type="text"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="p-2 rounded-md outline-none border-2 w-full"
                />
                {errors.description && (
                  <small className="text-red-600">
                    {errors.description.message}
                  </small>
                )}
              </div>
            </div>

            <div className="flex gap-5">
              <button type="submit" className="primary-btn">
                Add Product
              </button>
              <button type="button" className="secondary-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadProduct;
