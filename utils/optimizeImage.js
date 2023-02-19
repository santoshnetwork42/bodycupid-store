// import path from "path";
// import fs from "fs/promises";
// import { cwd } from "process";
// import sharp from "sharp";

const optimizeImage = async ({ src, type = "url", options = {} }) => {
  return {
    originalUrl: src,
    width: 0,
    height: 0,
    placeholder: "",
  };

  let output = "";
  const { quality = 15, resize = 400, blur = 1 } = options;

  const returnValues = {
    originalUrl: src,
  };

  try {
    let imageBuffer = null;

    if (type === "url") {
      const fetchImageResponse = await fetch(src);
      imageBuffer = Buffer.from(await fetchImageResponse.arrayBuffer());
    } else if (type === "self-hosted") {
      const fullPath = path.join(cwd(), "public", src);

      imageBuffer = await fs.readFile(fullPath);
    }

    if (imageBuffer) {
      const sharpInstance = sharp(imageBuffer);
      const imageMetaData = await sharpInstance.metadata();

      const webpBuffer = await sharpInstance
        .resize(resize)
        .webp({
          quality,
        })
        .blur(blur)
        .toBuffer();
      output = `data:image/webp;base64,${webpBuffer.toString("base64")}`;

      returnValues.placeholder = output;
      returnValues.width = imageMetaData.width;
      returnValues.height = imageMetaData.height;
    }
  } catch (e) {}

  return returnValues;
};

export default optimizeImage;
