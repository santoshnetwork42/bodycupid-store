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
  const { variants = {} } = product;
  const { items = [] } = variants;

  const images = product?.images.items.sort((a, b) => a.position - b.position);
  const thumbImage = images?.find((i) => i.isThumb) ||
    images[0] || { imageKey: product.imageUrl };

  const discount = !!(product.listingPrice && product.price)
    ? parseInt(
        ((product.listingPrice - product.price) * 100) / product.listingPrice,
        10
      )
    : 0;

  const [firstVariant] = items.sort((a, b) => a.position - b.position);

  return {
    thumbImage,
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
          const { inventory: variantInventory } = items.find(
            (s) => s.id === selectedVariantId
          );
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
