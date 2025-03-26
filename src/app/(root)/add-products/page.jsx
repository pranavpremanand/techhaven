"use client";

import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { uploadImageToCloudinary } from "@/utils/cloudinary";

function AddProduct() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true);
    try {
      const url = await uploadImageToCloudinary(image);
      setUploadedUrl(url);
      alert("Image uploaded successfully!");
    } catch (error) {
      alert("Upload failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      {" "}
      <div className="space-y-7">
        <div className="header-height section-py px-10">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <div className="grid sm:grid-cols-1 gap-4">
              {/* Image Upload */}
              <div className="flex flex-col gap-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    width="150"
                    style={{ marginTop: 10 }}
                  />
                )}
                <button
                  onClick={handleUpload}
                  // disabled={loading}
                  className="primary-btn"
                >
                  {/* {loading ? "Uploading..." : "Upload Image"} */}
                  Upload Image
                </button>
                {uploadedUrl && (
                  <div>
                    <p>Uploaded Image:</p>
                    <img src={uploadedUrl} alt="Uploaded" width="200" />
                  </div>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="flex flex-col gap-1">
                <label className="text-sm">Product Name</label>
                <input
                  type="text"
                  {...register("firstName")}
                  className={`p-2 rounded-md outline-none border-2 w-full "text-black"`}
                />
                {errors.firstName && (
                  <small className="text-red-600">
                    {errors.firstName.message}
                  </small>
                )}
              </div>

              {/* Last Name */}
              <div className="flex flex-col gap-1">
                <label className="text-sm">Price</label>
                <input
                  type="text"
                  {...register("lastName")}
                  className={`p-2 rounded-md outline-none border-2 w-full "text-black"`}
                />
                {errors.lastName && (
                  <small className="text-red-600">
                    {errors.lastName.message}
                  </small>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-sm">Offer Percentage</label>
                <input
                  type="email"
                  {...register("email")}
                  className={`p-2 rounded-md outline-none border-2 w-full "text-black"`}
                />
                {errors.email && (
                  <small className="text-red-600">{errors.email.message}</small>
                )}
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1">
                <label className="text-sm">Description</label>
                <input
                  type="tel"
                  {...register("phone")}
                  className={`p-2 rounded-md outline-none border-2 w-full "text-black"`}
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <small className="text-red-600">{errors.phone.message}</small>
                )}
              </div>
            </div>

            <div className="flex gap-5">
              <button type="submit" className="primary-btn">
                Add products
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
}

export default AddProduct;
