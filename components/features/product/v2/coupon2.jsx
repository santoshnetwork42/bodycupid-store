import { useState, useCallback, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import { API } from "aws-amplify";

import ALink from "~/components/features/custom-link";
import { applyCoupon as applyCouponMutation } from "~/graphql/api";
import { cartActions } from "~/store/cart";
import { getCouponMessage, getCouponDiscount } from "~/utils/coupons";
import { toDecimal } from "~/utils";
import { errorHandler } from "~/utils/errorHandler";
import {
  CloseIcon,
  Discount,
  Confetti,
  RightAngle,
  CouponTag,
} from "~/components/icons";
import { useFeaturedCoupons } from "~/utils/hooks/useCoupon";
import { Logger } from "aws-amplify";
import { LeftAngle } from "~/components/icons";
import useWindowDimensions from "~/utils/getWindowDimension";

const logger = new Logger("Coupon");

function Coupon2(props) {
  const {
    user,
    cartList,
    applyCoupon,
    removeCoupon,
    appliedCoupon,
    addToCart,
    removeFromCart,
    layout = "cart",
    isSmall,
  } = props;

  const [coupon, setCoupon] = useState("");
  const [isOpen, setOpen] = useState(false);
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

  const featuredCoupons = useFeaturedCoupons();

  const { discount: couponTotal, allowed } = useMemo(
    () => getCouponDiscount(appliedCoupon, cartList),
    [appliedCoupon, cartList]
  );
  const showAppliedCoupon = !!appliedCoupon;

  const bestCouponCode = useMemo(() => {
    if (appliedCoupon && !appliedCoupon.autoApplied && showAppliedCoupon)
      return appliedCoupon.code;

    const coupons = featuredCoupons.filter((f) => f.autoApply && f.allowed);
    const [bestCoupon] = coupons.sort((a, b) => b.discount - a.discount);
    return bestCoupon?.code;
  }, [featuredCoupons, appliedCoupon, showAppliedCoupon]);

  useEffect(() => {
    if (appliedCoupon?.autoApplied && !bestCouponCode) {
      removeCoupon();
    } else if (
      bestCouponCode &&
      (!appliedCoupon || appliedCoupon.autoApplied || !showAppliedCoupon)
    ) {
      if (appliedCoupon?.code !== bestCouponCode) {
        applyCouponCode(bestCouponCode, true);
      }
    }
  }, [bestCouponCode]);

  const applyCouponCode = useCallback(
    async (couponCode = coupon, autoApplied = false) => {
      setLoading(true);

      const response = await API.graphql({
        query: applyCouponMutation,
        authMode: "API_KEY",
        variables: {
          code: couponCode,
          variantFilter: { status: { ne: "DISABLED" } },
          imageLimit: 1,
        },
      })
        .then((data) => data.data.applyCoupon)
        .catch(errorHandler);

      setCoupon("");
      setLoading(false);

      if (response) {
        const { allowed, message, couponType, getYStoreProduct } =
          await getCouponDiscount(response, cartList);

        if (allowed) {
          cartList.forEach((item) => {
            if (item.cartItemSource === "COUPON") {
              removeFromCart(item);
            }
          });

          applyCoupon({ ...response, autoApplied: !!autoApplied });
          openModal();
          setOpen(false);

          if (couponType === "PRODUCT") {
            addToCart({
              ...getYStoreProduct,
              qty: 1,
              disableChange: true,
              cartItemSource: "COUPON",
            });
          }
          logger.info("Applied coupon:", response);
          isSliderOpen && closeSlider();
        } else {
          setError(message);
          logger.error("Failed to apply coupon:", message);
        }
      } else {
        setError("Coupon not found");
        logger.error("Coupon not found");
      }
    },
    [coupon, user, cartList]
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
    setOpen(true);
    logger.verbose("Opened coupon modal");
  };

  return (
    <>
      {layout === "cart" && (
        <div>
          {!!appliedCoupon && (
            <div className="d-flex justify-content-between padding-coupon-heading">
              <h4 className="coupon-heading">Coupons</h4>
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
            <div className="coupon-container coupon-container2">
              <div className="applied-coupons-container">
                {showAppliedCoupon ? (
                  <div className="d-flex justify-content-between">
                    <div className="coupon-tag2 mb-0">
                      <span className="coupon-code">{appliedCoupon.code}</span>
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

      {isCouponModalOpen && (
        <div onClick={closeModal}>
          <div>
            <Confetti />
          </div>
          <div className="modal-overlay">
            <div className="confetti-modal">
              <div className="modal-content ">
                <div
                  className="close-icon"
                  title="Remove this product"
                  onClick={closeModal}
                >
                  <CloseIcon size={24} color="grey" />
                </div>
                <div className="modal-icon">
                  <Discount size={35} color="#17b31b" />
                </div>
                <h4 className="modal-title">
                  '{appliedCoupon?.code || "Your"}' coupon applied!
                </h4>
                {couponTotal > 0 && (
                  <>
                    <h3 className="modal-amount">
                      ₹{toDecimal(couponTotal)} saved
                    </h3>
                    <h6 className="modal-savings">through this coupon</h6>
                  </>
                )}
                <button className="close-button" onClick={closeModal}>
                  Hurrah!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`coupon-slider ${isSliderOpen ? "open" : ""}`}>
        <div className="slider-header p-0 coupon-heading">
          <div className="d-flex lh-1 align-items-center">
            <ALink href="#" onClick={closeSlider}>
              <LeftAngle />
            </ALink>
            <div className="cart-title-2 ml-2">
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
                !!coupon && applyCouponCode();
              }}
            >
              <span className=" mr-2">Apply</span>

              {loading && <div className="spin-loader" />}
            </button>
          </div>
          <span className="coupon-error-lable">{error}</span>

          {!!featuredCoupons?.length && (
            <div className="mt-3 all-coupons-container">
              {featuredCoupons.map((c) => {
                let className = "btn btn-link ml-2 btn-apply";
                if (!c.allowed) {
                  className = `${className} btn-disabled`;
                }

                const showAsterik = !!(
                  c.applicableProducts?.length ||
                  c.applicableCollections?.length
                );

                return (
                  <div
                    key={c.id}
                    className={`${
                      appliedCoupon?.code !== c.code
                        ? "featured-coupon-slider"
                        : "featured-coupon-slider-applied"
                    } mb-3`}
                  >
                    <div className="featured-coupon-text-content mr-0">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <div
                            className={`${
                              appliedCoupon?.code === c.code
                                ? "applied-coupon-tag"
                                : "coupon-tag2 coupon-modal-tag-color"
                            }`}
                          >
                            <strong>{c.code}</strong>
                          </div>
                          {appliedCoupon?.code === c.code && (
                            <span className="ml-2 coupon-applied-text">
                              Applied
                            </span>
                          )}
                        </div>
                        {appliedCoupon?.code === c.code && (
                          <ALink
                            onClick={onCouponRemove}
                            href="#"
                            className="coupon-remove2"
                            disabled={!c.allowed}
                          >
                            Remove
                          </ALink>
                        )}
                      </div>
                      <div
                        className={`coupon-tagline2 ${
                          !c.allowed && "text-secondary"
                        }`}
                      >
                        {c.message}
                        {showAsterik && "*"}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between ">
                      <p className="m-0 coupon-message">
                        {getCouponMessage(c).message}
                      </p>
                      {appliedCoupon?.code !== c.code && (
                        <div className="d-flex flex-column justify-content-end">
                          <button
                            onClick={() => {
                              applyCouponCode(c.code);
                            }}
                            className={`btn btn-primary coupon-apply-button${
                              !c.allowed ? " disabled-coupon" : ""
                            }`}
                            disabled={!c.allowed}
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
})(Coupon2);
