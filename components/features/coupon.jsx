import { useState, useCallback } from "react";
import { connect } from "react-redux";
import { API } from "aws-amplify";

import ALink from "~/components/features/custom-link";
import { applyCoupon as applyCouponMutation } from "~/graphql/api";
import { cartActions } from "~/store/cart";
import Modal from "~/components/common/modal";
import { getCouponMessage, getCouponDiscount } from "~/utils/coupons";
import { getCouponTotal, toDecimal } from "~/utils";
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
    layout = "cart",
  } = props;

  const [coupon, setCoupon] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const featuredCoupons = useFeaturedCoupons();

  const applyCouponCode = useCallback(
    async (couponCode = coupon) => {
      setLoading(true);

      const response = await API.graphql({
        query: applyCouponMutation,
        variables: { code: couponCode },
        authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY",
      })
        .then((data) => data.data.applyCoupon)
        .catch(errorHandler);

      setCoupon("");
      setLoading(false);

      if (response) {
        const { allowed, message } = await getCouponDiscount(
          response,
          cartList
        );

        if (allowed) {
          applyCoupon(response);
          setOpen(false);
        } else {
          setError(message);
        }
      } else {
        setError("Coupon not found");
      }
    },
    [coupon, user, cartList]
  );

  return (
    <>
      {layout === "cart" && (
        <div
          className="cart-coupon-box mb-2 pb-5 bg-white text-primary lh-default"
          onClick={() => !appliedCoupon && setOpen(true)}
        >
          <div className="cart-coupon-container d-flex">
            <div className="d-flex">
              <span className="mt-1 sm-product-remove">
                {!!appliedCoupon ? (
                  <CheckBadge color="#17b31b" size={22} />
                ) : (
                  <Discount color="#17b31b" size={22} />
                )}
              </span>
              <div>
                <p className="ml-2 coupon-title mb-1 p-0 ls-m">
                  {!!appliedCoupon
                    ? `"${appliedCoupon.code}" applied`
                    : "Coupons and offers"}
                </p>
                {!appliedCoupon && (
                  <span className="ml-2 coupon-subtitle">
                    Save more with coupon and offers
                  </span>
                )}
                {!!appliedCoupon && (
                  <span className="ml-2 coupon-subtitle">
                    You saved additional ₹
                    {toDecimal(getCouponTotal(appliedCoupon, cartList))}
                  </span>
                )}
              </div>
            </div>

            {!!featuredCoupons.length && !appliedCoupon && (
              <a
                className="coupon-offer d-flex align-items-center"
                type="button"
              >
                {`${featuredCoupons.length} Offers`}
                <RightAngle size={14} />
              </a>
            )}
            {!!appliedCoupon && (
              <ALink
                key={appliedCoupon.id}
                href="#"
                className="mt-1"
                title="Remove coupon"
                onClick={() => removeCoupon()}
              >
                <Close color="grey" size={18} />
              </ALink>
            )}
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
                  <div className="mt-8">
                    {featuredCoupons.map((c) => {
                      let className = "btn btn-md  btn-rounded btn-link m l-2";
                      if (!c.allowed) {
                        className = `${className} btn-disabled`;
                      }

                      return (
                        <div key={c.id} className="featured-coupon">
                          <div className="d-flex justify-content-between ">
                            <div className="featured-coupon-text-content">
                              <strong>{c.code}</strong>
                              <div
                                className={`coupon-tagline ${
                                  !c.allowed && "text-secondary"
                                }`}
                              >
                                {c.message}
                              </div>
                            </div>
                            <button
                              onClick={() => applyCouponCode(c.code)}
                              className={className}
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
  applyCoupon: cartActions.applyCoupon,
  removeCoupon: cartActions.removeCoupon,
})(Coupon);
