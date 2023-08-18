import React from "react";
import { connect } from "react-redux";

import { cartActions } from "~/store/cart";

import ALink from "~/components/features/custom-link";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { getProductMeta, productDiscountPercentage } from "~/utils/products";
import { toDecimal } from "~/utils";
import { Check, Delete } from "~/components/icons";
import useWindowDimensions from "~/utils/getWindowDimension";

const LimitedTimeProduct = ({ product, removeFromCart }) => {
  const { slug, images, title, listingPrice, recommendPrice } = product;

  const { isSmallSize } = useWindowDimensions();
  const { thumbImage } = getProductMeta(product);

  const removeItemFromCart = () => {
    removeFromCart(product);
  };

  return (
    <div className="limited-time-product-card-2">
      <div className="limited-time-deal-tag">Limited Time Deal</div>
      <div className="limited-time-added-product mb-2 pt-3">
        <div className="mobile-specific-cart-product-container d-flex p-relative pr-1 pl-2 mt-0">
          <div className="image-container">
            <figure>
              <ALink href={"/products/" + slug} className="p-0 border-2">
                <img
                  className="img2"
                  src={getPublicImageURL(thumbImage.imageKey)}
                  width={isSmallSize ? "80" : "100"}
                  height={isSmallSize ? "80" : "100"}
                  alt={images?.items[0]?.alt}
                />
              </ALink>
            </figure>
          </div>
          <div
            className={`cart-item-container ${isSmallSize ? "small-size" : ""}`}
          >
            <div className="text-left text-primary w-100 pr-2 ml-2">
              <div
                className="cart-product-title cart-product-size"
                title={title}
              >
                <ALink
                  className="p-0 overflow-ellipsis font-weight-bolder"
                  href={"/products/" + slug}
                >
                  {title}
                </ALink>
              </div>
              <div className="mt-1 d-flex mb-1 align-items-center">
                <p className="m-0 product-discount-listing">
                  <del className="summary-subtotal-listingprice mr-1">
                    ₹{toDecimal(listingPrice)}
                  </del>
                </p>
                <span className="sm-product-amount mr-1 font-weight-semi-bold">
                  ₹{toDecimal(recommendPrice)}
                </span>
                {productDiscountPercentage({
                  price: recommendPrice,
                  listingPrice: listingPrice,
                }) > 0 && (
                  <span
                    className={`discount-percentage ml-1 discount-card pl-1 pr-1`}
                  >
                    {productDiscountPercentage({
                      price: recommendPrice,
                      listingPrice: listingPrice,
                    })}
                    % off
                  </span>
                )}
              </div>
            </div>
            {!isSmallSize && (
              <>
                <div className="cart-added-item">
                  <div className="font-success">
                    {" "}
                    <Check />
                  </div>
                  <div className="font-success"> Added successfully</div>
                </div>
              </>
            )}
            <div className="product-close">
              <ALink
                href="#"
                onClick={removeItemFromCart}
                className="small-product-remove limited-deal"
                title="Remove this product"
              >
                <Delete />
              </ALink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  removeFromCart: cartActions.removeFromCart,
})(LimitedTimeProduct);
