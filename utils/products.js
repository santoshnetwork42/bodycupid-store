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

export const productInventory = (product, selectedVariantId = null) => {
  const {
    continueSellingOutOfStock,
    isInventoryEnabled,
    inventory = 0,
    variants = {},
  } = product;
  const { items = [] } = variants;
  if (isInventoryEnabled && !continueSellingOutOfStock) {
    if (items.length) {
      let variantInventory = 0;
      if (!selectedVariantId) {
        const { firstVariant } = getProductMeta(product);
        const { inventory } = firstVariant;
        variantInventory = inventory;
      } else {
        const { inventory } = items.find((s) => s.id === selectedVariantId);
        variantInventory = inventory;
      }
      return {
        inventoryEnabled: true,
        currentInventory: variantInventory,
      };
    }
    return { inventoryEnabled: true, currentInventory: inventory };
  }
  return { inventoryEnabled: false };
};
