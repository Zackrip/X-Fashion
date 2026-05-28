const Imagekit = require("imagekit");

let imagekit = null;
if (process.env.IMAGEKIT_PUBLIC_KEY && process.env.IMAGEKIT_PRIVATE_KEY) {
  imagekit = new Imagekit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });
}

async function uploadFile(file, fileName) {
  if (!file) {
    throw new Error("File buffer is missing");
  }

  if (!imagekit) {
    throw new Error("ImageKit is not configured");
  }

  const base64File = file.toString("base64");

  const result = await imagekit.upload({
    file: base64File,
    fileName: fileName,
  });

  return result;
}

module.exports = {
  uploadFile,
};
