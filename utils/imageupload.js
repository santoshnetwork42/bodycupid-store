import { Storage } from "aws-amplify";

export const uploadImages = async (file, prefix = "wow", level = "public") => {
  if (file) {
    const fileName = `${prefix}/${new Date().valueOf()}-${file.name}`;
    const { key } = await Storage.put(fileName, file, {
      contentType: file.type,
      level,
    });
    return key;
  }
};
