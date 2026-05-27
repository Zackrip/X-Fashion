const Imagekit = require("imagekit");

const imagekit = new Imagekit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file, fileName) {
  if (!file) {
    throw new Error("File buffer is missing");
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
