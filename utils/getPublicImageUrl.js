import { MEDIA_BASE_URL } from "~/config";

export const getPublicImageURL = (key, resize, quality = 75) => {
  if (resize) {
    return `https://${MEDIA_BASE_URL}/public/${key}?w=${resize}&q=${Math.max(
      75,
      quality
    )}&f=webp`;
  }
  return `https://${MEDIA_BASE_URL}/public/${key}?f=webp`;
};
