import { MEDIA_BASE_URL } from "~/config";

export const getPublicImageURL = (key, resize) => {
  if (resize) return `${MEDIA_BASE_URL}/public/${key}?resize=${resize}`;
  return `https://${MEDIA_BASE_URL}/public/${key}`;
}; 