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
  const categoryDetails = { ...category };
  const { bannerUrl, imageUrl } = categoryDetails;
  if (bannerUrl) {
    const imageUrl = getPublicImageURL(bannerUrl);
    const optimizedCategoryBanner = await optimizeImage({
      src: imageUrl,
    });
    categoryDetails.bannerImage = optimizedCategoryBanner;
  }
  if (imageUrl) {
    const imgUrl = getPublicImageURL(imageUrl);

    const optimizedCategoryImage = await optimizeImage({
      src: imgUrl,
      options: {
        resize: 200,
        blur: 3,
      },
    });

    categoryDetails.image = optimizedCategoryImage;
  }
  return { ...categoryDetails };
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

export const variantImageOptimization = async (variants) => {
  const { items } = variants;
  if (items.length) {
    const optimizedImages = await Promise.all(
      items.map(async (item) => {
        const imageUrl = getPublicImageURL(item.imageUrl);
        const optimizedProductImage = await optimizeImage({
          src: imageUrl,
          options: {
            resize: 200,
            blur: 3,
          },
        });
        return { ...item, image: optimizedProductImage };
      })
    );

    return { variants: { ...variants, items: optimizedImages } };
  }
  return { variants: { ...variants } };
};

export const optimizedBlogs = async (blogs) => {
  const { featuredImage } = blogs;
  if (featuredImage) {
    const imageUrl = getPublicImageURL(featuredImage);
    const optimizedBlogImage = await optimizeImage({
      src: imageUrl,
    });

    return { ...blogs, image: optimizedBlogImage };
  }
  return { ...blogs };
};
