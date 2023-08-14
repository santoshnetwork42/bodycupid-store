import { useMemo } from "react";
import { useSelector } from "react-redux";

import { getCartTotals } from "~/utils";
import { useFreeProducts } from "~/utils/hooks/useCoupon";
import { useConfiguration, useShippingTiers } from "~/utils/contexts/navbar";
import { getCouponDiscount } from "~/utils/coupons";
import { getBxGyFreeQuantity } from "../helper";
import {
  COD_CHARGES,
  MAX_PREPAID_DISCOUNT,
  PREPAID_DISCOUNT,
} from "~/constant";

export const useCartTotal = (
  prepaid = "NONE",
  showNonApplicableFreeProducts = true
) => {
  const { data, coupon } = useSelector((state) => state.cart);
  const shippingTiers = useShippingTiers();
  const freeProductsResponse = useFreeProducts(showNonApplicableFreeProducts);
  const codCharges = useConfiguration(COD_CHARGES, 0);
  const prepaidDiscountPercent = useConfiguration(PREPAID_DISCOUNT, 0);
  const maxPrepaidDiscount = useConfiguration(MAX_PREPAID_DISCOUNT, 0);

  const freeProducts = useMemo(
    () => freeProductsResponse.filter((f) => f.allowed).map((f) => f.product),
    [freeProductsResponse]
  );

  const cartTotals = useMemo(
    () =>
      getCartTotals(data, freeProducts, coupon, shippingTiers || [], prepaid, {
        codCharges,
        prepaidDiscountPercent,
        maxPrepaidDiscount,
      }),
    [
      data,
      coupon,
      !!shippingTiers,
      prepaid,
      codCharges,
      freeProducts,
      codCharges,
      prepaidDiscountPercent,
      maxPrepaidDiscount,
    ]
  );
  return cartTotals;
};

export const useCartItems = (showNonApplicableFreeProducts = true) => {
  const { data: cartListItems, coupon: appliedCoupon } = useSelector(
    (state) => state.cart
  );
  const freeProducts = useFreeProducts(showNonApplicableFreeProducts);

  const cartList = cartListItems.map((item) => {
    if (Array.isArray(item.variants?.items) && item.variantId) {
      const currVariant = item.variants.items.find(
        (v) => v.id === item.variantId
      );
      if (currVariant?.imageUrl)
        return { ...item, thumbImage: currVariant?.imageUrl };
    }
    return {
      ...item,
      thumbImage: item.images?.items[0]?.imageKey,
    };
  });

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
        ...freeProducts.map(({ product: p, allowed, message }) => ({
          ...p,
          itemKey: allowed ? `${p.id}-free` : `${p.id}-not-free`,
          cartItemType: allowed
            ? "AUTO_FREE_PRODUCT"
            : "AUTO_FREE_PRODUCT_DISABLED",
          disableChange: true,
          hideRemove: true,
          couponMessage: message,
        })),
      ];
    }
    return [
      ...cartList.map((p) => ({
        ...p,
        itemKey: p.recordKey,
        cartItemType:
          p.cartItemType ||
          (p.cartItemSource === "COUPON" && allowed ? "FREE_PRODUCT" : null),
      })),
      ...freeProducts.map(({ product: p, allowed, message }) => ({
        ...p,
        itemKey: allowed ? `${p.id}-free` : `${p.id}-not-free`,
        cartItemType: allowed
          ? "AUTO_FREE_PRODUCT"
          : "AUTO_FREE_PRODUCT_DISABLED",
        disableChange: true,
        hideRemove: true,
        couponMessage: message,
      })),
    ];
  }, [cartList, freeProducts, appliedCoupon]);

  return cartItems;
};
