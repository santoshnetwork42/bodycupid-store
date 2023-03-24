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
  let { inventoryEnabled, currentInventory } = {
    inventoryEnabled: false,
    currentInventory: 1000,
  };
  if (isInventoryEnabled && !continueSellingOutOfStock) {
    if (items.length) {
      if (!selectedVariantId) {
        const { firstVariant } = getProductMeta(product);
        const { inventory } = firstVariant;
        currentInventory = inventory;
      } else {
        const { inventory } = items.find((s) => s.id === selectedVariantId);
        currentInventory = inventory;
      }
      inventoryEnabled = true;
    } else {
      inventoryEnabled = true;
      currentInventory = inventory;
    }
  }
  if (!inventoryEnabled || !!currentInventory) {
    return { isInventoryAvailable: true, currentInventory: currentInventory };
  }
  return {
    isInventoryAvailable: false,
    currentInventory: currentInventory,
  };
};
