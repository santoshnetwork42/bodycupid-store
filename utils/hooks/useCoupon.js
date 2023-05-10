import { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { API } from "aws-amplify";

import { useCoupons } from "~/utils/contexts/coupons";
import { getCouponDiscount } from "~/utils/coupons";
import { getTotalPrice, getCartCount } from "~/utils";
import { getProductById } from "~/graphql/api";

export const useFeaturedCoupons = () => {
  const coupons = useCoupons();
  const cartList = useSelector((state) => state.cart.data || []);

  const featuredCoupons = useMemo(
    () =>
      coupons
        .filter((coupon) => !coupon.autoApply)
        .map((coupon) => getCouponDiscount(coupon, cartList)),
    [coupons, cartList]
  );

  return featuredCoupons;
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
      coupons
        .filter((coupon) => coupon.couponType !== "BUY_X_GET_Y")
        .map((coupon) => getCouponDiscount(coupon, [currentProductItem]))
        .filter((coupon) => coupon.allowed)
        .sort((a, b) => (a.discount > b.discount ? -1 : 1)),
    [coupons, currentProductItem]
  );

  const [bestCoupon, ...restCoupons] = productCoupons;
  return { productCoupons: restCoupons, bestCoupon };
};

export const useFreeProducts = () => {
  const coupons = useCoupons();
  const cartItems = useSelector((state) => state.cart.data || []);
  const [products, setProducts] = useState([]);

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

          if (couponType !== "PRODUCT") return false;
          if (!autoApply) return false;

          const cartList = cartItems.filter(item => item.cartItemSource !== "COUPON");
          const total = getTotalPrice(cartList);
          if (minOrderValue && minOrderValue > total) return false;

          const totalItems = getCartCount(cartList);
          if (buyXQuantity + getYQuantity > totalItems) return false;

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

          return hasCollection && hasProduct;
        })
        .map((coupon) => coupon.getYProduct),
    [coupons, cartItems]
  );

  const getProduct = async () => {
    const response = await Promise.all(
      freeProductIds.map((productId) =>
        API.graphql({
          query: getProductById,
          variables: { id: productId },
        }).then(({ data }) => data.getProduct)
      )
    );

    if (Array.isArray(response)) {
      setProducts(response);
    }
  };

  useEffect(() => {
    getProduct();
  }, [freeProductIds]);

  return products;
};
