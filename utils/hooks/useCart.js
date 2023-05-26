import { useMemo } from "react";
import { useSelector } from "react-redux";

import { getCartTotals } from "~/utils";
import { useFreeProducts } from "~/utils/hooks/useCoupon";
import { useConfiguration, useShippingTiers } from "~/utils/contexts/navbar";
import { getCouponDiscount } from "~/utils/coupons";
import { getBxGyFreeQuantity } from "../helper";

export const useCartTotal = (prepaid = "NONE") => {
  const { data, coupon } = useSelector((state) => state.cart);
  const shippingTiers = useShippingTiers();
  const codCharges = useConfiguration("SHIPPING", 0);

  const cartTotals = useMemo(
    () =>
      getCartTotals(data, coupon, shippingTiers || [], prepaid, codCharges),
    [data, coupon, !!shippingTiers, prepaid, codCharges]
  );
  return cartTotals;
};

export const useCartItems = () => {
  const { data: cartList, coupon: appliedCoupon } = useSelector(
    (state) => state.cart
  );

  const freeProducts = useFreeProducts();

  const cartItems = useMemo(() => {
    const { allowed } = getCouponDiscount(appliedCoupon, cartList);
    if (allowed && appliedCoupon?.couponType === "BUY_X_GET_Y") {
      const { applicableCollections, applicableProducts } = appliedCoupon;

      const { couponApplicableCartList, couponNonApplicableCartList } =
        cartList.reduce(
          (acc, c) => {
            const isCartItem = c.cartItemSource !== "COUPON";

            const isProductApplicable =
              Array.isArray(applicableProducts) && applicableProducts.length
                ? applicableProducts.includes(c.id)
                : true;

            const isCollectionApplicable =
              Array.isArray(applicableCollections) &&
                applicableCollections.length
                ? applicableCollections.some((ac) =>
                  (c.collections || []).includes(ac)
                )
                : true;

            if (isCartItem && isCollectionApplicable && isProductApplicable) {
              return {
                ...acc,
                couponApplicableCartList: [...acc.couponApplicableCartList, c],
              };
            }

            return {
              ...acc,
              couponNonApplicableCartList: [
                ...acc.couponNonApplicableCartList,
                c,
              ],
            };
          },
          { couponApplicableCartList: [], couponNonApplicableCartList: [] }
        );

      const sortedItems = couponApplicableCartList.sort((a, b) =>
        a.price > b.price ? 1 : -1
      );

      const getYQuantity = getBxGyFreeQuantity(
        appliedCoupon.getYQuantity,
        appliedCoupon.buyXQuantity,
        sortedItems
      );

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
          return [...acc, { ...item, itemKey: `${item.recordKey}-full-paid` }];
        }

        if (freeQty === itemQty) {
          return [
            ...acc,
            {
              ...item,
              itemKey: `${item.recordKey}-full-item-free`,
              cartItemType: "FREE_PRODUCT",
            },
          ];
        }

        return [
          ...acc,
          {
            ...item,
            qty: freeQty,
            extraQty: itemQty - freeQty,
            itemKey: `${item.recordKey}-${itemQty - freeQty}-partial-item-free`,
            cartItemType: "FREE_PRODUCT",
          },
          {
            ...item,
            qty: itemQty - freeQty,
            extraQty: freeQty,
            itemKey: `${item.recordKey}-${itemQty - freeQty}-partial-item-paid`,
          },
        ];
      }, []);

      return [
        ...updatedCartItems,
        ...couponNonApplicableCartList.map((p) => ({
          ...p,
          itemKey: `${p.recordKey}-cooupon-non-applicable`,
        })),
        ...freeProducts.map((p) => ({
          ...p,
          itemKey: `${p.id}-free`,
          cartItemType: "AUTO_FREE_PRODUCT",
          hideQty: true,
          hideRemove: true,
        })),
      ];
    }

    return [
      ...cartList.map((p) => ({
        ...p,
        itemKey: p.recordKey,
        cartItemType:
          p.cartItemSource === "COUPON" && allowed ? "FREE_PRODUCT" : null,
      })),
      ...freeProducts.map((p) => ({
        ...p,
        itemKey: `${p.id}-free`,
        cartItemType: "AUTO_FREE_PRODUCT",
        hideQty: true,
        hideRemove: true,
      })),
    ];
  }, [cartList, freeProducts, appliedCoupon]);

  return cartItems;
};
