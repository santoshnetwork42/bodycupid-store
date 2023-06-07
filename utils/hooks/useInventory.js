import { useEffect, useState, useMemo } from "react";
import { API } from "aws-amplify";
import { useSelector } from "react-redux";

import { errorHandler } from "../errorHandler";
import { checkInventory } from "~/graphql/api";
import { getRecordKey } from "~/utils/helper";

export const useInventory = () => {
  const cartList = useSelector((state) => state.cart.data || []);
  const [productWithInventory, setProductWithInventory] = useState(null);

  const inventoryPayload = useMemo(() => cartList.map(
    (product) => ({
      productId: product.id,
      variantId: product.variantId,
    }),
  ), [cartList]);

  useEffect(() => {
    const callGetInventory = async () => {
      try {
        if (inventoryPayload.length) {
          const {
            data: { checkInventory: response },
          } = await API.graphql({
            query: checkInventory,
            variables: {
              input: inventoryPayload,
            },
          });

          const inventoryMapping = response.reduce(
            (acc, { productId, variantId, inventory }) => {
              const recordKey = getRecordKey({ id: productId }, variantId);
              return { ...acc, [recordKey]: inventory };
            },
            {}
          );

          setProductWithInventory(inventoryMapping);
        } else {
          setProductWithInventory({});
        }
      } catch (error) {
        errorHandler(error);
      }
    };

    callGetInventory();
  }, [inventoryPayload]);

  const outOfStockItems = useMemo(
    () =>
      productWithInventory ?
        cartList.filter((c) => {
          const itemRecordKey = getRecordKey(c, c.variantId);
          return c.qty > productWithInventory[itemRecordKey];
        })
        : []
    ,
    [cartList, productWithInventory]
  );

  return {
    ready: !!productWithInventory,
    success: !outOfStockItems.length,
    inventoryMapping: productWithInventory,
    outOfStockItems,
  };
};
