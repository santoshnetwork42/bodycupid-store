import { getCartCount, getTotalPrice } from "~/utils";
import { getBxGyFreeQuantity, getBxAyOnQuantity } from "./helper";
import { getProductPrice } from "./products";

export const getCouponMessage = ({
  couponType,
  buyXQuantity,
  getYAmount,
  getYPercentage,
  getYQuantity,
  paymentMethod,
  getYStoreProducts,
  minOrderValue,
  maxDiscount,
}) => {
  const freeGiftsLength = (getYStoreProducts || [])?.length;
  let discountMsg =
    "Lowest value item in the cart will be discounted off on the item total";

  if (couponType === "FIXED") {
    discountMsg = `₹${getYAmount} off from total ${
      !!freeGiftsLength ? `+ Get ${freeGiftsLength} Free Gifts!` : ""
    }`;
  } else if (couponType === "PERCENTAGE") {
    discountMsg = `${getYPercentage}% off from total ${
      !!freeGiftsLength ? `+ Get ${freeGiftsLength} Free Gifts!` : ""
    }`;
    if (maxDiscount) {
      discountMsg = `${discountMsg} upto ₹${maxDiscount}`;
    }
  } else if (couponType === "BUY_X_GET_Y" && getYQuantity > 1) {
    discountMsg = `${getYQuantity} items with the lowest value will be given away for free! ${
      !!freeGiftsLength ? `+ Get ${freeGiftsLength} Free Gifts!` : ""
    }`;
    if (maxDiscount) {
      discountMsg = `${discountMsg} upto ₹${maxDiscount}`;
    }
  } else if (couponType === "PRODUCT") {
    const titles = getYStoreProducts?.map((item) => item?.title) || [];
    const result = titles.length
      ? titles.length > 1
        ? `${titles.slice(0, -1).join(", ")} and ${titles.at(-1)}`
        : titles[0]
      : "";

    const totalFreeProductsPrice = getYStoreProducts
      ?.filter(Boolean)
      ?.reduce((acc, item) => acc + (getProductPrice(item)?.price || 0), 0);

    discountMsg = `FREE ${result}${
      totalFreeProductsPrice ? ` WORTH ₹${totalFreeProductsPrice}` : ""
    }`;
  } else if (couponType === "BUY_X_AT_Y") {
    discountMsg = `Buy ${buyXQuantity} @ ₹${getYAmount} ${
      !!freeGiftsLength ? `+ Get ${freeGiftsLength} Free Gifts!` : ""
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
    getYStoreProducts,
  } = coupon;

  const finalGetYQty = couponType === "BUY_X_GET_Y" ? getYQuantity : 0;

  const cartList = cartItems.filter((c) => {
    const isCouponItem =
      c.cartItemSource === "COUPON" || c.cartItemSource === "LIMITED_TIME_DEAL";
    if (isCouponItem) return false;

    const isProductApplicable =
      Array.isArray(applicableProducts) && applicableProducts.length
        ? applicableProducts.includes(c.id)
        : true;

    if (!isProductApplicable) return false;

    if (
      couponType === "BUY_X_AT_Y" &&
      c.variants &&
      c.variants.items?.length &&
      c?.variantId !== c?.variants?.items[0]?.id
    ) {
      return false;
    }

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
      } more to the cart to avail this free product`,
    };
  }

  const totalItems = getCartCount(cartList);
  if (buyXQuantity + finalGetYQty > totalItems) {
    return {
      ...coupon,
      allowed: false,
      message: `Add ${
        buyXQuantity + getYQuantity - totalItems
      } more items to the cart to avail this free product`,
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

  const totalValueOfFreebies = (getYStoreProducts || [])?.reduce(
    (acc, getYStoreProduct) => {
      const { price = 0 } = getProductPrice(getYStoreProduct);
      acc += price;
      return acc;
    },
    0
  );
  const { discountMsg } = getCouponMessage(coupon);

  if (couponType === "FIXED") {
    const discount =
      (maxDiscount ? Math.min(maxDiscount, getYAmount) : getYAmount) +
      totalValueOfFreebies;
    return {
      ...coupon,
      allowed: true,
      discount,
      message: discountMsg,
    };
  }

  if (couponType === "PERCENTAGE") {
    const discount =
      (maxDiscount
        ? Math.min(maxDiscount, (getYPercentage * totalAmount) / 100)
        : (getYPercentage * totalAmount) / 100) + totalValueOfFreebies;

    return {
      ...coupon,
      allowed: true,
      discount,
      message: discountMsg,
    };
  }

  if (
    couponType === "PRODUCT" &&
    Array.isArray(getYStoreProducts) &&
    !!getYStoreProducts?.length
  ) {
    return {
      coupon,
      allowed: true,
      discount: totalValueOfFreebies,
      message: getCouponMessage(coupon).discountMsg,
    };
  }

  if (couponType === "FREEBIE") {
    // const { price } = getProductPrice(getYStoreProduct);
    return {
      ...coupon,
      allowed: false,
      discount: 0,
      message: getCouponMessage(coupon).discountMsg,
    };
  }

  // For couponType === BUY_X_GET_Y
  const cartAmounts = [];
  cartList.forEach((c) => {
    cartAmounts.push(...Array(parseInt(c.qty || 0, 10)).fill(c.price));
    cartAmounts.sort((a, b) => (b > a ? 1 : -1));
  });

  if (couponType === "BUY_X_GET_Y") {
    const discountedQty = getBxGyFreeQuantity(
      getYQuantity,
      buyXQuantity,
      cartList
    );

    const discountedItems = cartAmounts.slice(-discountedQty);
    const amt = discountedItems.reduce((a, b) => a + b, 0);
    const discount =
      (maxDiscount ? Math.min(maxDiscount, amt) : amt) + totalValueOfFreebies;
    return {
      ...coupon,
      allowed: true,
      discount,
      message: discountMsg,
    };
  }

  if (couponType === "BUY_X_AT_Y") {
    const discountedQty = getBxAyOnQuantity(buyXQuantity, cartList);
    const discountedItems = cartAmounts.slice(0, discountedQty);
    const amt = discountedItems.reduce((a, b) => a + b, 0);
    const discountedAmount = (discountedQty / buyXQuantity) * getYAmount;
    const discount =
      (discountedAmount < amt ? amt - discountedAmount : 0) +
      totalValueOfFreebies;
    return {
      ...coupon,
      allowed: true,
      discount,
      message: discountMsg,
    };
  }

  return {
    ...coupon,
    allowed: false,
    discount: 0,
    message: "Invalid Coupon",
  };
};
