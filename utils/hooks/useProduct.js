export const useProductPrice = (product, variant) => {
  const { variants, price: p, listingPrice: lp } = product || {};
  const { items } = variants || {};

  if (Array.isArray(items) && items.length) {
    if (variant) {
      const currentVariant = items.find(i => i.id === variant);
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

