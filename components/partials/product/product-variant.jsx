import React, { useMemo } from "react";
import Image from "next/image";

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
      <div className="product-label-group">
        {save > 0 && (
          <label className="product-label label-sale">-{save}%</label>
        )}
      </div>

      <div className="image-wrapper">
        <Image
          className="product-image"
          src={getPublicImageURL(item.imageUrl)}
          alt={item.title}
          priority
          height={137}
          width={137}
          quality={95}
        />
      </div>

      <div className="product-detail">
        <div className="product-title">
          <div>{item.title}</div>
        </div>

        <div className="product-price mb-2 d-flex mt-2">
          <ins className="new-price mr-2">₹{toDecimal(price)}</ins>{" "}
          {listingPrice > price && (
            <>
              <del className="old-price mr-2">₹{toDecimal(listingPrice)}</del>{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
