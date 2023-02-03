import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import ALink from "~/components/features/custom-link";

import { toDecimal } from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";

function SmallProduct(props) {
  const { product, adClass, isReviewCount = true } = props;

  const thumbImage =
    product.images.items.find((i) => i.isThumb) || product.images.items[0];

  return (
    <div className={`product product-list-sm ${adClass}`}>
      <figure className="product-media">
        <ALink href={`/product/default/${product.id}`}>
          <LazyLoadImage
            alt={thumbImage?.alt}
            src={getPublicImageURL(thumbImage?.imageKey)}
            threshold={500}
            effect="opacity"
            width="300"
            height="338"
          />

          {product.images.items.length >= 2 && (
            <LazyLoadImage
              alt={product.images.items[1].alt}
              src={getPublicImageURL(product.images.items[1].imageKey)}
              threshold={500}
              width="300"
              height="338"
              effect="opacity"
              wrapperClassName="product-image-hover"
            />
          )}
        </ALink>
      </figure>

      <div className="product-details">
        <h3 className="product-name">
          <ALink href={`/product/default/${product.slug}`}>
            {product.name}
          </ALink>
        </h3>

        <div className="product-price">
          {/* {
                        product.price[0] !== product.price[1] ?
                            product.variants && product.variants.length === 0 || (product.variants && product.variants.length > 0 && !product.variants[0].price) ?
                                <>
                                    <ins className="new-price">₹{toDecimal(product.price[0])}</ins>
                                    <del className="old-price">₹{toDecimal(product.price[1])}</del>
                                </>
                                :
                                < del className="new-price">₹{toDecimal(product.price[0])} – ₹{toDecimal(product.price[1])}</del>
                            : <ins className="new-price">₹{toDecimal(product.price[0])}</ins>
                    } */}
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
            <ALink
              href={`/product/default/${product.slug}`}
              className="rating-reviews"
            >
              ( {product.reviews} reviews )
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
