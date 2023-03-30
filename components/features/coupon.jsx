import { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { API } from "aws-amplify";

import ALink from "~/components/features/custom-link";

import { systemActions } from "~/store/system";
import { getCouponMessage } from "~/utils/coupons";
import Loader from "../common/partials/loader";
import Modal from "~/components/common/modal";
import { applyCoupon as applyCouponMutation } from "~/graphql/api";
import { cartActions } from "~/store/cart";
import { getCouponTotal, toDecimal } from "~/utils";

function Coupon(props) {
  const {
    user,
    cartList,
    applyCoupon,
    removeCoupon,
    appliedCoupon,
    layout = "cart",
    featured,
    getFeaturedCoupons,
  } = props;
  const [coupon, setCoupon] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFeaturedCoupons();
  }, []);

  const applyCouponCode = useCallback(
    async (couponCode = coupon) => {
      setLoading(true);
      const {
        data: { applyCoupon: response },
      } = await API.graphql({
        query: applyCouponMutation,
        variables: { code: couponCode },
        authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY",
      });
      if (response) {
        const discount = getCouponTotal(response, cartList);
        if (discount) {
          setCoupon("");
          applyCoupon(response);
          setOpen(false);
          setError("");
        } else {
          setError("Coupon cannot be applied");
        }
        setLoading(false);
      } else {
        setError("Invalid coupon");
        setLoading(false);
      }
    },
    [coupon, user]
  );

  return (
    <>
      {layout === "cart" && (
        <div
          className="cart-coupon-box mb-4"
          onClick={() => !appliedCoupon && setOpen(true)}
        >
          <div className="cart-coupon-container d-flex">
            <div>
              <h4 className="title coupon-title text-uppercase ls-m">
                {!!appliedCoupon
                  ? `"${appliedCoupon.code}" applied`
                  : "Coupons and offers"}
              </h4>
              {!appliedCoupon && (
                <span className="coupon-subtitle">
                  Save more with coupon and offers
                </span>
              )}
              {!!appliedCoupon && (
                <span className="coupon-subtitle">
                  You saved additional ₹
                  {toDecimal(getCouponTotal(appliedCoupon, cartList))}
                </span>
              )}
            </div>

            {!!featured?.length && !appliedCoupon && (
              <a
                className="coupon-offer"
                type="button"
              >{`${featured?.length} Offers >`}</a>
            )}
            {!!appliedCoupon && (
              <ALink
                key={appliedCoupon.id}
                href="#"
                className="product-remove"
                title="Remove coupon"
                onClick={() => removeCoupon()}
              >
                <i className="fas fa-times"></i>
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
          <div className="page-content mt-6 pb-2 mb-2">
            <div className="container">
              <div className="cart-coupon-modal m-8">
                <h5 className="title coupon-title text-uppercase ls-m">
                  Coupons and offers
                </h5>
                <div className="d-flex">
                  <input
                    type="text"
                    name="coupon_code"
                    className="input-text form-control text-grey ls-m mb-4"
                    id="coupon_code"
                    placeholder="Enter coupon code here..."
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button
                    onClick={() => applyCouponCode()}
                    className="btn btn-md btn-dark btn-rounded btn-link m l-2"
                  >
                    Apply
                  </button>
                </div>
                {!!featured?.length && (
                  <div className="mt-2">
                    <h6>Available coupons</h6>
                    {featured.map((c) => {
                      let className =
                        "btn btn-md btn-dark btn-rounded btn-link m l-2";
                      const discount = getCouponTotal(c, cartList);
                      if (!discount) {
                        className = `${className} btn-disabled`;
                      }
                      return (
                        <div key={c.id} className="featured-coupon">
                          <div className="d-flex justify-content-between ">
                            <div className="featured-coupon-text-content">
                              <strong>{c.code}</strong>
                              {!!discount && (
                                <div className="coupon-tagline">
                                  You will save ₹{toDecimal(discount)} with this
                                  coupon
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => applyCouponCode(c.code)}
                              className={className}
                            >
                              Apply
                            </button>
                          </div>
                          <p className="m-0">{getCouponMessage(c)}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
                <span>{error}</span>
              </div>
            </div>
          </div>
        </main>
      </Modal>
      <Loader loading={loading} />
    </>
  );
}

function mapStateToProps(state) {
  return {
    cartList: state.cart.data ? state.cart.data : [],
    user: state.user.data,
    appliedCoupon: state.cart.coupon,
    featured: state.system.featuredCoupon,
  };
}

export default connect(mapStateToProps, {
  applyCoupon: cartActions.applyCoupon,
  removeCoupon: cartActions.removeCoupon,
  getFeaturedCoupons: systemActions.getFeaturedCoupon,
})(Coupon);
