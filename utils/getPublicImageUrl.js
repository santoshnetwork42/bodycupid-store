import { MEDIA_BASE_URL } from "~/constant";

export const getPublicImageURL = (key, resize) => {
  if (resize) return `${MEDIA_BASE_URL}/public/${key}?resize=${resize}`;
  return `${MEDIA_BASE_URL}/public/${key}`;
}; 