import sharp from "sharp";
import fs from "fs/promises";

const optimizeImage = async ({ src, type = "url" }) => {
  let output = "";

  try {
    let imageBuffer = null;

    if (type === "url") {
      const fetchImageResponse = await fetch(src);
      imageBuffer = Buffer.from(await fetchImageResponse.arrayBuffer());
    } else if (type === "path") {
      imageBuffer = await fs.readFile(src);
    }

    if (imageBuffer) {
      const webpBuffer = await sharp(imageBuffer)
        .resize(400)
        .webp({
          quality: 15,
        })
        .blur(1)
        .toBuffer();
      output = `data:image/webp;base64,${webpBuffer.toString("base64")}`;
    }
  } catch (e) {}

  return {
    placeholder: output,
  };
};

export default optimizeImage;
