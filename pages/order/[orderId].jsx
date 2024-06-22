import { API, Logger } from "aws-amplify";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import PaymentLoader from "~/components/common/partials/payment-loader";
import Tag from "~/components/common/tag";
import ALink from "~/components/features/custom-link";
import Checkmark, { LoyaltyTag } from "~/components/icons";
import NextImage from "~/components/image";
import { STORE_ID } from "~/config";
import { getOrder, validateTransaction } from "~/graphql/api";
import States from "~/lib/states.json";
import { userActions } from "~/store/user";
import { formateDate, getOrderTotal, toDecimal } from "~/utils";
import { errorHandler } from "~/utils/errorHandler";
import fetchData from "~/utils/fetchData";
import { alertToaster } from "~/utils/popupHelper";

const logger = new Logger("Orders");

function Order({
  order: orderItem,
  paymentId,
  orderId,
  store,
  user,
  updateUser,
}) {
  const [order, setOrder] = useState(orderItem);
  const { name } = store || {};
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
        authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY",
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
        alertToaster("Thank you! Your order has been confirmed.", "success");
      }
    }
  }, [orderId, paymentId, fetchOrder]);
  const [counter, setCounter] = useState(0);

  const isPaymentProcessing =
    (order?.status === "PENDING" || order?.status === "TIMEDOUT") &&
    order?.paymentType === "PREPAID" &&
    paymentId;

  useEffect(() => {
    if (isPaymentProcessing) {
      alertToaster("Hold On! We're updating your payment status...", "info");

      if (counter < 3 && paymentId) {
        if (timer) clearTimeout(timer);
        const timerId = setTimeout(() => {
          fetchPaymentStatus();
          setTimer(null);
        }, [2000]);
        setTimer(timerId);
        setCounter((count) => count + 1);
      }
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

  useEffect(() => {
    if (user && user.id && order) {
      if (user?.id === order?.userId) {
        fetchOrder();
      }
    }
  }, [user]);

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

      <div className="order-page-content page-content pt-7 pb-3 lh-default bg-white text-primary">
        <div className="step-by pr-4 pl-4 d-sm-none">
          <h3 className="title title-simple title-step">
            <ALink href="#">1. Shopping Cart</ALink>
          </h3>
          <h3 className="title title-simple title-step">
            <ALink href="#">2. Checkout</ALink>
          </h3>
          <h3 className="title title-simple title-step active">
            <ALink href="#">3. Order Complete</ALink>
          </h3>
        </div>

        <div className="container pt-7">
          <div className="d-flex justify-content-center align-items-center mb-4">
            <ALink
              className="order-image"
              href={
                "/collections/fragrance-bundle-offer?utm_source=thank_you_page"
              }
            >
              <NextImage
                src={"/images/banners/buy8@1999-category.jpg"}
                alt={"collections-fragrance-bundle-offer"}
                loader="local"
                width={1400}
                height={400}
                objectFit="cover"
                priority
              />
            </ALink>
          </div>
          <div className="d-flex justify-content-between">
            <h2 className="title title-simple text-left mr-2 mt-1 font-weight-bold text-uppercase">
              Order Details
            </h2>
            {order?.status === "CONFIRMED" && (
              <div className="d-flex">
                <Checkmark size={15} />
                <p className="text-success ml-2 font-weight-bold mt-1 lh-1">
                  Thank you. Your order is confirmed.
                </p>
              </div>
            )}
          </div>
          <div className="order-details bg-white">
            <table className="order-details-table">
              <tbody>
                <tr className="summary-subtotal">
                  <td>
                    <h4 className="summary-subtitle">Order number:</h4>
                  </td>
                  <td className="summary-subtotal-price">
                    #{order?.code || order?.id}
                  </td>
                </tr>
                <tr className="summary-subtotal">
                  <td>
                    <h4 className="summary-subtitle">Status:</h4>
                  </td>
                  <td
                    className={`summary-subtotal-price ${
                      order?.status === "CONFIRMED" && "text-success"
                    }`}
                  >
                    {order?.status}
                  </td>
                </tr>{" "}
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
                    <h4 className="summary-subtitle">Date:</h4>
                  </td>
                  <td className="summary-subtotal-price">
                    {formateDate(order?.createdAt)}
                  </td>
                </tr>
                {order?.shippingAddress && (
                  <tr className="summary-subtotal">
                    <td>
                      <h4 className="summary-subtitle">Shipping Address:</h4>
                    </td>
                    <td className="summary-subtotal-price">
                      {[
                        order?.shippingAddress?.address,
                        order?.shippingAddress?.location,
                        order?.shippingAddress?.city,
                        state,
                        country,
                        order?.shippingAddress?.pinCode,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <h2 className="title title-simple text-left pt-7 font-weight-bold text-uppercase">
            Product Details
          </h2>
          <div className="order-details bg-white mb-3">
            <table className="order-details-table">
              <tbody>
                {order?.products?.items?.map((item) => (
                  <tr key={"order-" + item.id}>
                    <td className="product-name" colSpan={2}>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                          <ALink
                            className="order-image mr-2"
                            href={"/products/" + item.product.slug}
                          >
                            <NextImage
                              src={
                                item.thumbImage ||
                                (item.variant?.images?.items[0]?.imageKey
                                  ? item.variant?.images?.items[0]?.imageKey
                                  : item.product?.images.items[0]?.imageKey)
                              }
                              alt={item.product?.images.items[0]?.alt}
                              width={80}
                              height={88}
                              priority
                            />
                          </ALink>
                          <div className="h-fit-content font-weight-semi-bold">
                            {`${item.product.title} `}
                            {allStatus.includes(item.status) && (
                              <Tag type={getStatusType(item.status)}>
                                {item.status}
                              </Tag>
                            )}

                            {item.variant && (
                              <p className="mb-0">{item.variant.title}</p>
                            )}
                            <div className="text-grey">
                              <label>
                                <span>Qty: </span>
                                {` ${item.quantity || item.cancelledQuantity}`}
                              </label>
                            </div>
                            {item.status === "DISPATCHED" && (
                              <div className="mt-1">
                                <div className="text-grey mb-1">
                                  <label>
                                    <span>Tracking Id: </span>
                                    {item.trackingId || "-"}
                                  </label>
                                </div>
                                <div className="text-grey">
                                  <label>
                                    <span>Delivery Partner: </span>
                                    {item.shippingCourier || "-"}
                                  </label>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="product-price ">
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
                {!!order?.appliedRewardPoints && (
                  <tr className="summary-subtotal">
                    <td>
                      <h4 className="summary-subtitle">Rewards</h4>
                    </td>
                    <td className="summary-subtotal-price">
                      -₹{toDecimal(order?.appliedRewardPoints)}
                    </td>
                  </tr>
                )}
                {!!order?.totalDiscount && (
                  <tr className="summary-subtotal">
                    <td>
                      <h4 className="summary-subtitle">Discount:</h4>
                    </td>
                    <td className="summary-subtotal-price">
                      -₹{toDecimal(order?.totalDiscount)}
                    </td>
                  </tr>
                )}
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
                {!!order?.totalCashOnDeliveryCharges && (
                  <tr className="summary-subtotal">
                    <td>
                      <h4 className="summary-subtitle">Cod Charges:</h4>
                    </td>
                    <td className="summary-subtotal-price">
                      ₹{toDecimal(order?.totalCashOnDeliveryCharges)}
                    </td>
                  </tr>
                )}
                <tr className="summary-subtotal">
                  <td>
                    <h4 className="summary-subtitle">Total:</h4>
                  </td>
                  <td>
                    <p className="summary-total-price pr-2">
                      ₹{toDecimal(order?.totalAmount)}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {!!order?.cashbackEarned && order?.cashbackEarned > 0 && (
            <div className="pb-0 d-flex align-items-center loyalty-text loyalty-padding">
              <LoyaltyTag />
              <p className="mb-0 pl-1">
                You have earned ₹{order?.cashbackEarned} cashback with this
                order
              </p>
            </div>
          )}
          <div className="d-lg-flex justify-content-between ">
            <div className="d-flex mt-4 mb-4 align-items-center justify-content-center w-full">
              <ALink
                href="/pages/orders"
                className="btn btn-icon-left btn-dark mr-2 btn-back btn-rounded btn-md  "
              >
                Your Orders
              </ALink>
              <ALink
                href="/pages/contact-us"
                className="btn btn-icon-left btn btn-back btn-rounded btn-md"
              >
                Contact us
              </ALink>
            </div>
            <div className="d-flex mt-4 mb-4 align-items-center justify-content-center w-full">
              <ALink
                className="btn btn-icon-left btn-dark mr-2 btn-back btn-rounded btn-md"
                href="/collections/fragrance-bundle-offer?utm_source=thank_you_page"
              >
                Return to shop
              </ALink>
            </div>
          </div>

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

    const products = response?.products?.items.map((item) => {
      if (item.variant?.images?.items[0]?.imageKey) {
        item.thumbImage = item?.variant?.images?.items[0]?.imageKey;
      } else {
        item.thumbImage = item.product.images?.items[0]?.imageKey;
      }
      return item;
    });

    if (
      response?.storeId === STORE_ID &&
      ((response?.status !== "PENDING" && response?.status !== "TIMEDOUT") ||
        paymentId)
    ) {
      return {
        order: {
          ...response,
          products: { ...response.products, items: products },
        },
        paymentId,
        orderId: orderId,
      };
    }
  } catch (error) {
    logger.error(error);
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
    user: state.user.data,
  };
}

const Component = connect(mapStateToProps, {
  updateUser: userActions.updateUserFields,
})(Order);

Component.hideMainMenu = true;
export default Component;
