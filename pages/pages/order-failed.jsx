import React from "react";
import ALink from "~/components/features/custom-link";

const orderFailed = () => {
  return (
    <div className="page-content">
      <section className="error-section d-flex flex-column justify-content-center align-items-center text-center pl-3 pr-3 bg-white">
        <h1 className="mb-2 ls-m">Order failed!</h1>
        <img
          src="/images/subpages/failed-icon.png"
          alt="order failed"
          width="150"
          height="131"
        />
        <h4 className="mt-7 mb-0 ls-m text-uppercase">
          Ooopps! We are unable to place your order
        </h4>
        <p className="text-grey font-primary ls-m">
          Please try again after some time
        </p>
        <ALink href="/" className="btn btn-dark btn-rounded mb-4">
          Back to homepage
        </ALink>
      </section>
    </div>
  );
};

export default orderFailed;
