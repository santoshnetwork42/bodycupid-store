import React from "react";
import NextImage from "~/components/image";

function PaymentLogos() {
  return (
    <figure className="payment">
      <NextImage
        src="/images/payment.png"
        alt="payment"
        width="200"
        height="50"
        objectFit="contain"
        priority={false}
        loader="local"
      />
    </figure>
  );
}

export default PaymentLogos;
