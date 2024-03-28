import { MEDIA_BASE_URL } from "~/config";

export const getPublicImageURL = (key, resize, quality = 75) => {
  if (resize) {
    return `https://${MEDIA_BASE_URL}/public/${key}?w=${resize}&q=${quality}`;
  }
  return `https://${MEDIA_BASE_URL}/public/${key}`;
};
