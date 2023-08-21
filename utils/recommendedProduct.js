import {
  getProductRecommendation,
  getRecommendedProductById,
} from "~/graphql/api";
import { STORE_ID } from "~/config";
import fetchData from "~/utils/fetchData";

const getRecommendedProducts = async ({
  items = [],
  limit = 8,
  recommenderType = "BEST_SELLER",
} = {}) => {
  const bestSellersPersonalizedIds = await fetchData(getProductRecommendation, {
    input: {
      items,
      storeId: STORE_ID,
      recommenderType,
      limit,
    },
  }).then((response) => response.getProductRecommendation);

  const products = await Promise.all(
    (bestSellersPersonalizedIds || []).map(async ({ productId, variantId }) => {
      return await fetchData(getRecommendedProductById, {
        id: productId,
        variantFilter: { status: { eq: "ENABLED" } },
        variantLimit: variantId ? 10 : 1,
        imageLimit: 1,
      })
        .then((res) => res.getProduct)
        .then((res) => {
          if (!res) return null;
          res.status === "ENABLED" ? res : null;
        })
        .then((res) => {
          if (!res) return null;
          let [variant] = res.variants.items;

          if (variantId) {
            const currVariant = res.variants.items.find(
              (v) => v.id === variantId
            );

            if (currVariant) {
              variant = currVariant;
            }
          }

          if (variant) {
            res.variants.items = [variant];
          }

          return res;
        });
    })
  );

  return products.filter(Boolean);
};

export default getRecommendedProducts;
