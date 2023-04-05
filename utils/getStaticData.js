import { getPublicImageURL } from "./getPublicImageUrl";
import optimizeImage from "./optimizeImage";

export const optimizeProduct = async (product) => {
  const { images } = product;

  const optimizedImages = await Promise.all(
    images.items.map(async (image) => {
      const imageUrl = getPublicImageURL(image.imageKey);
      const optimizedProductImage = await optimizeImage({
        src: imageUrl,
        options: {
          resize: 200,
          blur: 3,
        },
      });
      return { ...image, image: optimizedProductImage };
    })
  );

  return {
    ...product,
    images: {
      ...images,
      items: optimizedImages,
    },
  };
};

export const optimizeCategory = async (category) => {
  const { bannerUrl } = category;
  if (bannerUrl) {
    const imageUrl = getPublicImageURL(bannerUrl);
    const optimizedCategoryBanner = await optimizeImage({
      src: imageUrl,
    });
    return { ...category, bannerImage: optimizedCategoryBanner };
  }
  return { ...category };
};

export const optimizeStore = async (banner) => {
  if (banner) {
    const { webKey, mobileKey } = banner;

    const webUrl = getPublicImageURL(webKey);
    const webImage = await optimizeImage({
      src: webUrl,
    });
    const mobileUrl = getPublicImageURL(mobileKey);
    const mobileImage = await optimizeImage({
      src: mobileUrl,
    });
    return { ...banner, webImage, mobileImage };
  }
  return { ...banner };
};
