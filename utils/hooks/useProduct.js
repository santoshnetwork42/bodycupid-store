import { useMemo } from "react";

import { getProductPrice } from "~/utils/products";

export const useProductPrice = (product, variant) => {
  const { price, listingPrice } = useMemo(
    () => getProductPrice(product, variant),
    [product, variant]
  );

  return { price, listingPrice };
};

