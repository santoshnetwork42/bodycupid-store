import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { cartActions } from "~/store/cart";

import ALink from "~/components/features/custom-link";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { getProductMeta } from "~/utils/products";
import { toDecimal } from "~/utils";
import { Clock, LimitedTimeDiscount } from "~/components/icons";
import CircularTimer from "~/components/partials/cart/v2/circular-timer";
import { LIMITED_TIME_DEAL_DURATION } from "~/constant";
import useWindowDimensions from "~/utils/getWindowDimension";

const LimitedTimeProductDeal = ({
  parentRecordKey,
  product,
  addedAt,
  addToCart,
}) => {
  const { slug, images, title, listingPrice, recommendPrice } = product;
  const [showLTOProduct, setShowLTOProduct] = useState(true);
  const { isSmallSize } = useWindowDimensions();

  const { thumbImage } = getProductMeta(product);

  useEffect(() => {
    const addedAtTimestamp = new Date(addedAt).valueOf();
    const nowTimestamp = new Date().valueOf();
    const timeDifference = nowTimestamp - addedAtTimestamp;

    let timeoutId;
    if (timeDifference <= LIMITED_TIME_DEAL_DURATION * 60 * 1000) {
      setShowLTOProduct(true);

      timeoutId = setTimeout(() => {
        setShowLTOProduct(false);
      }, LIMITED_TIME_DEAL_DURATION * 60 * 1000 - timeDifference);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      qty: 1,
      cartItemSource: "LIMITED_TIME_DEAL",
      parentRecordKey,
    });
  };

  return (
    <>
      {showLTOProduct && (
        <div className="limited-time-product-card mt-4">
          <div
            className={`limited-time-deal-overlay ${
              isSmallSize ? "grid-container" : "d-flex justify-content-between"
            }`}
          >
            <div className="limited-time-text align-left">
              Add to your cart now to avail limited time deal!
            </div>
            <span className="limited-time-text font-weight-bolder">
              Limited Time Deal
            </span>
          </div>

          <div className="limited-time-product">
            <div
              className={`mobile-specific-cart-product-container cart-product-contaimer mobile-specific-card d-flex p-relative pt-8 pr-1 pb-2 limited-time-deal-card ${
                isSmallSize ? "mb-0 pl-3" : "mb-2 pl-4"
              }`}
            >
              <div className="image-container">
                <div className="svg-overlay">
                  <LimitedTimeDiscount discountAmount={60} />
                </div>
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
                className={`cart-item-container ${
                  isSmallSize ? "small-size" : ""
                }`}
              >
                <div className="text-left text-primary w-100 mr-1 ml-2">
                  <div
                    className="cart-product-title cart-product-size"
                    title={title}
                  >
                    <ALink
                      className="p-0 overflow-ellipsis font-weight-normal"
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
                  </div>
                  <div className="product-savings">
                    You saved ₹{listingPrice - recommendPrice}
                  </div>
                </div>
                {!isSmallSize && (
                  <div className="cart-item-quantity">
                    <div className="mb-1">
                      <div className="ml-8">
                        <CircularTimer
                          duration={LIMITED_TIME_DEAL_DURATION * 60}
                        />
                      </div>
                      <div className="ml-8">
                        <button
                          onClick={handleAddToCart}
                          className={`btn btn-product btn-primary btn-rounded btn-checkout w-100 font-weight-bold flex-60 button-padding`}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {isSmallSize && (
              <div className="d-flex justify-content-between section-padding">
                <div className="timer-container">
                  <div className="icon-container">
                    <Clock size={16} color={"white"} />
                  </div>
                  <div className="timer-content">
                    <CircularTimer duration={LIMITED_TIME_DEAL_DURATION * 60} />
                  </div>
                </div>

                <div className="ml-8">
                  <button
                    onClick={handleAddToCart}
                    className={`btn btn-product btn-primary btn-rounded btn-checkout w-100 font-weight-bold flex-60 button-padding`}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    cartList: state.cart.data || [],
  };
}

export default connect(mapStateToProps, {
  addToCart: cartActions.addToCart,
  removeFromCart: cartActions.removeFromCart,
})(LimitedTimeProductDeal);
