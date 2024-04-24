import React from "react";
import ALink from "~/components/features/custom-link";
import { toDecimal } from "~/utils";

const VariantCard = (props) => {
  const { variant, onChange } = props;

  const { price, listingPrice } = variant;
  const save = Math.round(listingPrice - price);
  return (
    <div
      className={`btn-padding width-variant cursor-pointer d-flex align-items-center ${
        variant.selected ? "btn-selected" : ""
      } ${variant.active ? "" : "btn-inactive justify-content-center"}`}
      onClick={onChange}
    >
      <div>
        {save > 0 && <div className="save-label">Save ₹{save}</div>}
        <div className={`label ${price > 0 ? "wrap" : ""}`}>
          {variant.label}
        </div>
        {price > 0 && (
          <div className="large-price-text font-weight-bold">
            {`${price >= listingPrice ? "MRP: " : ""}  ₹${toDecimal(price)}`}
          </div>
        )}
        {listingPrice > price && (
          <>
            <del className="listing-price">MRP: ₹{listingPrice}</del>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default VariantCard;
