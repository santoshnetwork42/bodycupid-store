export const getFirstVariantId = (product) => {
  if (product) {
    const { variants = {} } = product;
    const { items = [] } = variants;
    const sortedVariants = items.sort((a, b) => a.position - b.position);
    return sortedVariants[0]?.id;
  }
  return null;
};