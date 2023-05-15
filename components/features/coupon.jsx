import { useState, useCallback, useMemo } from "react";
import { connect } from "react-redux";
import { API } from "aws-amplify";

import ALink from "~/components/features/custom-link";
import { applyCoupon as applyCouponMutation } from "~/graphql/api";
import { cartActions } from "~/store/cart";
import Modal from "~/components/common/modal";
import { getCouponMessage, getCouponDiscount } from "~/utils/coupons";
import { toDecimal } from "~/utils";
import { errorHandler } from "~/utils/errorHandler";
import { CheckBadge, Close, Discount, RightAngle } from "~/components/icons";
import { useFeaturedCoupons } from "~/utils/hooks/useCoupon";

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
  const [isOpen, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { discount: couponTotal } = useMemo(
    () => getCouponDiscount(appliedCoupon, cartList),
    [appliedCoupon, cartList]
  );

  const featuredCoupons = useFeaturedCoupons();

  const applyCouponCode = useCallback(
    async (couponCode = coupon) => {
      setLoading(true);

      const response = await API.graphql({
        query: applyCouponMutation,
        variables: {
          code: couponCode,
          variantFilter: { status: { ne: "DISABLED" } },
          imageLmit: 1,
        },
        authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY",
      })
        .then((data) => data.data.applyCoupon)
        .catch(errorHandler);

      setCoupon("");
      setLoading(false);

      if (response) {
        const { allowed, message, couponType, getYStoreProduct } =
          await getCouponDiscount(response, cartList);

        if (allowed) {
          applyCoupon(response);
          setOpen(false);
          if (couponType === "PRODUCT") {
            addToCart({
              ...getYStoreProduct,
              qty: 1,
              hideQty: true,
              cartItemSource: "COUPON",
            });
          }
        } else {
          setError(message);
        }
      } else {
        setError("Coupon not found");
      }
    },
    [coupon, user, cartList]
  );

  const onCouponRemove = () => {
    if (appliedCoupon?.couponType === "PRODUCT" && appliedCoupon?.getYProduct) {
      cartList.forEach((item) => {
        if (item.cartItemSource === "COUPON") {
          removeFromCart(item);
        }
      });
    }

    removeCoupon();
  };

  const showAppliedCoupon = !!(appliedCoupon && couponTotal);

  return (
    <>
      {layout === "cart" && (
        <div
          className="cart-coupon-box mb-2 pb-5 bg-white text-primary flex-row lh-default"
          onClick={() => !showAppliedCoupon && setOpen(true)}
        >
          <span className="mt-1 sm-product-remove">
            {showAppliedCoupon ? (
              <CheckBadge color="#17b31b" size={22} />
            ) : (
              <Discount color="#17b31b" size={22} />
            )}
          </span>{" "}
          <div className="w-100">
            <div>
              <div className="cart-coupon-container d-flex">
                <div className="d-flex">
                  <p className="ml-1 coupon-title mb-0 p-0 ls-m">
                    {showAppliedCoupon
                      ? `"${appliedCoupon.code}" applied`
                      : "Coupons and offers"}
                  </p>
                </div>

                {!!featuredCoupons.length && !showAppliedCoupon && (
                  <a
                    className="coupon-offer d-flex align-items-center"
                    type="button"
                  >
                    {`${featuredCoupons.length} Offers`}
                    <RightAngle size={14} />
                  </a>
                )}
                {showAppliedCoupon && (
                  <ALink
                    key={appliedCoupon.id}
                    href="#"
                    className="mt-1 mr-1"
                    title="Remove coupon"
                    onClick={onCouponRemove}
                  >
                    <Close color="grey" size={18} />
                  </ALink>
                )}
              </div>

              <div>
                {!showAppliedCoupon && (
                  <span className="ml-1 coupon-subtitle">
                    Save more with coupon and offers
                  </span>
                )}
                {showAppliedCoupon && (
                  <span className="ml-1 coupon-subtitle">
                    You saved additional ₹{toDecimal(couponTotal)}
                  </span>
                )}
                {/* {!!appliedCoupon && !showAppliedCoupon && (
              <div className="mt-1">
                <AlertPopup
                  message={couponMessage}
                  status="warning"
                  onClick={onCouponRemove}
                />
              </div>
            )} */}
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
              onClick={() => setOpen(true)}
              className="text-primary collapse"
            >
              Click here to apply
            </ALink>
          </div>
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onRequestClose={() => {
          setOpen(false);
          setError("");
        }}
        shouldReturnFocusAfterClose={false}
        overlayClassName="auth-modal-overlay coupon-modal-container"
        className="auth-popup bg-img"
      >
        <main className="main ">
          <div className="page-content mt-6 pb-2 bg-white text-primary mb-2">
            <div className="container">
              <div className="cart-coupon-modal m-8 lh-default">
                <h5 className="title coupon-title text-uppercase ls-m">
                  Coupons and offers
                </h5>
                <div
                  className={`coupons-input-wrapper d-flex align-items-center justify-content-between mb-2`}
                >
                  <input
                    className={`form-control mr-2 ${
                      !!error && "coupon-error-box-border"
                    }`}
                    type="text"
                    name="coupon_code"
                    placeholder="Enter coupon code here..."
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button
                    className="btn btn-primary coupon-apply-btn d-flex justify-content-center align-items-center"
                    disabled={loading}
                    onClick={() => !!coupon && applyCouponCode()}
                  >
                    <span className=" mr-1">Apply</span>

                    {loading && <div className="spin-loader" />}
                  </button>
                </div>
                <span className="coupon-error-lable">{error}</span>
                {!!featuredCoupons?.length && (
                  <div className="mt-8 all-coupons-container">
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
                        <div key={c.id} className="featured-coupon">
                          <div className="d-flex justify-content-between ">
                            <div className="featured-coupon-text-content">
                              <div className="coupon-tag">
                                <strong>{c.code}</strong>
                              </div>
                              <div
                                className={`coupon-tagline ${
                                  !c.allowed && "text-secondary"
                                }`}
                              >
                                {c.message}
                                {showAsterik && "*"}
                              </div>
                            </div>
                            <button
                              onClick={() => applyCouponCode(c.code)}
                              className={className}
                              disabled={!c.allowed}
                            >
                              Apply
                            </button>
                          </div>
                          <p className="m-0">{getCouponMessage(c).message}</p>
                        </div>
                      );
                    })}
                  </div>
                )}

                <p className="font-italic text-grey">
                  *Appicable on certain products
                </p>
              </div>
            </div>
          </div>
        </main>
      </Modal>
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
