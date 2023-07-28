import { useEffect, useState, useMemo } from "react";
import { API } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";

import { errorHandler } from "../errorHandler";
import { checkInventory } from "~/graphql/api";
import { cartActions } from "~/store/cart";

export const useInventory = () => {
  const cartList = useSelector((state) => state.cart.data || []);
  const [cartListMapping, setCartListMapping] = useState(null);
  const [isPriceMismatched, setPriceMismatched] = useState(false);
  const dispatch = useDispatch();

  const inventoryPayload = useMemo(
    () =>
      cartList.map((product) => ({
        recordKey: product.recordKey,
        productId: product.id,
        variantId: product.variantId,
      })),
    [cartList]
  );
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

          const mapping = response.reduce(
            (acc, { price, inventory, recordKey }) => ({
              ...acc,
              [recordKey]: { inventory, price },
            }),
            {}
          );

          setCartListMapping(mapping);
          setPriceMismatched(
            !cartList.every((c) =>
              response.find(
                (r) => r.recordKey === c.recordKey && r.price === c.price
              )
            )
          );
        } else {
          setCartListMapping({});
        }
      } catch (error) {
        errorHandler(error);
      }
    };

    callGetInventory();
  }, [inventoryPayload]);

  const outOfStockItems = useMemo(
    () =>
      cartListMapping
        ? cartList.filter(
            (c) => c.qty > cartListMapping[c.recordKey]?.inventory
          )
        : [],
    [cartList, cartListMapping]
  );

  const inventoryMapping = cartListMapping
    ? Object.entries(cartListMapping).reduce(
        (acc, [recordKey, { inventory }]) => ({
          ...acc,
          [recordKey]: inventory,
        }),
        {}
      )
    : {};

  const productWithPrice = cartListMapping
    ? Object.entries(cartListMapping).reduce(
        (acc, [recordKey, { price }]) => ({
          ...acc,
          [recordKey]: price,
        }),
        {}
      )
    : {};

  useEffect(() => {
    if (isPriceMismatched) dispatch(cartActions.validateCart(productWithPrice));
  }, [isPriceMismatched]);

  return {
    ready: !!cartListMapping,
    success: !outOfStockItems.length,
    outOfStockItems,
    inventoryMapping,
    productWithPrice,
  };
};
