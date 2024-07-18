import {
  getCouponDiscount,
  useCartTotal,
  useConfiguration,
} from "@wow-star/utils";
import { API, Auth } from "aws-amplify";
import { Logger } from "aws-amplify";
import { useRouter } from "next/router";
import { createContext, useCallback, useEffect } from "react";
import { connect } from "react-redux";

import { STORE_ID } from "~/config";
import { PREPAID_ENABLED } from "~/constant";
import {
  applyCoupon as applyCouponMutation,
  getCouponRule,
  getOrder,
} from "~/graphql/api";
import { cartActions } from "~/store/cart";
import { eventActions } from "~/store/events";
import { userActions } from "~/store/user";
import { formatUserAddress } from "~/utils/address";
import { useNavBarState } from "~/utils/contexts/navbar";
import { errorHandler } from "~/utils/errorHandler";
import { addPhonePrefix } from "~/utils/helper";

export const GKContext = createContext();

const logger = new Logger("Checkout");

function GoKwikProvider({
  children,
  cartList,
  user,
  emptyCart,
  placeOrder,
  applyCoupon,
  removeCoupon,
  addressSelected,
  addressAdded,
  addPaymentInfo,
  setCustomUser,
  dispatchAuthEvent,
  startCheckout,
}) {
  const router = useRouter();
  const { isRewardApplied } = useNavBarState();
  const prepaidEnabled = useConfiguration(PREPAID_ENABLED, true);
  const { totalPrice } = useCartTotal({
    isRewardApplied: isRewardApplied,
    paymentType: prepaidEnabled ? "PREPAID" : "COD",
  });

  const applyCouponCode = useCallback(
    async (couponCode, autoApplied = false) => {
      logger.log("couponCode", couponCode);
      const response = await API.graphql({
        query: applyCouponMutation,
        authMode: "API_KEY",
        variables: {
          storeId: STORE_ID,
          code: couponCode,
          deviceType: "WEB",
          variantFilter: { status: { ne: "DISABLED" } },
          imageLimit: 1,
        },
      })
        .then((data) => data.data.applyCoupon)
        .catch((err) => logger.error(err));

      logger.log("response", response);

      if (response) {
        const {
          allowed,
          message,
          coupon: couponResponse,
        } = getCouponDiscount(response, cartList);

        if (allowed) {
          applyCoupon({
            ...couponResponse,
            autoApplied: !!autoApplied,
            checkoutSource: "GOKWIK",
          });
          logger.info("Applied coupon:", response);
        } else {
          logger.error("Failed to apply coupon:", message);
        }
      } else {
        logger.error("Coupon not found");
      }
    },
    [user, cartList]
  );

  const onCouponRemove = () => {
    cartList.forEach((item) => {
      if (item.cartItemSource === "COUPON") {
        removeFromCart(item);
      }
    });

    removeCoupon();
    logger.info("Removed coupon");
  };

  const fetchOrder = async (orderId) => {
    try {
      const response = await API.graphql({
        query: getOrder,
        variables: { id: orderId },
        authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY",
      });
      return response.data.getOrder;
    } catch (error) {
      errorHandler(error);
    }
  };

  const fetchCoupon = async (code) => {
    try {
      const response = await API.graphql({
        query: getCouponRule,
        variables: { code, storeId: STORE_ID },
        authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY",
      });
      return response.data.getCouponRule;
    } catch (error) {
      errorHandler(error);
    }
  };

  const manageUserAuthEvent = async (phone, token) => {
    const isLoggedIn = await Auth.currentAuthenticatedUser().catch(() => null);
    console.log("isLoggedIn", isLoggedIn);
    if (!isLoggedIn) {
      try {
        const cu = await Auth.signIn(addPhonePrefix(phone), undefined, {
          checkout: "GOKWIK",
        });
        const signInUserSession = await Auth.sendCustomChallengeAnswer(
          cu,
          token
        );

        if (signInUserSession) {
          const { sub = "" } = signInUserSession?.accessToken?.payload;
          if (sub) {
            dispatchAuthEvent("login", { userId: sub });
          }
          return Promise.resolve(null);
        }
      } catch (error) {
        logger.error("user-login-successful error", error);
      }

      setCustomUser(phone);
      dispatchAuthEvent("signup", {
        userId: null,
        phone: addPhonePrefix(phone),
      });
    }
  };

  useEffect(() => {
    gokwikSdk.on("order-complete", async (orderDetails) => {
      try {
        if (orderDetails.merchant_order_id) {
          let orderResponse, coupon;
          orderResponse = await fetchOrder(orderDetails.merchant_order_id);
          if (orderResponse) {
            const order = {
              totalCashOnDeliveryCharges:
                orderResponse?.totalCashOnDeliveryCharges,
              totalShippingCharges: orderResponse?.totalShippingCharges,
              totalDiscount: orderResponse?.totalDiscount,
              totalAmount: orderResponse?.totalAmount,
              code: orderResponse?.code,
              status: orderResponse?.status,
              id: orderResponse?.id,
            };

            if (orderDetails?.applied_discount)
              coupon = await fetchCoupon(orderDetails?.applied_discount?.code);

            placeOrder(
              order,
              orderResponse?.products?.items,
              coupon,
              orderDetails.shipping_address,
              orderResponse?.paymentType ||
                orderDetails.payment_method.toUpperCase(),
              "GOKWIK"
            );
            logger.debug("Purchase event done");
            logger.debug("Redirecting to success page");
          }
        }
      } catch (e) {
        errorHandler(e);
      } finally {
        await gokwikSdk.close();
        await emptyCart();
        if (orderDetails.merchant_order_id)
          await router.push(`/order/${orderDetails.merchant_order_id}`);
        else await router.push(`/`);
      }
    });

    gokwikSdk.on("coupon-applied", (data) => {
      logger.log("coupon-applied>>>", data);
      if (data.coupon_code) applyCouponCode(data.coupon_code);
    });

    gokwikSdk.on("coupon-removed", (data) => {
      logger.log("coupon-removed>>>", data);
      if (data.coupon_code) onCouponRemove();
    });

    gokwikSdk.on("address-add", (address) => {
      logger.log("address-add>>>", address);
      const formattedAddress = formatUserAddress(address);
      addressAdded(formattedAddress, totalPrice, "GOKWIK");
      addressSelected(formattedAddress, totalPrice, "GOKWIK");
    });

    gokwikSdk.on("address-selected", (address) => {
      logger.log("address-selected>>>", address);
      const formattedAddress = formatUserAddress(address);
      addressSelected(formattedAddress, totalPrice, "GOKWIK");
    });

    gokwikSdk.on("payment-method-selected", (payment) => {
      logger.log("payment>>>", payment);
      const checkoutSource = "GOKWIK";
      addPaymentInfo(checkoutSource);
    });

    gokwikSdk.on("checkout-initiation-failure", (checkout) => {
      logger.log("checkout-initiation-failure>>>", checkout);
      gokwikSdk.close();
      router.push("/pages/checkout");
    });

    gokwikSdk.on("user-login-successful", async (event) => {
      logger.log("user-login-successful>>>", event);
      await startCheckout("GOKWIK");
      await manageUserAuthEvent(event.phone_no, event.user_token);
    });
  }, []);

  return <GKContext.Provider value={{}}>{children}</GKContext.Provider>;
}

function mapStateToProps(state) {
  return {
    cartList: state.cart.data ? state.cart.data : [],
    user: state.user.data,
    appliedCoupon: state.cart.coupon,
    store: state.system.store,
  };
}

const Component = connect(mapStateToProps, {
  emptyCart: cartActions.emptyCart,
  removeFromCart: cartActions.removeFromCart,
  applyCoupon: cartActions.applyCoupon,
  removeCoupon: cartActions.removeCoupon,
  placeOrder: eventActions.placeOrder,
  addressSelected: eventActions.addressSelected,
  addressAdded: eventActions.addressAdded,
  addPaymentInfo: eventActions.addPaymentInfo,
  setCustomUser: userActions.setCustomUser,
  dispatchAuthEvent: eventActions.auth,
  startCheckout: eventActions.startCheckout,
})(GoKwikProvider);
export default Component;
