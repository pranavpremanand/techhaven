export const uploadImageToCloudinary = async (file) => {
  const CLOUD_NAME = dqpio3kre; // Your Cloudinary cloud name
  const UPLOAD_PRESET = "Products"; // Your upload preset name

  console.log(CLOUD_NAME,"Clo");
  

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url; // Returns the uploaded image URL
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw new Error("Image upload failed");
  }
};
