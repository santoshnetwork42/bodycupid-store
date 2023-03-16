import { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import { API, graphqlOperation } from "aws-amplify";
import Collapse from "react-bootstrap/Collapse";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import ALink from "~/components/features/custom-link";
import {
  createOrder,
  createOrderProduct,
  createTransaction,
  createPayment,
  getHomePageProducts,
} from "~/graphql/api";
import { createUserAddress } from "~/graphql/mutations";
import {
  toDecimal,
  getTotalPrice,
  getShippingPrice,
  getFinalPrice,
  getCouponTotal,
} from "~/utils";
import { cartActions } from "~/store/cart";
import { modalActions } from "~/store/modal";
import Addresses from "~/components/common/addresses";
import Coupons from "~/components/features/coupon";
import loadScript from "~/utils/loadScript";
import { STORE_ID, RAZORPAY_SCRIPT, RAZORPAY_KEY } from "~/config";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import AlertPopup from "~/components/features/product/common/alert-popup";
import Loader from "~/components/common/partials/loader";
import Passwordless from "~/components/common/partials/passwordless";
import { validateAddress, getProperAddress } from "~/utils/address";
import RelatedProducts from "~/components/partials/product/related-products";

function Checkout(props) {
  const { cartList, user, emptyCart, appliedCoupon, removeCoupon, store } =
    props;

  const router = useRouter();
  const [isFirst, setFirst] = useState(true);
  const [shippingAddress, setAddress] = useState(null);
  const [loading, setLoading] = useState(null);
  const [formErorr, setFormErorr] = useState(null);
  const [related, setRelated] = useState(null);

  useEffect(() => {
    API.graphql(
      graphqlOperation(getHomePageProducts, {
        filter: { storeId: { eq: STORE_ID } },
        limit: 8,
      })
    ).then(
      ({
        data: {
          searchProducts: { items },
        },
      }) => {
        setRelated(items);
      }
    );
  }, []);

  const handlePayment = useCallback(
    async ({ orderId, paymentId, address }) => {
      const authMode = user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY";

      const [
        rzpEnabled,
        {
          data: { createTransaction: transaction },
        },
      ] = await Promise.all([
        loadScript(RAZORPAY_SCRIPT),
        API.graphql({
          query: createTransaction,
          variables: { orderId },
          authMode,
        }),
      ]);

      setLoading(false);

      if (rzpEnabled && transaction) {
        const options = {
          key: RAZORPAY_KEY,
          amount: transaction.amount,
          currency: "INR",
          name: store.name,
          image: getPublicImageURL(store.imageUrl),
          order_id: transaction.orderId,
          handler: async function ({ razorpay_payment_id }) {
            await router.push(
              `/order/${orderId}?paymentId=${razorpay_payment_id}`
            );
            await emptyCart();
          },
          prefill: {
            name: address.name,
            email: address.email,
            contact: address.phone,
          },
          notes: {
            storeId: store.id,
            orderId,
            paymentId,
          },
          theme: {
            color: "#3399cc",
          },
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
      } else {
        toast(
          <AlertPopup
            message="Something went wrong. Try Again!"
            status="error"
          />
        );
      }
    },
    [store, user]
  );

  const addUserAddress = useCallback(async () => {
    const tempAddress = getProperAddress(shippingAddress);
    const { id: ignoreId, ...restAddress } = tempAddress;
    if (user && !ignoreId) {
      await API.graphql({
        query: createUserAddress,
        variables: { input: { ...restAddress, userID: user.id } },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
    }

    return Promise.resolve(null);
  }, [shippingAddress, user]);

  const placeOrder = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      const paymentType = isFirst ? "PREPAID" : "COD";
      const formErrors = await validateAddress(shippingAddress, paymentType);
      setFormErorr(formErrors);
      if (!formErrors) {
        try {
          const tempAddress = getProperAddress(shippingAddress);
          const { id: ignoreId, ...restAddress } = tempAddress;
          const authMode = user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY";
          const payload = {
            storeId: STORE_ID,
            userId: user?.id,
            status: isFirst ? "PENDING" : "CONFIRMED",
            totalAmount: getFinalPrice(cartList, appliedCoupon),
            totalDiscount: getCouponTotal(appliedCoupon, cartList),
            totalShippingCharges: getShippingPrice(cartList),
            orderDate: new Date().toISOString(),
            sla: new Date().toISOString(),
            paymentType: isFirst ? "PREPAID" : "COD",
            shippingAddress: restAddress,
            billingAddress: restAddress,
            couponCodeId: appliedCoupon?.id,
          };

          const {
            data: {
              createOrder: { id: orderId },
            },
          } = await API.graphql({
            query: createOrder,
            variables: { input: payload },
            authMode,
          });

          const promise = [
            API.graphql({
              query: createPayment,
              variables: {
                input: {
                  userId: user?.id,
                  storeId: STORE_ID,
                  orderId,
                  method: isFirst ? "ONLINE" : "COD",
                  amount: getFinalPrice(cartList, appliedCoupon),
                },
              },
              authMode,
            }),
            ...cartList.map((p) =>
              API.graphql({
                query: createOrderProduct,
                variables: {
                  input: {
                    orderId,
                    productId: p.id,
                    variantId: p.variantId,
                    quantity: p.qty,
                    price: p.price,
                    title: p.title,
                    totalPrice: parseInt(p.qty) * parseInt(p.price),
                    sku: p.sku,
                  },
                },
                authMode,
              })
            ),
          ];

          promise.push(addUserAddress());

          const [
            {
              data: { createPayment: payment },
            },
          ] = await Promise.all(promise);

          if (isFirst) {
            handlePayment({
              orderId,
              paymentId: payment.id,
              address: restAddress,
            });
          } else {
            await router.push(`/order/${orderId}`);
            await emptyCart();
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
      setLoading(false);
      return false;
    },
    [
      user,
      isFirst,
      appliedCoupon,
      shippingAddress,
      cartList,
      createUserAddress,
      formErorr,
      handlePayment,
      setFormErorr,
    ]
  );

  const codDisabled = useMemo(
    () => appliedCoupon?.couponType === "ONLINE",
    [appliedCoupon]
  );

  return (
    <main className="main checkout">
      <Head>
        <title>Wow life science | Checkout</title>
      </Head>

      <h1 className="d-none">Wow life science - Checkout</h1>

      {!user && <Passwordless forceOpen redirect={false} />}

      <div
        className={`page-content pt-7 pb-10 ${
          cartList.length > 0 ? "mb-10" : "mb-2"
        }`}
      >
        <div className="step-by pr-4 pl-4">
          <h3 className="title title-simple title-step">
            <ALink href="/pages/cart">1. Shopping Cart</ALink>
          </h3>
          <h3 className="title title-simple title-step active">
            <ALink href="#">2. Checkout</ALink>
          </h3>
          <h3 className="title title-simple title-step">3. Order Complete</h3>
        </div>
        <div className="container mt-7">
          {cartList.length > 0 ? (
            <>
              {!appliedCoupon && <Coupons layout="checkout" />}
              {/* <form className="form" onSubmit={placeOrder}> */}
              <div className="row">
                <div className="col-lg-7 mb-6 mb-lg-0 pr-lg-4">
                  <h3 className="title title-simple text-left text-uppercase">
                    Shipping Address
                  </h3>
                  <Addresses onAddressChange={setAddress} />
                </div>

                <aside className="col-lg-5 sticky-sidebar-wrapper">
                  <div
                    className="sticky-sidebar mt-1"
                    data-sticky-options="{'bottom': 50}"
                  >
                    <div className="summary pt-5">
                      <h3 className="title title-simple text-left text-uppercase">
                        Your Order
                      </h3>
                      <table className="order-table">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartList.map((item, index) => (
                            <tr key={"checkout-" + item.title + "-" + index}>
                              <td className="product-name">
                                {item.title}{" "}
                                <span className="product-quantity">
                                  ×&nbsp;{item.qty}
                                </span>
                              </td>
                              <td className="product-total text-body">
                                ₹{toDecimal(item.price * item.qty)}
                              </td>
                            </tr>
                          ))}

                          <tr className="summary-subtotal">
                            <td>
                              <h4 className="summary-subtitle">Subtotal</h4>
                            </td>
                            <td className="summary-subtotal-price pb-0 pt-0">
                              ₹{toDecimal(getTotalPrice(cartList))}
                            </td>
                          </tr>
                          <tr className="summary-subtotal">
                            <td>
                              <h4 className="summary-subtitle">Shipping</h4>
                            </td>
                            <td className="summary-subtotal-price pb-0 pt-0">
                              {getShippingPrice(cartList)
                                ? `₹${toDecimal(getShippingPrice(cartList))}`
                                : "Free"}
                            </td>
                          </tr>
                          {!!appliedCoupon && (
                            <>
                              <tr>
                                <td>
                                  <h4 className="summary-subtitle">Coupons</h4>
                                  <p>
                                    <span className="d-flex">
                                      <span className="mr-1">
                                        {appliedCoupon.code}
                                      </span>
                                      <ALink
                                        key={appliedCoupon.id}
                                        href="#"
                                        className="product-remove"
                                        title="Remove coupon"
                                        onClick={() => removeCoupon()}
                                      >
                                        <i className="fas fa-times"></i>
                                      </ALink>
                                    </span>
                                  </p>
                                </td>
                                <td>
                                  <p className="summary-subtotal-price">
                                    {`₹${toDecimal(
                                      getCouponTotal(appliedCoupon, cartList)
                                    )}`}
                                  </p>
                                </td>
                              </tr>
                              <tr className="summary-subtotal-saving">
                                <td colSpan={2}>
                                  <div className="summary-saving-lable-container mt-0 mb-2">
                                    <p className="saving-lable">
                                      You are saving{" "}
                                      <span>
                                        {`₹${toDecimal(
                                          getCouponTotal(
                                            appliedCoupon,
                                            cartList
                                          )
                                        )}`}
                                      </span>{" "}
                                      on this order
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </>
                          )}
                          <tr className="summary-total">
                            <td className="pb-0">
                              <h4 className="summary-subtitle">Total</h4>
                            </td>
                            <td className=" pt-0 pb-0">
                              <p className="summary-total-price ls-s text-primary">
                                ₹
                                {toDecimal(
                                  getFinalPrice(cartList, appliedCoupon)
                                )}
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="payment accordion radio-type">
                        <h4 className="summary-subtitle ls-m pb-3">
                          Payment Methods
                        </h4>

                        <div className="checkbox-group">
                          <div className="card-header">
                            <ALink
                              href="#"
                              className={`text-body text-normal ls-m ${
                                isFirst ? "collapse" : ""
                              }`}
                              onClick={() => {
                                !isFirst && setFirst(!isFirst);
                              }}
                            >
                              Pay Online
                            </ALink>
                          </div>

                          <Collapse in={isFirst}>
                            <div className="card-wrapper">
                              <div className="card-body ls-m overflow-hidden">
                                Use credit/debit card, net-banking, UPI, wallets
                                to complete the payment.
                              </div>
                            </div>
                          </Collapse>

                          <div className="card-header">
                            <ALink
                              href="#"
                              className={`text-body text-normal ls-m ${
                                !isFirst ? "collapse" : ""
                              }`}
                              onClick={() => {
                                !codDisabled && isFirst && setFirst(!isFirst);
                              }}
                            >
                              Cash on delivery
                            </ALink>
                          </div>

                          <Collapse in={!isFirst}>
                            <div className="card-wrapper">
                              <div className="card-body ls-m overflow-hidden">
                                Pay in cash or pay in person at the time of
                                delivery with GPay/PayTM/PhonePe.
                              </div>
                            </div>
                          </Collapse>
                        </div>
                      </div>
                      {/* <div className="form-checkbox mt-4 mb-5">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          id="terms-condition"
                          name="terms-condition"
                          required
                        />
                        <label
                          className="form-control-label"
                          htmlFor="terms-condition"
                        >
                          I have read and agree to the website{" "}
                          <ALink href="#">terms and conditions </ALink>*
                        </label>
                      </div> */}
                      {!!formErorr && (
                        <div className="overflow-hidden mb-4 mt-4">
                          <div className="alert alert-danger alert-summary alert-light alert-message alert-inline">
                            <ul className="m-0">
                              {Object.values(formErorr).map((val) => (
                                <li key={val}>{val}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                      <button
                        onClick={placeOrder}
                        className="btn btn-dark btn-rounded btn-order d-flex justify-content-center align-items-center"
                      >
                        Place Order
                        {loading && <div className="spin-loader ml-2" />}
                      </button>
                    </div>
                  </div>
                </aside>
              </div>
              {/* </form> */}
            </>
          ) : (
            <div className="empty-cart text-center">
              <p>Your cart is currently empty.</p>
              <i className="cart-empty d-icon-bag"></i>
              <p className="return-to-shop mb-0">
                <ALink
                  className="button wc-backward btn btn-dark btn-md"
                  href="/shop"
                >
                  Return to shop
                </ALink>
              </p>
            </div>
          )}
          <RelatedProducts
            products={related}
            heading="Other popular products"
          />
        </div>
      </div>
    </main>
  );
}

function mapStateToProps(state) {
  return {
    cartList: state.cart.data ? state.cart.data : [],
    user: state.user.data,
    appliedCoupon: state.cart.coupon,
    store: state.system.store,
  };
}

export default connect(mapStateToProps, {
  emptyCart: cartActions.emptyCart,
  openLogin: modalActions.openPasswordlessModal,
  removeCoupon: cartActions.removeCoupon,
})(Checkout);
