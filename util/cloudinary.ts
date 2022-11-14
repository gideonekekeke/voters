import cloud, { v2 } from "cloudinary";

const cloudinary: typeof v2 = cloud.v2;

cloudinary.config({
  cloud_name: "dv4dlmp4e",
  api_key: "464513458841612",
  api_secret: "VxFfeGaNMPPudxcq0GWcsh6zfRk",
});

export default cloudinary;
