export const getCouponMessage = ({ couponType, discount, paymentMethod }) => {
  let discoutMsg =
    "Lowest value item in the cart will be discounted off on the item total.";
  if (couponType === "FIXED") {
    discoutMsg = `₹${discount} off on item total.`;
  } else if (couponType === "PERCENTAGE") {
    discoutMsg = `${discount}% off on item total.`;
  }

  let paymentTypeMsg = "Applicable on both online payment and COD.";
  if (paymentMethod === "COD") {
    paymentTypeMsg = "Applicable on COD.";
  } else if (paymentMethod === "PREPAID") {
    paymentTypeMsg = "Applicable on online payment.";
  }

  return `${discoutMsg} ${paymentTypeMsg}`;
};
