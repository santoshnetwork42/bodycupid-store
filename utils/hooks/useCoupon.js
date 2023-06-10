import { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { API } from "aws-amplify";

import { useCoupons } from "~/utils/contexts/navbar";
import { getCouponDiscount } from "~/utils/coupons";
import { getTotalPrice, getCartCount } from "~/utils";
import { getProductById } from "~/graphql/api";

export const useFeaturedCoupons = () => {
  const coupons = useCoupons();
  const cartList = useSelector((state) => state.cart.data || []);

  const featuredCoupons = useMemo(
    () =>
      (coupons || [])
        .filter(
          (coupon) => !(coupon.autoApply && coupon.couponType === "PRODUCT")
        )
        .map((coupon) => getCouponDiscount(coupon, cartList)),
    [coupons, cartList]
  );
  return featuredCoupons.sort(
    (a, b) => b.discount - a.discount || b.allowed - a.allowed
  );
};

export const useProductCoupons = (product, variant) => {
  const coupons = useCoupons();

  const currentProductItem = useMemo(() => {
    const { variants } = product;
    const selectedVariant = variants.items.find((v) => v.id === variant);
    return {
      ...product,
      price: selectedVariant?.price || product.price,
      qty: 1,
    };
  }, [product, variant]);

  const productCoupons = useMemo(
    () =>
      (coupons || [])
        .filter(
          (coupon) =>
            coupon.couponType !== "BUY_X_GET_Y" ||
            coupon.couponType !== "PRODUCT"
        )
        .map((coupon) => getCouponDiscount(coupon, [currentProductItem]))
        .filter((coupon) => coupon.allowed)
        .sort((a, b) => (a.discount > b.discount ? -1 : 1)),
    [coupons, currentProductItem]
  );

  const [bestCoupon] = productCoupons;
  return bestCoupon;
};

export const useFreeProducts = (showNonApplicableFreeProducts = true) => {
  const coupons = useCoupons();
  const cartItems = useSelector((state) => state.cart.data || []);
  const appliedCoupon = useSelector((state) => state.cart.coupon);
  const [products, setProducts] = useState([]);

  const { total, totalItems, cartList } = useMemo(() => {
    const cartItemsList = cartItems.filter(
      (item) => item.cartItemSource !== "COUPON"
    );
    const cartTotal = getTotalPrice(cartItems);
    const { discount } = getCouponDiscount(appliedCoupon, cartItemsList);
    const totalItems = getCartCount(cartItemsList);
    return { total: cartTotal - discount, totalItems, cartList: cartItemsList };
  }, [appliedCoupon, cartItems]);

  const freeProductIds = useMemo(
    () =>
      (coupons || [])
        .filter((coupon) => {
          const {
            autoApply,
            couponType,
            applicableProducts,
            applicableCollections,
            minOrderValue,
            buyXQuantity,
            getYQuantity,
          } = coupon;

          if (!total) return false;
          if (couponType !== "PRODUCT") return false;
          if (!autoApply) return false;

          if (showNonApplicableFreeProducts) return true;

          if (minOrderValue && minOrderValue > total) return false;
          if (buyXQuantity + getYQuantity > totalItems) return false;

          const hasProduct =
            Array.isArray(applicableProducts) && applicableProducts.length
              ? cartList.some((c) => applicableProducts.includes(c.id))
              : true;

          const hasCollection =
            Array.isArray(applicableCollections) && applicableCollections.length
              ? cartList.some((c) =>
                  applicableCollections.some((ac) =>
                    (c.collections || []).includes(ac)
                  )
                )
              : true;

          return hasCollection && hasProduct;
        })
        .map((coupon) => {
          const {
            applicableProducts,
            applicableCollections,
            minOrderValue,
            buyXQuantity,
            getYQuantity,
            getYProduct,
          } = coupon;

          let allowed = true;
          if (minOrderValue && minOrderValue > total) allowed = false;
          if (buyXQuantity + getYQuantity > totalItems) allowed = false;

          const hasProduct =
            Array.isArray(applicableProducts) && applicableProducts.length
              ? cartList.some((c) => applicableProducts.includes(c.id))
              : true;

          const hasCollection =
            Array.isArray(applicableCollections) && applicableCollections.length
              ? cartList.some((c) =>
                  applicableCollections.some((ac) =>
                    (c.collections || []).includes(ac)
                  )
                )
              : true;

          allowed = allowed && hasCollection && hasProduct;
          const { message } = getCouponDiscount(coupon, cartList);
          return { allowed, message, productId: getYProduct };
        })
        .sort((a, b) => (a.discount > b.discount ? 1 : -1))
        .sort((a) => (a.allowed ? -1 : 1)),
    [coupons, total, totalItems, cartList]
  );

  useEffect(() => {
    const getProduct = async () => {
      const response = await Promise.all(
        freeProductIds.map(({ productId, allowed, message }) =>
          API.graphql({
            query: getProductById,
            variables: { id: productId },
          }).then(({ data }) => ({
            allowed,
            message,
            product: data.getProduct,
          }))
        )
      );

      if (Array.isArray(response)) {
        setProducts(response);
      }
    };

    getProduct();
  }, [freeProductIds]);

  return products;
};
