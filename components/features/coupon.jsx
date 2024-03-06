import { useState, useCallback, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import { API } from "aws-amplify";
import {
  useFeaturedCoupons,
  getCouponDiscount,
  useBestCoupon,
} from "@wow-star/utils";

import ALink from "~/components/features/custom-link";
import { applyCoupon as applyCouponMutation } from "~/graphql/api";
import { cartActions } from "~/store/cart";
import { toDecimal } from "~/utils";
import { errorHandler } from "~/utils/errorHandler";
import { CloseIcon, RightAngle, CouponTag } from "~/components/icons";
import { Logger } from "aws-amplify";
import { LeftAngle } from "~/components/icons";
import useWindowDimensions from "~/utils/getWindowDimension";
import Modal from "~/components/common/modal";
import Image from "next/image";
import { STORE_ID } from "~/config";

const logger = new Logger("Coupon");

function Coupon(props) {
  const {
    user,
    cartList,
    applyCoupon,
    removeCoupon,
    appliedCoupon,
    addToCart,
    removeFromCart,
    layout = "cart",
  } = props;

  const [coupon, setCoupon] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isSliderOpen, setSliderOpen] = useState(false);
  const { isSmallSize } = useWindowDimensions();

  const openSlider = () => {
    setSliderOpen(true);
  };

  const closeSlider = () => {
    setSliderOpen(false);
  };

  const openModal = () => {
    setTimeout(() => {
      setIsCouponModalOpen(true);
    }, 500);
  };

  const closeModal = () => {
    setIsCouponModalOpen(false);
  };

  const { filteredFeaturedCoupons: featuredCoupons = [] } =
    useFeaturedCoupons();

  const { discount: couponTotal } = useMemo(
    () => getCouponDiscount(appliedCoupon, cartList),
    [appliedCoupon, cartList]
  );

  const bestCouponCode = useBestCoupon();

  useEffect(() => {
    if (bestCouponCode) {
      if (
        (!appliedCoupon || appliedCoupon?.autoApplied) &&
        appliedCoupon?.code !== bestCouponCode
      ) {
        applyCouponCode(bestCouponCode, true);
      }
    } else {
      if (appliedCoupon?.autoApplied) {
        removeCoupon();
      }
    }
  }, [bestCouponCode, cartList]);

  const applyCouponCode = useCallback(
    async (couponCode, autoApplied = false) => {
      setLoading(true);

      const response = await API.graphql({
        query: applyCouponMutation,
        authMode: "API_KEY",
        variables: {
          storeId: STORE_ID,
          code: couponCode,
          deviceType: "WEB",
          variantFilter: { status: { ne: "DISABLED" } },
          imageLimit: 1,
        },
      })
        .then((data) => data.data.applyCoupon)
        .catch(errorHandler);

      setCoupon("");
      setLoading(false);

      if (response) {
        const {
          allowed,
          message,
          coupon: couponResponse,
        } = getCouponDiscount(response, cartList);

        if (allowed) {
          applyCoupon({ ...couponResponse, autoApplied: !!autoApplied });
          openModal();

          isSliderOpen && closeSlider();
          logger.info("Applied coupon:", response);
        } else {
          setError(message);
          logger.error("Failed to apply coupon:", message);
        }
      } else {
        setError("Coupon not found");
        logger.error("Coupon not found");
      }
    },
    [user, cartList]
  );

  const onCouponRemove = (e) => {
    e.stopPropagation();
    cartList.forEach((item) => {
      if (item.cartItemSource === "COUPON") {
        removeFromCart(item);
      }
    });

    removeCoupon();
    logger.info("Removed coupon");
  };

  const openCouponModal = () => {
    logger.verbose("Opened coupon modal");
  };

  return (
    <>
      {layout === "cart" && (
        <div>
          {!!appliedCoupon && (
            <div className="d-flex justify-content-between padding-coupon-heading">
              <div>
                <h4 className="coupon-heading">Coupons</h4>
              </div>
              <div className="cart-product-size">
                <ALink
                  href="#"
                  className="view-offers-link"
                  onClick={openSlider}
                >
                  View More Offers +
                </ALink>
              </div>
            </div>
          )}
          <div
            className={`padding-coupon-container ${
              appliedCoupon ? "pt-0" : ""
            }`}
          >
            <div
              className={`coupon-container coupon-container2 ${
                !!appliedCoupon
                  ? "coupon-container2-applied-background"
                  : "coupon-container2-nocoupon-background"
              }`}
            >
              <div className="applied-coupons-container">
                {!!appliedCoupon ? (
                  <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-start">
                      <div className="applied-coupon-tag">
                        <span className="coupon-code">
                          {appliedCoupon.code}
                        </span>
                      </div>
                      <div className="coupon-status-applied">Applied</div>
                    </div>
                    <ALink
                      href="#"
                      className="view-offers-link"
                      onClick={onCouponRemove}
                    >
                      <CloseIcon />
                    </ALink>
                  </div>
                ) : (
                  <ALink
                    href="#"
                    onClick={() => {
                      openSlider(), setError("");
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center coupon-block-width">
                      <div className="d-flex align-items-center">
                        <CouponTag size={isSmallSize ? 18 : 20} />
                        <div className="apply-coupon-button ml-3">
                          Apply Coupon
                        </div>
                      </div>
                      <div>
                        <RightAngle size={isSmallSize ? 18 : 20} />
                      </div>
                    </div>
                  </ALink>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {layout === "checkout" && (
        <div className="card accordion">
          <div className="alert alert-light alert-primary alert-icon mb-4 card-header">
            <i className="d-icon-percent"></i>
            <span className="text-body">Have a coupon?</span>{" "}
            <ALink
              href="#"
              onClick={openCouponModal}
              className="text-primary collapse"
            >
              Click here to apply
            </ALink>
          </div>
        </div>
      )}

      <Modal
        isOpen={isCouponModalOpen}
        isCloseIcon={false}
        onRequestClose={closeModal}
        shouldReturnFocusAfterClose={false}
        overlayClassName="auth-modal-overlay login-modal-container"
        className="applied-coupon-modal"
      >
        <div className="applied-coupon-modal-container">
          <div
            className="close-icon"
            title="Remove this product"
            onClick={closeModal}
          >
            <CloseIcon size={36} color="gray" />
          </div>

          <div className="applied-coupon-modal-image">
            <Image
              src="/images/applied-coupon.gif"
              alt="Applied Coupon Gif"
              height={450}
              width={500}
            />
          </div>
          <div className="applied-coupon-modal-ticket">
            <Image
              src="/images/coupon-circle-with-ticket.svg"
              alt="Applied Coupon Gif"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="applied-coupon-modal-info">
            <div className="modal-title">
              "{appliedCoupon?.code || "Your"}" applied!
              {couponTotal > 0 && (
                <>
                  <div className="modal-amount">
                    ₹{toDecimal(couponTotal)} saved
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>

      <div className={`coupon-slider ${isSliderOpen ? "open" : ""}`}>
        <div className="slider-header p-0 coupon-heading">
          <div className="d-flex lh-1 align-items-center">
            <ALink href="#" onClick={closeSlider}>
              <LeftAngle />
            </ALink>
            <div className="cart-title ml-2">
              COUPONS ({featuredCoupons.length})
            </div>
          </div>
        </div>
        <div className="slider-content">
          <div
            className={`coupons-input-wrapper d-flex align-items-center justify-content-between mb-2 coupon-input`}
          >
            <input
              className={`form-control form-control-v2 mr-2 ${
                !!error && "coupon-error-box-border"
              } border-none`}
              type="text"
              name="coupon_code"
              placeholder="Enter coupon code here"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button
              className={`apply-button d-flex justify-content-center align-items-center ${
                coupon ? "text-dark" : ""
              }`}
              disabled={loading}
              onClick={() => {
                !!coupon && applyCouponCode(coupon);
              }}
            >
              <span className=" mr-2">Apply</span>

              {loading && <div className="spin-loader" />}
            </button>
          </div>
          <span className="coupon-error-lable">{error}</span>

          {!!featuredCoupons?.length && (
            <div className="mt-3 all-coupons-container">
              {featuredCoupons
                .filter((c) => !!c.coupon)
                .map(({ allowed, coupon, message }) => {
                  let className = "btn btn-link ml-2 btn-apply";
                  if (!allowed) {
                    className = `${className} btn-disabled`;
                  }

                  const showAsterik = !!(
                    coupon.applicableProducts?.length ||
                    coupon.applicableCollections?.length
                  );

                  return (
                    <div
                      key={coupon.id}
                      className={`${
                        appliedCoupon?.code !== coupon.code
                          ? "featured-coupon-slider"
                          : "featured-coupon-slider-applied"
                      } mb-3`}
                    >
                      <div className="featured-coupon-text-content mr-0">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div
                              className={`${
                                appliedCoupon?.code === coupon.code
                                  ? "applied-coupon-tag"
                                  : "coupon-tag2 coupon-modal-tag-color"
                              }`}
                            >
                              <strong>{coupon.code}</strong>
                            </div>
                            {appliedCoupon?.code === coupon.code && (
                              <span className="ml-2 coupon-applied-text">
                                Applied
                              </span>
                            )}
                          </div>
                          {appliedCoupon?.code === coupon.code && (
                            <ALink
                              onClick={onCouponRemove}
                              href="#"
                              className="coupon-remove"
                              disabled={!allowed}
                            >
                              Remove
                            </ALink>
                          )}
                        </div>
                        <div
                          className={`coupon-tagline2 ${
                            !allowed && "text-secondary"
                          }`}
                        >
                          {message}
                          {showAsterik && "*"}
                        </div>
                      </div>
                      <div className="d-flex justify-content-between ">
                        <p className="m-0 coupon-message">{message}</p>
                        {appliedCoupon?.code !== coupon.code && (
                          <div className="d-flex flex-column justify-content-end">
                            <button
                              onClick={() => {
                                applyCouponCode(coupon.code);
                                closeSlider();
                              }}
                              className={`btn btn-primary coupon-apply-button${
                                !allowed ? " disabled-coupon" : ""
                              }`}
                              disabled={!allowed}
                            >
                              Apply
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          <p className="text-black">*Applicable on certain products</p>
        </div>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    cartList: state.cart.data ? state.cart.data : [],
    user: state.user.data,
    appliedCoupon: state.cart.coupon,
  };
}

export default connect(mapStateToProps, {
  addToCart: cartActions.addToCart,
  removeFromCart: cartActions.removeFromCart,
  applyCoupon: cartActions.applyCoupon,
  removeCoupon: cartActions.removeCoupon,
})(Coupon);
