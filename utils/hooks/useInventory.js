import { useEffect, useMemo, useState } from "react";
import { API } from "aws-amplify";
import { useSelector } from "react-redux";

import { getFirstVariantId } from "~/utils/products";
import { errorHandler } from "../errorHandler";
import { checkInventory } from "~/graphql/api";
import { getRecordKey } from "~/utils/helper";

export const useInventory = () => {
  const cartList = useSelector(state => state.cart.data || []);
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

  const callGetInventory = async () => {
    try {
      const {
        data: { checkInventory: response },
      } = await API.graphql({
        query: checkInventory,
        variables: {
          input: payload,
        },
      });

      const inventoryMapping = response.reduce((acc, { productId, variantId, inventory }) => {
        const recordKey = getRecordKey({ id: productId }, variantId);
        return { ...acc, [recordKey]: inventory };
      }, {});

      setProductWithInventory(inventoryMapping);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    callGetInventory();
  }, [cartList]);

  return productWithInventory;
};
