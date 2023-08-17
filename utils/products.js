export const getFirstVariant = (product, variantId) => {
  if (product) {
    const { variants = {} } = product;
    const { items = [] } = variants;

    let variant;
    if (variantId) {
      variant = items.find((v) => v.id === variantId);
    }

    if (!variant) {
      [variant] = items;
    }

    return variant;
  }
  return null;
};

export const getProductMeta = (product) => {
  if (!product) return {};
  const { variants = {}, images = {}, imageUrl } = product;
  const { items = [] } = variants;
  const { items: allImages = [] } = images;

  const sortedImages = Array.isArray(allImages)
    ? allImages.sort((a, b) => a.position - b.position)
    : [];

  let thumbImage = sortedImages.find((i) => i.isThumb) ||
    sortedImages[0] || { imageKey: imageUrl };
  const [, secondaryImage] = sortedImages;

  const [firstVariant] = items.sort((a, b) => a.position - b.position);

  let discount = !!(product.listingPrice && product.price)
    ? Math.round(
        ((product.listingPrice - product.price) * 100) / product.listingPrice
      )
    : 0;

  if (firstVariant) {
    discount = !!(firstVariant.listingPrice && firstVariant.price)
      ? Math.round(
          ((firstVariant.listingPrice - firstVariant.price) * 100) /
            firstVariant.listingPrice
        )
      : 0;

    if (firstVariant.imageUrl) {
      thumbImage = { imageKey: firstVariant.imageUrl };
    }
  }

  return {
    thumbImage,
    secondaryImage,
    discount,
    firstVariant,
  };
};

export const getProductInventory = (product, selectedVariantId = null) => {
  const {
    continueSellingOutOfStock,
    isInventoryEnabled,
    inventory = 0,
    variants = {},
    availability,
  } = product;
  const { items = [] } = variants;

  if (isInventoryEnabled) {
    if (!continueSellingOutOfStock) {
      if (items.length) {
        if (!selectedVariantId) {
          const { firstVariant } = getProductMeta(product);
          const { inventory: variantInventory } = firstVariant;
          return {
            hasInventory: !!variantInventory,
            currentInventory: variantInventory,
          };
        } else {
          const selectedVariant = items.find((s) => s.id === selectedVariantId);
          const { inventory: variantInventory } = selectedVariant || {};
          return {
            hasInventory: !!variantInventory,
            currentInventory: variantInventory,
          };
        }
      } else {
        return {
          hasInventory: !!inventory,
          currentInventory: inventory,
        };
      }
    }
  }

  return {
    hasInventory: !availability || availability === "in stock",
    currentInventory: 99,
  };
};

export const getProductPrice = (product, variantId) => {
  const { variants, price: p, listingPrice: lp } = product || {};
  const { items } = variants || {};

  if (Array.isArray(items) && items.length) {
    if (variantId) {
      const currentVariant = items.find((i) => i.id === variantId);
      if (currentVariant) {
        const { price, listingPrice } = currentVariant;
        return { price, listingPrice };
      }
    }

    const [{ price, listingPrice }] = items;
    return { price, listingPrice };
  }

  return { price: p, listingPrice: lp };
};

export const productDiscountPercentage = ({ price, listingPrice }) => {
  return Math.round(((listingPrice - price) / listingPrice) * 100);
};
