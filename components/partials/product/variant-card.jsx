import { useMemo } from "react";

import Image from "~/components/image";
import { toDecimal } from "~/utils";

const VariantCard = (props) => {
  const { variant, onChange } = props;

  const { price, listingPrice } = variant;
  const save = useMemo(() => {
    if (listingPrice && listingPrice > price) {
      return Math.round(((listingPrice - price) * 100) / listingPrice);
    }
    return 0;
  }, [listingPrice, price]);

  return !!price ? (
    <div
      key={variant.id}
      className={`variant-card-wrapper ${variant.selected ? "selected" : ""} ${
        variant.active ? "" : "btn-inactive justify-content-center"
      }`}
      onClick={onChange}
    >
      <div className="product-label-group">
        {save > 0 && (
          <label className="product-label label-sale">-{save}%</label>
        )}
      </div>

      <div className="image-wrapper d-flex justify-content-center">
        <Image
          className="product-image"
          src={variant.images?.items[0]?.imageKey}
          alt={variant.title}
          priority
          height={100}
          width={100}
          quality={95}
        />
      </div>

      <div className="product-detail">
        <div className="product-title">
          <div>{variant.title || variant.label}</div>
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
  ) : (
    <div
      key={variant.id}
      className={`variant-card-wrapper pt-1 h-10 ${
        variant.selected ? "selected" : ""
      } ${variant.active ? "" : "btn-inactive justify-content-center"}`}
      onClick={onChange}
    >
      <div className="product-detail">
        <div className="product-title">
          <div>{variant.title || variant.label}</div>
        </div>
      </div>
    </div>
  );
};

export default VariantCard;
