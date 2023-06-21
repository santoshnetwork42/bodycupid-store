import { getCartCount, getTotalPrice } from "~/utils";
import { getBxGyFreeQuantity } from "./helper";
import { getProductPrice } from "./products";

export const getCouponMessage = ({
  couponType,
  getYAmount,
  getYPercentage,
  getYQuantity,
  paymentMethod,
  getYStoreProduct,
  minOrderValue,
  maxDiscount,
}) => {
  let discountMsg =
    "Lowest value item in the cart will be discounted off on the item total";

  if (couponType === "FIXED") {
    discountMsg = `₹${getYAmount} off from total`;
  } else if (couponType === "PERCENTAGE") {
    discountMsg = `${getYPercentage}% off from total`;
    if (maxDiscount) {
      discountMsg = `${discountMsg} upto ₹${maxDiscount}`;
    }
  } else if (couponType === "BUY_X_GET_Y" && getYQuantity > 1) {
    discountMsg = `${getYQuantity} items with the lowest value will be given away for free!`;
    if (maxDiscount) {
      discountMsg = `${discountMsg} upto ₹${maxDiscount}`;
    }
  } else if (couponType === "PRODUCT") {
    discountMsg = `FREE ${getYStoreProduct?.title} ${
      !!getYStoreProduct?.price ? `WORTH ₹${getYStoreProduct?.price}` : ""
    }`;
  }

  if (minOrderValue) {
    discountMsg = `${discountMsg} on orders above ₹${minOrderValue}.`;
  } else {
    discountMsg = `${discountMsg}.`;
  }

  let paymentTypeMsg = "Applicable on both COD and online payment.";
  if (paymentMethod === "COD") {
    paymentTypeMsg = "Applicable on COD.";
  } else if (paymentMethod === "PREPAID") {
    paymentTypeMsg = "Applicable on online payment.";
  }

  return {
    message: `${discountMsg} ${paymentTypeMsg}`,
    paymentTypeMsg,
    discountMsg,
  };
};

export const getCouponDiscount = (coupon, cartItems) => {
  if (!coupon) {
    return { allowed: true, discount: 0 };
  }

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
    getYStoreProduct,
  } = coupon;

  const finalGetYQty = couponType === "BUY_X_GET_Y" ? getYQuantity : 0;

  const cartList = cartItems.filter((c) => {
    const isCartItem = c.cartItemSource !== "COUPON";
    if (!isCartItem) return false;

    const isProductApplicable =
      Array.isArray(applicableProducts) && applicableProducts.length
        ? applicableProducts.includes(c.id)
        : true;

    if (!isProductApplicable) return false;

    const isCollectionApplicable =
      Array.isArray(applicableCollections) && applicableCollections.length
        ? applicableCollections.some((ac) => (c.collections || []).includes(ac))
        : true;

    return isCollectionApplicable;
  });

  const totalAmount = getTotalPrice(cartList);

  if (minOrderValue && minOrderValue > totalAmount) {
    return {
      ...coupon,
      allowed: false,
      message: `Add product worth ₹${
        minOrderValue - totalAmount
      } more to the cart.`,
    };
  }

  const totalItems = getCartCount(cartList);
  if (buyXQuantity + finalGetYQty > totalItems) {
    return {
      ...coupon,
      allowed: false,
      message: `Add ${
        buyXQuantity + getYQuantity - totalItems
      } more items to the cart.`,
    };
  }

  if (Array.isArray(applicableProducts) && applicableProducts.length) {
    const hasProduct = cartItems
      .filter((c) => c.cartItemSource !== "COUPON")
      .some((c) => applicableProducts.includes(c.id));

    if (!hasProduct) {
      return {
        ...coupon,
        allowed: false,
        message: `Not applicable on the products in the cart.`,
      };
    }
  }

  if (Array.isArray(applicableCollections) && applicableCollections.length) {
    const hasCollection = cartItems
      .filter((c) => c.cartItemSource !== "COUPON")
      .some((c) =>
        applicableCollections.some((ac) => (c.collections || []).includes(ac))
      );

    if (!hasCollection) {
      return {
        ...coupon,
        allowed: false,
        message: `Not applicable on the products in the cart.`,
      };
    }
  }

  const { discountMsg } = getCouponMessage(coupon);

  if (couponType === "FIXED") {
    const discount = maxDiscount
      ? Math.min(maxDiscount, getYAmount)
      : getYAmount;
    return {
      ...coupon,
      allowed: true,
      discount,
      message: discountMsg,
    };
  }

  if (couponType === "PERCENTAGE") {
    const discount = maxDiscount
      ? Math.min(maxDiscount, (getYPercentage * totalAmount) / 100)
      : (getYPercentage * totalAmount) / 100;

    return {
      ...coupon,
      allowed: true,
      discount,
      message: discountMsg,
    };
  }

  if (couponType === "PRODUCT") {
    const { price } = getProductPrice(getYStoreProduct);
    return {
      ...coupon,
      allowed: !!getYStoreProduct?.title,
      discount: price,
      message: getCouponMessage(coupon).discountMsg,
    };
  }

  // For couponType === BUY_X_GET_Y
  const cartAmounts = [];
  cartList.forEach((c) => {
    cartAmounts.push(...Array(parseInt(c.qty, 10)).fill(c.price));
  });

  const discountedQty = getBxGyFreeQuantity(
    getYQuantity,
    buyXQuantity,
    cartList
  );

  cartAmounts.sort((a, b) => (b > a ? 1 : -1));
  const discountedItems = cartAmounts.slice(-discountedQty);
  const amt = discountedItems.reduce((a, b) => a + b, 0);
  const discount = maxDiscount ? Math.min(maxDiscount, amt) : amt;
  return {
    ...coupon,
    allowed: true,
    discount,
    message: discountMsg,
  };
};
