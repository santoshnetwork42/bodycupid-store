import { getCartCount, getTotalPrice, toDecimal } from "~/utils";

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
    discountMsg = `₹${getYAmount} off on item total`;
  } else if (couponType === "PERCENTAGE") {
    discountMsg = `${getYPercentage}% off on item total`;
    if (maxDiscount) {
      discountMsg = `${discountMsg} upto ₹${maxDiscount}`;
    }
  } else if (couponType === "BUY_X_GET_Y" && getYQuantity > 1) {
    discountMsg = `Lowest value ${getYQuantity} items in the cart will be discounted off on the item total`;
    if (maxDiscount) {
      discountMsg = `${discountMsg} upto ₹${maxDiscount}`;
    }
  } else if (couponType === "PRODUCT") {
    discountMsg = `FREE ${getYStoreProduct?.title} WORTH ₹${getYStoreProduct?.price}`;
  }

  if (minOrderValue) {
    discountMsg = `${discountMsg} on orders above ₹${minOrderValue}.`;
  } else {
    discountMsg = `${discountMsg}.`;
  }

  let paymentTypeMsg = "Applicable on both online payment and COD.";
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

  const cartList = cartItems.filter((c) => {
    const isCartItem = c.cartItemSource !== "COUPON";
    if (!isCartItem) return false;

    const isProductApplicable = Array.isArray(applicableProducts) && applicableProducts.length
      ? applicableProducts.includes(c.id)
      : true

    if (!isProductApplicable) return false;

    const isCollectionApplicable = Array.isArray(applicableCollections) && applicableCollections.length
      ? applicableCollections.some(ac => (c.collections || []).includes(ac))
      : true;

    return isCollectionApplicable;
  });

  const totalAmount = getTotalPrice(cartList);

  if (minOrderValue && minOrderValue > totalAmount) {
    return {
      ...coupon,
      allowed: false,
      message: `Add product worth ₹${minOrderValue - totalAmount
        } more in the cart`,
    };
  }

  const totalItems = getCartCount(cartList);
  if (buyXQuantity + getYQuantity > totalItems) {
    return {
      ...coupon,
      allowed: false,
      message: `Add ${buyXQuantity + getYQuantity - totalItems
        } more items in the cart`,
    };
  }

  if (Array.isArray(applicableProducts) && applicableProducts.length) {
    const hasProduct = cartItems.filter(c => c.cartItemSource !== "COUPON").some((c) => applicableProducts.includes(c.id));

    if (!hasProduct) {
      return {
        ...coupon,
        allowed: false,
        message: `Not applicable on the products in the cart`,
      };
    }
  }

  if (Array.isArray(applicableCollections) && applicableCollections.length) {
    const hasCollection = cartItems.filter(c => c.cartItemSource !== "COUPON").some((c) =>
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
    return {
      ...coupon,
      allowed: !!getYStoreProduct?.title,
      discount: getYStoreProduct?.price,
      message: getCouponMessage(coupon).discountMsg,
    };
  }

  // For couponType === BUY_X_GET_Y
  const cartAmounts = [];
  cartList.forEach((c) => {
    cartAmounts.push(...Array(parseInt(c.qty, 10)).fill(c.price));
  });

  cartAmounts.sort((a, b) => (b > a ? 1 : -1));
  cartAmounts.splice(0, buyXQuantity);
  const discountedItems = cartAmounts.slice(-getYQuantity);
  const amt = discountedItems.reduce((a, b) => a + b, 0);
  const discount = maxDiscount ? Math.min(maxDiscount, amt) : amt;
  return {
    ...coupon,
    allowed: true,
    discount,
    message: discountMsg,
  };
};
