import { useState, useCallback, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";

import {
  applyCoupon as applyCouponMutation,
  getFeaturedCoupon,
} from "~/graphql/api";
import { cartActions } from "~/store/cart";
import { getCouponTotal, toDecimal } from "~/utils";
import ALink from "~/components/features/custom-link";
import AlertPopup from "~/components/features/product/common/alert-popup";
import { toast } from "react-toastify";
import { STORE_ID } from "~/config";
import Modal from "~/components/common/modal";

function Coupon(props) {
  const {
    user,
    cartList,
    applyCoupon,
    removeCoupon,
    appliedCoupon,
    layout = "cart",
    product,
    getCouponCode = () => {},
  } = props;
  const [coupon, setCoupon] = useState("");
  const [featured, setFeatured] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      const {
        data: {
          searchCouponCodes: { items },
        },
      } = await API.graphql(
        graphqlOperation(getFeaturedCoupon, {
          filter: { isFeatured: { eq: true }, storeId: { eq: STORE_ID } },
        })
      );
      setFeatured(items);
    })();
  }, []);

  const { allDiscounts, maxDiscountCoupon } = useMemo(() => {
    let cart = [...cartList];
    if (product) {
      cart = [product];
    }
    let maxDiscountCoupon = {};
    const allDiscounts = featured.reduce((acc, cur) => {
      acc = {
        ...acc,
        [cur.id]: getCouponTotal(cur, cart),
      };
      maxDiscountCoupon =
        getCouponTotal(maxDiscountCoupon, cart) > getCouponTotal(cur, cart)
          ? maxDiscountCoupon
          : cur;
      return acc;
    }, []);
    let id = Object.keys(allDiscounts).reduce(
      (a, b) => (allDiscounts[a] > allDiscounts[b] ? a : b),
      []
    );
    getCouponCode(maxDiscountCoupon?.code);
    return {
      allDiscounts,
      maxDiscountCoupon,
    };
  }, [featured, product, cartList]);

  const applyCouponCode = useCallback(
    async (couponCode = coupon) => {
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
      } else {
        setError("Invalid coupon");
      }
    },
    [coupon, user]
  );

  const onCopy = (copyText) => {
    if (copyText && navigator?.clipboard) {
      navigator.clipboard.writeText(copyText);
      toast(
        <AlertPopup message={"Coupon code copied: " + copyText} status="info" />
      );
    }
  };

  return (
    <>
      {layout === "cart" && (
        <div className="cart-coupon-box mb-4">
          <div className="cart-coupon-container d-flex">
            <div>
              <h4 className="title coupon-title text-uppercase ls-m">
                Use Coupons
              </h4>
              {!appliedCoupon && (
                <span className="coupon-subtitle">
                  Save more with coupon and offers
                </span>
              )}
              {!!appliedCoupon && (
                <span className="coupon-subtitle">
                  {appliedCoupon.code} applied
                </span>
              )}
            </div>

            {!!featured?.length && !appliedCoupon && (
              <a
                className="coupon-offer"
                type="button"
                onClick={() => setOpen(true)}
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
          {!!appliedCoupon && (
            <div className="summary-saving-lable-container">
              <p className="saving-lable">
                You are saving{" "}
                <span>{`₹${toDecimal(
                  getCouponTotal(appliedCoupon, cartList)
                )}`}</span>{" "}
                on this order
              </p>
            </div>
          )}
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

      {layout === "product" && maxDiscountCoupon && (
        <div className="product-best-price-container">
          <div className="product-top-content">
            <div className="d-flex align-items-center">
              <i class="fa fa-percent" aria-hidden="true"></i>
              <p>
                Best price :{" "}
                <span className="font-weight-semi-bold">
                  {toDecimal(product?.price - maxDiscountCoupon?.discount)}
                </span>{" "}
              </p>
            </div>
            <p>T&C</p>
          </div>
          <div className="d-flex">
            Use coupon{" "}
            <p id="coupon-code" className="font-weight-semi-bold ml-1">
              {maxDiscountCoupon?.code}
            </p>{" "}
            <span
              className="copy-code  cursor-pointer ml-1"
              onClick={() => onCopy(maxDiscountCoupon?.code)}
            >
              Copy code
            </span>
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
        overlayClassName="auth-modal-overlay"
        className="auth-popup bg-img"
      >
        <main className="main">
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
                    Apply Coupon
                  </button>
                </div>
                {!!featured.length && (
                  <div className="mt-2">
                    <h6>Available coupons</h6>
                    {featured.map((c) => {
                      let className =
                        "btn btn-md btn-dark btn-rounded btn-link m l-2";
                      const discount = allDiscounts[c.id];
                      if (!discount) {
                        className = `${className} btn-disabled`;
                      }
                      return (
                        <div key={c.id} className="featured-coupon">
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
