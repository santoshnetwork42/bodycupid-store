import { useEffect, useMemo, useState } from "react";
import { API } from "aws-amplify";

import { getProductById } from "~/graphql/api";
import { getTotalPrice, getCartCount, toDecimal } from "~/utils";

export const useFeaturedCoupons = (coupons, cartList) => {
  const total = getTotalPrice(cartList);

  return (coupons || [])
    .filter(
      (coupon) =>
        coupon.couponType !== "PRODUCT" &&
        (!coupon.expirationDate ||
          new Date(coupon.expirationDate).getTime() >= new Date().getTime())
    )
    .map((coupon) => {
      const {
        minOrderValue,
        couponType,
        maxDiscount,
        buyXQuantity,
        applicableCollections,
        applicableProducts,
        getYAmount,
        getYPercentage,
        getYQuantity,
      } = coupon;

      if (minOrderValue && minOrderValue > total) {
        return {
          ...coupon,
          allowed: false,
          message: `Add product worth ₹${
            minOrderValue - total
          } more in the cart`,
        };
      }

      const totalItems = getCartCount(cartList);
      if (buyXQuantity > totalItems) {
        return {
          ...coupon,
          allowed: false,
          message: `Add ${buyXQuantity - totalItems} items in the cart`,
        };
      }

      if (Array.isArray(applicableProducts) && applicableProducts.length) {
        const hasProduct = cartList.some((c) =>
          applicableProducts.includes(c.productId)
        );

        if (!hasProduct) {
          return {
            ...coupon,
            allowed: false,
            message: `Not applicable on the products in the cart`,
          };
        }
      }

      if (
        Array.isArray(applicableCollections) &&
        applicableCollections.length
      ) {
        const hasCollection = cartList.some((c) =>
          applicableCollections.some((ac) => (c.collections || []).includes(ac))
        );

        if (!hasCollection) {
          return {
            ...coupon,
            allowed: false,
            message: `Not applicable on the products in the cart`,
          };
        }
      }

      if (couponType === "FIXED") {
        const discount = Math.min(maxDiscount, getYAmount);
        return {
          ...coupon,
          allowed: true,
          discount,
          message: `You will save ₹${toDecimal(discount)} with this coupon`,
        };
      }

      const totalAmount = getTotalPrice(cartList);
      if (couponType === "PERCENTAGE") {
        const discount = parseInt(
          Math.min(maxDiscount, (getYPercentage * totalAmount) / 100),
          10
        );
        return {
          ...coupon,
          allowed: true,
          discount,
          message: `You will save ₹${toDecimal(discount)} with this coupon`,
        };
      }

      // For couponType === BXGY
      const cartAmounts = [];
      cartList.forEach((c) => {
        cartAmounts.push(...Array(parseInt(c.qty, 10)).fill(c.price));
      });

      cartAmounts.sort((a, b) => (b > a ? 1 : -1));
      cartAmounts.splice(0, buyXQuantity);
      const discountedItems = cartAmounts.slice(-getYQuantity);
      const amt = discountedItems.reduce((a, b) => a + b, 0);
      const discount = Math.min(maxDiscount, amt);
      return {
        ...coupon,
        allowed: true,
        discount,
        message: `You will save ₹${toDecimal(discount)} with this coupon`,
      };
    });
};

export const useFreeProduct = (cartList, coupons) => {
  const [product, setProduct] = useState(null);
  const [freeProductCoupon] = useMemo(
    () =>
      coupons.filter((coupon) => {
        const {
          autoApply,
          couponType,
          applicableProducts,
          applicableCollections,
        } = coupon;

        const hasProduct =
          Array.isArray(applicableProducts) && applicableProducts.length
            ? cartList.some((c) => applicableProducts.includes(c.productId))
            : true;

        const hasCollection =
          Array.isArray(applicableCollections) && applicableCollections.length
            ? cartList.some((c) =>
                applicableCollections.some((ac) =>
                  (c.collections || []).includes(ac)
                )
              )
            : true;

        return (
          autoApply && couponType === "PRODUCT" && hasCollection && hasProduct
        );
      }),
    [coupons, cartList]
  );

  useEffect(() => {
    const getProduct = async () => {
      const { data } = await API.graphql({
        query: getProductById,
        variables: { id: freeProductCoupon?.id },
      });

      if (data.getProduct) {
        setProduct(data.getProduct);
      }
    };

    if (freeProductCoupon) {
      getProduct();
    }
  }, [freeProductCoupon]);

  return product;
};

export const useCartList = (cartList, coupon) => {};

export const getCouponDiscount = (cartList, coupon) => {
  const {
    expirationDate,
    isActive,
    couponType,
    maxDiscount,
    buyXQuantity,
    getYQuantity,
  } = coupon;
  const total = getTotalPrice(cartList);
  const totalQty = cartList.reduce((a, b) => a + b.qty, 0);

  if (
    !expirationDate ||
    new Date(expirationDate).getTime() >= new Date().getTime()
  ) {
    if (!minOrderValue || minOrderValue <= total) {
      let amount = 0;
      let cartData = cartList;

      if (couponType === "FIXED") {
        amount = discount;
        return;
      }

      if (couponType === "PERCENTAGE") {
        amount = (total * discount) / 100;
        return;
      }

      if (couponType === "BXGY") {
        if (total > buyXQuantity + getYQuantity) {
          const freeItems = getFreeItems(cartList);
          cartData = getUpdatedCart(cartList, freeItems, maxDiscount);
          amount = freeItems.reduce((a, c) => a + c.price);
        }
        return;
      }

      return {
        discount: maxDiscount ? Math.min(amount, maxDiscount) : amount,
        cartList: cartData,
      };
    }
  }
};

const getFreeItems = (cartList) => {
  const sortedCartList = cartList.sort((a, b) => a.price - b.price);
  let qty = getYQuantity;
  return sortedCartList.reduce((acc, cur) => {
    if (qty) {
      acc[cur.recordKey] = Math.min(qty, currQty);
      qty -= cur.qty;
    }
    return acc;
  }, {});
};

const getUpdatedCart = (cartList, freeItems, maxDiscount) => {
  return cartList.reduce((acc, item) => {
    const freeQty = freeItems[item.recordKey];
    const restQty = item.qty - freeQty;

    if (freeQty) {
      acc.push({
        ...item,
        qty: freeQty,
        bxgy: "PRIMARY",
      });
      if (restQty * item.price <= maxDiscount) {
      }
      acc.push({
        ...item,
        qty: item.qty - freeQty,
        bxgy: "SECONDARY",
      });
    }
    acc.push(item);
    return acc;
  }, []);
};
