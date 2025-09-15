"use client";

import { API, Logger } from "aws-amplify";
import { useAppRouter } from "~/utils/navigation";
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
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import useWindowDimensions from "~/utils/getWindowDimension";
import { alertToaster } from "~/utils/popupHelper";

const logger = new Logger("Orders");

function Order({ params, order: orderItem, paymentId, orderId, store, user, updateUser }) {
  const [order, setOrder] = useState(orderItem);
  const { name, banners } = store || {};
  const { webKey: webBanner = "", mobileKey: mobileBanner = "", link = "" } = banners?.find((i) => !!i.isThankYouPageBanner) || {};
  const [timer, setTimer] = useState(null);
  const allStatus = ["CANCELLED", "DISPATCHED", "COURIER_RETURN", "DELIVERED"];
  const { isSmallSize: isMobile } = useWindowDimensions();

  const router = useAppRouter();

  useEffect(() => {
    if (!orderItem) router.push("/404");
  }, []);

  const fetchOrder = useCallback(async () => {
    try {
      const response = await API.graphql({ query: getOrder, variables: { id: orderId }, authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY" });
      if (!!response.data.getOrder) setOrder(response.data.getOrder);
    } catch (error) {
      errorHandler(error);
    }
  }, [orderId]);

  const fetchPaymentStatus = useCallback(async () => {
    if (orderId && paymentId) {
      const { data: { validateTransaction: { success } } } = await API.graphql({ query: validateTransaction, variables: { orderId, razorpayPaymentId: paymentId } });
      if (success) {
        fetchOrder();
        alertToaster("Thank you! Your order has been confirmed.", "success");
      }
    }
  }, [orderId, paymentId, fetchOrder]);
  const [counter, setCounter] = useState(0);

  const isPaymentProcessing = (order?.status === "PENDING" || order?.status === "TIMEDOUT") && order?.paymentType === "PREPAID" && paymentId;
  const isStatusProcessing = (order?.status === "PENDING" || order?.status === "TIMEDOUT") && order?.checkoutChannel === "GOKWIK";

  useEffect(() => {
    if (isStatusProcessing) {
      if (counter < 3) {
        if (timer) clearTimeout(timer);
        const timerId = setTimeout(() => { fetchOrder(); setTimer(null); }, [2000]);
        setTimer(timerId);
        setCounter((count) => count + 1);
      }
    }
  }, [order]);

  useEffect(() => {
    if (isPaymentProcessing) {
      alertToaster("Hold On! We're updating your payment status...", "info");
      if (counter < 3 && paymentId) {
        if (timer) clearTimeout(timer);
        const timerId = setTimeout(() => { fetchPaymentStatus(); setTimer(null); }, [2000]);
        setTimer(timerId);
        setCounter((count) => count + 1);
      }
    }
  }, [order, paymentId]);

  const { state, country } = useMemo(() => {
    if (order?.shippingAddress?.state) {
      return { state: States.find((s) => s.value === order?.shippingAddress?.state)?.name, country: "India" };
    }
    return { state: null, country: null };
  }, [order]);

  useEffect(() => {
    if (user && user.id && order) {
      if (user?.id === order?.userId) {
        fetchOrder();
      }
    }
  }, [user]);

  const getStatusType = (status) => {
    switch (status) {
      case "DISPATCHED": return "info";
      case "CANCELLED":
      case "COURIER_RETURN": return "cancel";
      case "DELIVERED": return "success";
    }
  };

  return (
    <main className="main order">
      <h1 className="d-none">{name}- Order</h1>
      <div className="order-page-content page-content pt-7 pb-3 lh-default bg-white text-primary">
        <div className="step-by pr-4 pl-4 d-sm-none">
          <h3 className="title title-simple title-step"><ALink href="#">1. Shopping Cart</ALink></h3>
          <h3 className="title title-simple title-step"><ALink href="#">2. Checkout</ALink></h3>
          <h3 className="title title-simple title-step active"><ALink href="#">3. Order Complete</ALink></h3>
        </div>
        <div className="container pt-7">
          <div className="d-flex justify-content-center align-items-center mb-4">
            <div id="promocode-element-container">
              <ALink className="order-image" href={link || "#"}>
                {isMobile && !!mobileBanner && (
                  <NextImage src={getPublicImageURL(mobileBanner)} alt={"Thank You Page Banner"} loader="local" width={400} height={200} priority />)}
                {!isMobile && !!webBanner && (
                  <NextImage src={getPublicImageURL(webBanner)} alt={"Thank You Page Banner"} loader="local" width={1400} height={400} priority />)}
              </ALink>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <h2 className="title title-simple text-left mr-2 mt-1 font-weight-bold text-uppercase">Order Details</h2>
            {order?.status === "CONFIRMED" && (
              <div className="d-flex"><Checkmark size={15} /><p className="text-success ml-2 font-weight-bold mt-1 lh-1">Thank you. Your order is confirmed.</p></div>
            )}
          </div>
          {/* Full table and details copied*/}
        </div>
        <PaymentLoader />
      </div>
    </main>
  );
}

export default connect(
  (state) => ({ store: state.system.store, user: state.user.data }),
  { updateUser: userActions.setUser }
)(Order);
