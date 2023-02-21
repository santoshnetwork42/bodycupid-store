import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { useRouter } from "next/router";
import { API } from "aws-amplify";

import ALink from "~/components/features/custom-link";
import { getOrder } from "~/graphql/api";

import { toDecimal, getOrderTotal, formateDate } from "~/utils";

function Order(props) {
  const { user } = props;
  const [order, setOrder] = useState(null);

  const router = useRouter();
  const { query } = router;
  const { orderId } = query;

  useEffect(() => {
    (async function () {
      const response = await API.graphql({
        query: getOrder,
        variables: { id: orderId },
        authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY",
      });
      console.log(response.data.getOrder);
      setOrder(response.data.getOrder);
    })();
  }, [orderId, user]);

  return (
    <main className="main order">
      <Helmet>
        <title>Wow React eCommerce Template | Order</title>
      </Helmet>

      <h1 className="d-none">Wow React eCommerce Template - Order</h1>

      <div className="page-content pt-7 pb-10 mb-10">
        <div className="step-by pr-4 pl-4">
          <h3 className="title title-simple title-step">
            <ALink href="/pages/cart">1. Shopping Cart</ALink>
          </h3>
          <h3 className="title title-simple title-step">
            <ALink href="/pages/checkout">2. Checkout</ALink>
          </h3>
          <h3 className="title title-simple title-step active">
            <ALink href="#">3. Order Complete</ALink>
          </h3>
        </div>
        <div className="container mt-8">
          <div className="order-message mr-auto ml-auto">
            <div className="icon-box d-inline-flex align-items-center">
              <div className="icon-box-icon mb-0">
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 50 50"
                  enableBackground="new 0 0 50 50"
                  xmlSpace="preserve"
                >
                  <g>
                    <path
                      fill="none"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="bevel"
                      strokeMiterlimit="10"
                      d="
                                        M33.3,3.9c-2.7-1.1-5.6-1.8-8.7-1.8c-12.3,0-22.4,10-22.4,22.4c0,12.3,10,22.4,22.4,22.4c12.3,0,22.4-10,22.4-22.4
                                        c0-0.7,0-1.4-0.1-2.1"
                    ></path>
                    <polyline
                      fill="none"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="bevel"
                      strokeMiterlimit="10"
                      points="
                                        48,6.9 24.4,29.8 17.2,22.3 	"
                    ></polyline>
                  </g>
                </svg>
              </div>
              <div className="icon-box-content text-left">
                <h5 className="icon-box-title font-weight-bold lh-1 mb-1">
                  Thank You!
                </h5>
                <p className="lh-1 ls-m">Your order has been received</p>
              </div>
            </div>
          </div>

          <div className="order-results">
            <div className="overview-item">
              <span>Order number:</span>
              <strong>{order?.code || order?.id }</strong>
            </div>
            <div className="overview-item">
              <span>Status:</span>
              <strong>{order?.status}</strong>
            </div>
            <div className="overview-item">
              <span>Date:</span>
              <strong>{formateDate(order?.createdAt)}</strong>
            </div>
            <div className="overview-item">
              <span>Email:</span>
              <strong>{order?.shippingAddress?.email}</strong>
            </div>
            <div className="overview-item">
              <span>Total:</span>
              <strong>₹{toDecimal(order?.payments?.items[0].amount)}</strong>
            </div>
            <div className="overview-item">
              <span>Payment method:</span>
              <strong>
                {order?.payments?.items[0].method === "COD"
                  ? "Cash on delivery"
                  : "Online"}
              </strong>
            </div>
          </div>

          <h2 className="title title-simple text-left pt-4 font-weight-bold text-uppercase">
            Order Details
          </h2>
          <div className="order-details">
            <table className="order-details-table">
              <thead>
                <tr className="summary-subtotal">
                  <td>
                    <h3 className="summary-subtitle">Product</h3>
                  </td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {order?.products?.items?.map((item) => (
                  <tr key={"order-" + item.id}>
                    <td className="product-name">
                      {item.product.title}{" "}
                      <span>
                        {" "}
                        <i className="fas fa-times"></i> {item.quantity}
                      </span>
                    </td>
                    <td className="product-price">
                      ₹{toDecimal(item.quantity * item.price)}
                    </td>
                  </tr>
                ))}
                <tr className="summary-subtotal">
                  <td>
                    <h4 className="summary-subtitle">Subtotal:</h4>
                  </td>
                  <td className="summary-subtotal-price">
                    ₹{toDecimal(getOrderTotal(order?.products?.items))}
                  </td>
                </tr>
                <tr className="summary-subtotal">
                  <td>
                    <h4 className="summary-subtitle">Shipping:</h4>
                  </td>
                  <td className="summary-subtotal-price">
                    {order?.totalShippingCharges
                      ? `₹${toDecimal(order?.totalShippingCharges)}`
                      : "Free shipping"}
                  </td>
                </tr>
                {!!order?.totalDiscount && (
                  <tr className="summary-subtotal">
                    <td>
                      <h4 className="summary-subtitle">Discount:</h4>
                    </td>
                    <td className="summary-subtotal-price">
                      ₹{toDecimal(order?.totalDiscount)}
                    </td>
                  </tr>
                )}
                <tr className="summary-subtotal">
                  <td>
                    <h4 className="summary-subtitle">Payment method:</h4>
                  </td>
                  <td className="summary-subtotal-price">
                    {order?.payments?.items[0].method === "COD"
                      ? "Cash on delivery"
                      : "Online"}
                  </td>
                </tr>
                <tr className="summary-subtotal">
                  <td>
                    <h4 className="summary-subtitle">Total:</h4>
                  </td>
                  <td>
                    <p className="summary-total-price">
                      ₹{toDecimal(order?.payments?.items[0].amount)}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2 className="title title-simple text-left pt-10 mb-2">
            Shipping Address
          </h2>
          <div className="address-info pb-8 mb-6">
            <p className="address-detail pb-2">
              {order?.shippingAddress?.name}
              <br />
              {order?.shippingAddress?.address}
              {!!order?.shippingAddress?.location && (
                <>
                  <br />
                  {order?.shippingAddress?.location}
                </>
              )}
              <br />
              {
                (order?.shippingAddress?.city + ", ",
                order?.shippingAddress?.state +
                  ", " +
                  order?.shippingAddress?.country)
              }
              <br />
              {order?.shippingAddress?.pinCode}
            </p>
            <p className="email">
              {order?.shippingAddress?.email}
              <br />
              {order?.shippingAddress?.phone}
            </p>
          </div>

          <ALink
            href="/shop"
            className="btn btn-icon-left btn-dark btn-back btn-rounded btn-md mb-4"
          >
            <i className="d-icon-arrow-left"></i> Back to List
          </ALink>
        </div>
      </div>
    </main>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
  };
}

export default connect(mapStateToProps)(Order);
