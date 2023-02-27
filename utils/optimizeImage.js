import path from "path";
import fs from "fs/promises";
import { cwd } from "process";
import sharp from "sharp";

const { NODE_ENV } = process.env;

const optimizeImage = async ({ src, type = "url", options = {} }) => {
  let output = "";
  const { quality = 15, resize = 400, blur = 1 } = options;

  const returnValues = {
    originalUrl: src,
  };

  if (["prod", "production"].includes(NODE_ENV)) {
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
    } catch (e) { }
  } else {
    returnValues.placeholder = "";
    returnValues.width = 0;
    returnValues.height = 0;
  }


  return returnValues;
};

export default optimizeImage;
