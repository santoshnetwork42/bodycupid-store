import { useEffect, useMemo, useState } from "react";
import { getFirstVariantId } from "../products";
import { errorHandler } from "../errorHandler";
import { API } from "aws-amplify";
import { checkInventory } from "~/graphql/api";
import { getRecordKey } from "../helper";

export const useInventoryCheck = (cartList) => {
  const [productWithInventory, setProductWithInventory] = useState({});
  const payload = useMemo(() => {
    return cartList.map(
      (product) => {
        return {
          productId: product.id,
          variantId: getFirstVariantId(product),
        };
      },
      [cartList]
    );
  });
  useEffect(async () => {
    try {
      const {
        data: { checkInventory: response },
      } = await API.graphql({
        query: checkInventory,
        variables: {
          input: payload,
        },
      });
      const data = {};
      response.forEach((d) => {
        let key = getRecordKey({ id: d.productId }, d.variantId);
        data[key] = d.inventory;
      });
      setProductWithInventory(data);
    } catch (error) {
      errorHandler(error);
    }
  }, [cartList]);

  return productWithInventory;
};
