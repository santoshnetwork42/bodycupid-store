import { getCartCount, getTotalPrice, toDecimal } from "~/utils";

export const getCouponMessage = ({ couponType, getYAmount, getYPercentage, getYQuantity, paymentMethod }) => {
  let discoutMsg =
    "Lowest value item in the cart will be discounted off on the item total.";
  if (couponType === "FIXED") {
    discoutMsg = `₹${getYAmount} off on item total.`;
  } else if (couponType === "PERCENTAGE") {
    discoutMsg = `${getYPercentage}% off on item total.`;
  } else if (couponType === "BUY_X_GET_Y" && getYQuantity > 1) {
    discoutMsg = `Lowest value ${getYQuantity} items in the cart will be discounted off on the item total.`;
  }

  let paymentTypeMsg = "Applicable on both online payment and COD.";
  if (paymentMethod === "COD") {
    paymentTypeMsg = "Applicable on COD.";
  } else if (paymentMethod === "PREPAID") {
    paymentTypeMsg = "Applicable on online payment.";
  }

  return `${discoutMsg} ${paymentTypeMsg}`;
};

export const getCouponDiscount = (coupon, cartList) => {
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

  const totalAmount = getTotalPrice(cartList);

  if (minOrderValue && minOrderValue > totalAmount) {
    return {
      ...coupon,
      allowed: false,
      message: `Add product worth ₹${minOrderValue - totalAmount} more in the cart`,
    };
  }

  const totalItems = getCartCount(cartList);
  if ((buyXQuantity + getYQuantity) > totalItems) {
    return {
      ...coupon,
      allowed: false,
      message: `Add ${buyXQuantity + getYQuantity - totalItems} more items in the cart`,
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
    const discount = maxDiscount ? Math.min(maxDiscount, getYAmount) : getYAmount;
    return {
      ...coupon,
      allowed: true,
      discount,
      message: `You will save ₹${toDecimal(discount)} with this coupon`,
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
      message: `You will save ₹${toDecimal(discount)} with this coupon`,
    };
  }

  if (couponType === "PRODUCT") {
    return {
      ...coupon,
      allowed: true,
      discount: 0,
      message: '',
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
    message: `You will save ₹${toDecimal(discount)} with this coupon`,
  };
};