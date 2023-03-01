import React, { useMemo } from "react";
import { toDecimal } from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";

export default function ProductVariant({ item, onSelect, selected }) {
  const { listingPrice, price } = item;
  const save = useMemo(() => {
    if (listingPrice && listingPrice > price) {
      return Math.round(((listingPrice - price) * 100) / listingPrice);
    }
    return 0;
  }, [listingPrice, price]);

  return (
    <div
      key={item.id}
      className={`variant-card-wrapper ${
        item.id === selected ? "selected" : ""
      }`}
      onClick={() => onSelect(item.id)}
    >
      {save > 0 && <div className="product-save">-{save}%</div>}

      <div className="image-wrapper">
        <img
          className="product-image"
          src={getPublicImageURL(item.imageUrl)}
          alt={item.title}
          width="137"
          height="137"
        />
      </div>

      <div className="product-detail">
        <div className="product-title">
          <div>{item.title}</div>
          <div className="product-desc mt-1">{item.title}</div>
        </div>

        <div className="product-price mb-2 d-flex">
          <ins className="new-price mr-2">₹{toDecimal(price)}</ins>{" "}
          {listingPrice > price && (
            <>
              <del className="old-price mr-2">₹{listingPrice}</del>{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
