import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { API } from "aws-amplify";
import { toast } from "react-toastify";

import ALink from "~/components/features/custom-link";
import AlertPopup from "~/components/features/product/common/alert-popup";
import { getOrder, validateTransaction } from "~/graphql/api";
import States from "~/lib/states.json";
import { toDecimal, getOrderTotal, formateDate } from "~/utils";

function Order() {
  const [order, setOrder] = useState(null);
  const [timer, setTimer] = useState(null);

  const router = useRouter();
  const { query } = router;
  const { orderId, paymentId } = query;

  const fetchOrder = useCallback(async () => {
    const response = await API.graphql({
      query: getOrder,
      variables: { id: orderId },
    });
    setOrder(response.data.getOrder);
  }, [orderId]);

  const fetchPaymentStatus = useCallback(async () => {
    if (orderId && paymentId) {
      const {
        data: {
          validateTransaction: { success },
        },
      } = await API.graphql({
        query: validateTransaction,
        variables: { orderId, razorpayPaymentId: paymentId },
      });

      if (success) {
        fetchOrder();
        toast(
          <AlertPopup
            message="Thank you! Your order has been confirmed."
            status="success"
          />
        );
      }
    }
  }, [orderId, paymentId]);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  useEffect(() => {
    if (
      order?.status === "PENDING" &&
      order?.paymentType === "PREPAID" &&
      paymentId
    ) {
      toast(
        <AlertPopup
          message="Hold On! We're updating your payment status..."
          status="info"
        />
      );
      if (timer) clearTimeout(timer);
      const timerId = setTimeout(() => {
        fetchPaymentStatus();
        setTimer(null);
      }, [2000]);
      setTimer(timerId);
    }
  }, [order, paymentId]);

  const { state, country } = useMemo(() => {
    if (order?.shippingAddress?.state) {
      return {
        state: States.find((s) => s.value === order?.shippingAddress?.state)
          ?.name,
        country: "India",
      };
    }
    return {};
  }, [order?.shippingAddress]);

  return (
    <main className="main order">
      <Head>
        <title>Wow life science | Order</title>
      </Head>

      <h1 className="d-none">Wow life science - Order</h1>

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
              <strong>#{order?.code || order?.id}</strong>
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
              <strong>₹{toDecimal(order?.totalAmount)}</strong>
            </div>
            <div className="overview-item">
              <span>Payment method:</span>
              <strong>
                {order?.paymentType === "COD" ? "Cash on delivery" : "Online"}
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
                      {item.variant && (
                        <p className="mb-0">
                          <strong>{item.variant.title}</strong>
                        </p>
                      )}
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
                    {order?.paymentType === "COD"
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
                      ₹{toDecimal(order?.totalAmount)}
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
              {(order?.shippingAddress?.city + ", ", state + ", " + country)}
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
            href="/collections/all"
            className="btn btn-icon-left btn-dark btn-back btn-rounded btn-md mb-4"
          >
            <i className="d-icon-arrow-left"></i> Back to List
          </ALink>
        </div>
      </div>
    </main>
  );
}

export default React.memo(Order);
