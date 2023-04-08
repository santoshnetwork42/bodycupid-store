export const getFirstVariantId = (product) => {
  if (product) {
    const { variants = {} } = product;
    const { items = [] } = variants;
    const sortedVariants = items.sort((a, b) => a.position - b.position);
    return sortedVariants[0]?.id;
  }
  return null;
};

export const getProductMeta = (product) => {
  if (!product) return {};
  const { variants = {}, images = {} } = product;
  const { items = [] } = variants;
  const { items: allImages = [] } = images;

  const sortedImages = Array.isArray(allImages) ? allImages.sort((a, b) => a.position - b.position) : [];
  const thumbImage = sortedImages.find((i) => i.isThumb) || sortedImages[0] || null;
  const [, secondaryImage] = sortedImages;

  const discount = !!(product.listingPrice && product.price)
    ? parseInt(
      ((product.listingPrice - product.price) * 100) / product.listingPrice,
      10
    )
    : 0;

  const [firstVariant] = items.sort((a, b) => a.position - b.position);

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
    hasInventory: true,
    currentInventory: 1000,
  };
};

export const getProductCouponTotal = (coupon, product) => {
  const { price } = product;
  const { couponType, discount, minOrderValue, maxDiscount } = coupon;
  if (!minOrderValue || minOrderValue > price) {
    let amount = discount;
    if (couponType === "PERCENTAGE") {
      amount = (price * discount) / 100;
    } else if (couponType === "BOGO") {
      amount = 0;
    }
    return maxDiscount ? Math.min(amount, maxDiscount) : amount;
  }
  return 0;
};
