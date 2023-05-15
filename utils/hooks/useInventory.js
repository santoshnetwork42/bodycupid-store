import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { useSelector } from "react-redux";

import { errorHandler } from "../errorHandler";
import { checkInventory } from "~/graphql/api";
import { getRecordKey } from "~/utils/helper";

export const useInventory = () => {
  const cartList = useSelector((state) => state.cart.data || []);
  const [productWithInventory, setProductWithInventory] = useState({});


  useEffect(() => {

    const callGetInventory = async () => {
      try {
        const {
          data: { checkInventory: response },
        } = await API.graphql({
          query: checkInventory,
          variables: {
            input: cartList.map(
              (product) => ({
                productId: product.id,
                variantId: product.variantId,
              }),
              [cartList]
            ),
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
      } catch (error) {
        errorHandler(error);
      }
    };

    callGetInventory();
  }, [cartList]);

  return productWithInventory;
};
