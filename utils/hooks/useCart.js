import { useMemo } from "react";
import { useSelector } from "react-redux";

import { getCartTotals } from "~/utils";
import { useFreeProducts } from "~/utils/hooks/useCoupon";
import { getCouponDiscount } from "~/utils/coupons";

export const useCartTotal = (prepaid = false) => {
  const { data, coupon } = useSelector((state) => state.cart);
  const shippingTiers = useSelector(
    (state) => state.system.shippingTiers || []
  );
  const cartTotals = useMemo(
    () => getCartTotals(data, coupon, shippingTiers, prepaid),
    [data, coupon, shippingTiers, prepaid]
  );
  return cartTotals;
};

export const useCartItems = () => {
  const { data: cartList, coupon: appliedCoupon } = useSelector(
    (state) => state.cart
  );
  const freeProducts = useFreeProducts();

  const cartItems = useMemo(() => {
    if (appliedCoupon?.couponType === "BUY_X_GET_Y") {
      const { allowed } = getCouponDiscount(appliedCoupon, cartList);
      if (allowed) {
        const sortedItems = cartList.sort((a, b) =>
          a.price > b.price ? 1 : -1
        );

        let getYQuantity = appliedCoupon.getYQuantity;
        let remainingDiscount = appliedCoupon.maxDiscount || Infinity;

        const updatedCartItems = sortedItems.reduce((acc, item) => {
          const itemQty = parseInt(item.qty, 10);
          const freeQty =
            remainingDiscount === Infinity
              ? Math.min(itemQty, Math.max(0, getYQuantity))
              : Math.min(
                  parseInt(remainingDiscount / item.price, 10),
                  itemQty,
                  Math.max(0, getYQuantity)
                );
          getYQuantity -= freeQty;

          if (!freeQty) {
            return [
              ...acc,
              { ...item, itemKey: `${item.recordKey}-full-paid` },
            ];
          }

          if (freeQty === itemQty) {
            return [
              ...acc,
              {
                ...item,
                itemKey: `${item.recordKey}-full-item-free`,
                cartItemType: "FREEPRODUCT",
              },
            ];
          }

          return [
            ...acc,
            {
              ...item,
              qty: freeQty,
              extraQty: itemQty - freeQty,
              itemKey: `${item.recordKey}-${
                itemQty - freeQty
              }-partial-item-free`,
              cartItemType: "FREEPRODUCT",
            },
            {
              ...item,
              qty: itemQty - freeQty,
              extraQty: freeQty,
              itemKey: `${item.recordKey}-${
                itemQty - freeQty
              }-partial-item-paid`,
            },
          ];
        }, []);

        return [
          ...updatedCartItems,
          ...freeProducts.map((p) => ({
            ...p,
            itemKey: `${p.id}-free`,
            cartItemType: "FREEPRODUCT",
            hideQty: true,
          })),
        ];
      }
    }

    return [
      ...cartList.map((p) => ({ ...p, itemKey: p.recordKey })),
      ...freeProducts.map((p) => ({
        ...p,
        itemKey: `${p.id}-free`,
        cartItemType: "FREEPRODUCT",
        hideQty: true,
      })),
    ];
  }, [cartList, freeProducts, appliedCoupon]);

  return cartItems;
};
