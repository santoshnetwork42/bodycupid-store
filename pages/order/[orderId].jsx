import React, { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { API } from "aws-amplify";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";
import AlertPopup from "~/components/features/product/common/alert-popup";
import { getOrder, validateTransaction } from "~/graphql/api";
import States from "~/lib/states.json";
import { toDecimal, getOrderTotal, formateDate } from "~/utils";
import PaymentLoader from "~/components/common/partials/payment-loader";
import fetchData from "~/utils/fetchData";
import { STORE_ID } from "~/config";
import Tag from "~/components/common/tag";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { errorHandler } from "~/utils/errorHandler";

function Order({ order: orderItem, paymentId, orderId, store }) {
  const [order, setOrder] = useState(orderItem);
  const { name } = store;
  const [timer, setTimer] = useState(null);
  const allStatus = ["CANCELLED", "DISPATCHED", "COURIER_RETURN", "DELIVERED"];

  const router = useRouter();

  useEffect(() => {
    if (!orderItem) {
      router.push("/404");
    }
  }, []);

  const fetchOrder = useCallback(async () => {
    try {
      const response = await API.graphql({
        query: getOrder,
        variables: { id: orderId },
      });
      if (!!response.data.getOrder) {
        setOrder(response.data.getOrder);
      }
    } catch (error) {
      errorHandler(error);
    }
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
  }, [orderId, paymentId, fetchOrder]);

  const isPaymentProcessing =
    order?.status === "PENDING" &&
    order?.paymentType === "PREPAID" &&
    paymentId;

  useEffect(() => {
    if (isPaymentProcessing) {
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

  const getStatusType = (status) => {
    switch (status) {
      case "DISPATCHED":
        return "info";
      case "CANCELLED":
      case "COURIER_RETURN":
        return "cancel";
      case "DELIVERED":
        return "success";
    }
  };

  return (
    <main className="main order">
      <Head>
        <title>{name} | Order</title>
      </Head>

      <h1 className="d-none">{name}- Order</h1>

      <div className="order-page-content page-content pt-7 pb-10 mb-10 bg-white">
        <div className="step-by pr-4 pl-4 d-sm-none">
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
              <span>Total:</span>
              <strong>₹{toDecimal(order?.totalAmount)}</strong>
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
                    <td className="product-name" colSpan={2}>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                          <ALink
                            className="order-image"
                            href={"/product/" + item.slug}
                          >
                            <img
                              src={getPublicImageURL(
                                item.product.images?.items[0]?.imageKey
                              )}
                              alt={item.product?.images.items[0]?.alt}
                              width="80"
                              height="88"
                            />
                          </ALink>
                          <div>
                            {`${item.product.title} `}
                            <span>
                              <i className="fas fa-times"></i>
                              {` ${item.quantity || item.cancelledQuantity}`}
                            </span>
                            {item.cancelledQuantity > 0 &&
                              item.status === "CREATED" && (
                                <Tag type="cancel">
                                  CANCELLED <i className="fas fa-times"></i>
                                  &nbsp;
                                  {item.cancelledQuantity}
                                </Tag>
                              )}
                            {allStatus.includes(item.status) && (
                              <Tag type={getStatusType(item.status)}>
                                {item.status}
                              </Tag>
                            )}
                            {item.variant && (
                              <p className="mb-0">
                                <strong>{item.variant.title}</strong>
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="product-price">
                          ₹{toDecimal(item.quantity * item.price)}
                        </div>
                      </div>
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
          <div className="d-flex flex-wrap address-info pb-8 mb-6 pt-10">
            <div className="mr-8">
              <h2 className="title title-simple text-left">Billing Address</h2>
              <div className="">
                <p className="address-detail">
                  {order?.billingAddress?.name}
                  <br />
                  {order?.billingAddress?.address}
                  {!!order?.billingAddress?.location && (
                    <>
                      <br />
                      {order?.billingAddress?.location}
                    </>
                  )}
                  <br />
                  {(order?.billingAddress?.city + ", ", state + ", " + country)}
                  <br />
                  {order?.billingAddress?.pinCode}
                </p>
                <p className="email">
                  {order?.billingAddress?.email}
                  <br />
                  {order?.billingAddress?.phone}
                </p>
              </div>
            </div>
            <div>
              <h2 className="title title-simple text-left">Shipping Address</h2>
              <div className="">
                <p className="address-detail">
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
                    state + ", " + country)
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
            </div>
          </div>

          <ALink
            href="/collections/all"
            className="btn btn-icon-left btn-dark btn-back btn-rounded btn-md mb-4 mr-3"
          >
            Continue Shopping
          </ALink>
          <ALink
            href={{
              pathname: "/pages/account",
              query: {
                activeTabIndex: 1,
              },
            }}
            as="/pages/account"
            className="btn btn-icon-left btn-dark btn-back btn-rounded btn-md mb-4 "
          >
            Your Orders
          </ALink>

          <PaymentLoader loading={isPaymentProcessing} />
        </div>
      </div>
    </main>
  );
}

Order.getInitialProps = async (context) => {
  const { query } = context;
  const { orderId, paymentId = null } = query;
  try {
    const { getOrder: response } = await fetchData(getOrder, {
      id: orderId,
    });

    if (response?.storeId === STORE_ID) {
      return {
        order: response,
        paymentId,
        orderId: orderId,
      };
    }
  } catch (error) {
    console.log(error);
  }
  return {
    order: null,
    paymentId,
    orderId: orderId,
  };
};

function mapStateToProps(state) {
  return {
    store: state.system.store,
  };
}

export default connect(mapStateToProps)(Order);
