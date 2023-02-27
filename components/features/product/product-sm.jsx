import React from "react";

import ALink from "~/components/features/custom-link";
import OptimizedImage from "../optimized-image";

import { toDecimal } from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";

function SmallProduct(props) {
  const { product, adClass, isReviewCount = true } = props;

  const thumbImage =
    product.images.items.find((i) => i.isThumb) || product.images.items[0];

  return (
    <div className={`product product-list-sm ${adClass}`}>
      <figure className="product-media">
        <ALink href={`/product/${product.slug}`}>
          {thumbImage?.image ? (
            <OptimizedImage
              optimizedData={thumbImage.image}
              alt={thumbImage.alt}
            />
          ) : (
            <span>
              <img src={getPublicImageURL(thumbImage?.imageKey)} />
            </span>
          )}

          {product.images.items.length >= 2 && (
            <>
              {product.images.items[1].image ? (
                <OptimizedImage
                  optimizedData={product.images.items[1].image}
                  alt={product.images.items[1].alt}
                  spanAttributes={{
                    className: "product-image-hover",
                  }}
                />
              ) : (
                <span className="product-image-hover">
                  <img
                    src={getPublicImageURL(product.images.items[1].imageKey)}
                    alt={product.images.items[1].alt}
                  />
                </span>
              )}
            </>
          )}
        </ALink>
      </figure>

      <div className="product-details">
        <h3 className="product-name">
          <ALink href={`/product/${product.slug}`}>{product.name}</ALink>
        </h3>

        <div className="product-price">
          <ins className="new-price">₹{toDecimal(product.price)}</ins>
        </div>

        <div className="ratings-container">
          <div className="ratings-full">
            <span
              className="ratings"
              style={{ width: Math.min(20 * product.rating, 100) + "%" }}
            ></span>
            <span className="tooltiptext tooltip-top">
              {toDecimal(product.ratings)}
            </span>
          </div>

          {isReviewCount ? (
            <ALink href={`/product/${product.slug}`} className="rating-reviews">
              ( {product.reviews.items.length} reviews )
            </ALink>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(SmallProduct);
