import {
  useCartItems,
  useCartTotal,
  useConfiguration,
  useFreeProducts,
  useInventory,
  useNavbar,
  useOrders,
} from "@wow-star/utils";
import { Logger } from "aws-amplify";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Collapse } from "react-bootstrap";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";

import Addresses from "~/components/common/addresses";
import Passwordless from "~/components/common/partials/passwordless";
import PaymentLoader from "~/components/common/partials/payment-loader";
import PaymentMethods from "~/components/features/payment-radio";
import {
  DownAngle,
  LoyaltyTag,
  RightAngle,
  ShoppingCart,
  UpAngle,
} from "~/components/icons";
import NextImage from "~/components/image";
import { RAZORPAY_KEY, RAZORPAY_SCRIPT } from "~/config";
import {
  COD_ENABLED,
  MAX_COD_AMOUNT,
  MIN_COD_AMOUNT,
  MAX_PREPAID_DISCOUNT,
  PPCOD_AMOUNT,
  PPCOD_ENABLED,
  PREPAID_ENABLED,
} from "~/constant";
import { cartActions } from "~/store/cart";
import { eventActions } from "~/store/events";
import { modalActions } from "~/store/modal";
import { toDecimal } from "~/utils";
import { useGuestCheckout, useNavBarState } from "~/utils/contexts/navbar";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { useWindowDimensions } from "~/utils/getWindowDimension";
import { analyticsMetaDataMapper, checkAffiseValidity } from "~/utils/helper";
import loadScript from "~/utils/loadScript";
import { alertToaster } from "~/utils/popupHelper";
import { productDiscountPercentage } from "~/utils/products";

const logger = new Logger("Checkout");

let razorpayMethod;

function Checkout(props) {
  const {
    cartList,
    user,
    shoppingCartId,
    emptyCart,
    appliedCoupon,
    setCartVisibility,
    store,
    metadata,
    placeOrder: onPlaceOrder,
    startCheckout,
    openAllAddressModal,
    openLogin,
    addPaymentInfo,
    validateCart,
    customUser,
  } = props;

  const { name } = store || {};

  const guestCheckout = useGuestCheckout();
  const maxCOD = useConfiguration(MAX_COD_AMOUNT, -1);
  const minCOD = useConfiguration(MIN_COD_AMOUNT, -1);
  const prepaidEnabled = useConfiguration(PREPAID_ENABLED, true);
  const codEnabled = useConfiguration(COD_ENABLED, true);
  const ppcodEnabled = useConfiguration(PPCOD_ENABLED, false);
  const ppcodAmount = useConfiguration(PPCOD_AMOUNT, 0);

  const { isRewardApplied } = useNavBarState();

  const { isSmallSize: isMobile } = useWindowDimensions();
  const { ready: isInventoryCheckReady, inventoryMapping } = useInventory({
    validateCart,
  });

  const freeProductsResponse = useFreeProducts({
    showNonApplicableFreeProducts: false,
  });

  const router = useRouter();
  const [systemMetadata, setSystemMetadata] = useState("");
  const [payMethod, setFirst] = useState(prepaidEnabled ? "PREPAID" : "COD");
  const { isReady, userWithRewardPoints, setUserWithRewardPoints } =
    useNavbar();
  const [shippingAddress, setAddress] = useState(null);
  const [formError, setFormError] = useState(null);
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [isCollapse, setIsCollapse] = useState(false);
  const [paymentLoader, setPaymentLoader] = useState(false);

  const [
    { isConfirmed, order: finalOrder, loading },
    placeOrderV1,
    orderHelper,
  ] = useOrders({ orderVersion: "V2" });

  const freeProducts = useMemo(
    () => freeProductsResponse.map((f) => f.product),
    [freeProductsResponse]
  );

  const isFirst = payMethod === "PREPAID";

  useEffect(() => {
    setFormError(null);
  }, [shippingAddress]);

  useEffect(() => {
    const initializeCheckout = async () => {
      startCheckout();
      const _systemMetadata = await analyticsMetaDataMapper();
      setSystemMetadata(_systemMetadata);
    };
    initializeCheckout();
    logger.verbose("Checkout component initialized");
  }, []);

  const {
    totalListingPrice,
    totalPrice,
    shippingTotal,
    totalAmountSaved: totalSaved,
    couponTotal,
    grandTotal,
    prepaidDiscount,
    codGrandTotal,
    prepaidGrandTotal,
    codCharges,
    appliedCODCharges,
    prepaidDiscountPercent,
    usableRewards,
    totalAmount,
    codCashbackRewardsOnOrder,
    prepaidCashbackRewardsOnOrder,
    amountNeededToAvailCodCashback,
    amountNeededToAvailPrepaidCashback,
  } = useCartTotal({
    paymentType: payMethod,
    isRewardApplied,
  });

  const cartItems = useCartItems({
    showLTOProducts: true,
    showNonApplicableFreeProducts: false,
  });

  const afterOrderConfirm = async () => {
    if (isConfirmed && finalOrder) {
      onPlaceOrder(
        finalOrder,
        [...freeProducts],
        appliedCoupon,
        shippingAddress,
        payMethod,
        "BODYCUPID"
      );

      if (isRewardApplied)
        setUserWithRewardPoints({
          ...userWithRewardPoints,
          totalRewards: Math.max(
            userWithRewardPoints?.totalRewards - usableRewards,
            0
          ),
        });
      logger.debug("Purchase event done");
      logger.debug("Redirecting to success page");

      if (razorpayMethod) {
        logger.debug("Closing razorpay modal");
        razorpayMethod.close();
      }
      await router.push(`/order/${finalOrder.id}`);
      setPaymentLoader(false);
      await emptyCart();
    }
  };

  useEffect(() => {
    if (isConfirmed) {
      afterOrderConfirm();
    }
  }, [isConfirmed]);

  const placeOrder = async (e) => {
    try {
      e.preventDefault();

      const variables = {
        paymentMethod: payMethod,
        address: shippingAddress,
        metadata,
        metadata: {
          ...metadata,
          systemMeta: JSON.stringify(systemMetadata),
          checkoutUrl: window?.location?.href,
        },
        appliedRewardPoints: isRewardApplied ? usableRewards : 0,
        totalAmount: totalAmount,
        shoppingCartId,
        source: "WEB",
        totalCashbackEarned:
          payMethod === "COD"
            ? codCashbackRewardsOnOrder
            : prepaidCashbackRewardsOnOrder,
      };

      if (isRewardApplied && !!usableRewards) {
        variables.appliedRewardPoints = usableRewards ? usableRewards : null;
      }

      const isAffiseTrackingValid = checkAffiseValidity();
      if (isAffiseTrackingValid) {
        variables.isAffiseTrackingValid = isAffiseTrackingValid
          ? isAffiseTrackingValid
          : null;
      }
      if (!guestCheckout && !customUser && (!user || !user.isActive)) {
        emptyCart();
        router.replace("/pages/order-failed");
        return;
      }

      setPaymentLoader(true);
      const [
        { success, code, formError, order, payment, transaction },
        rzpEnabled,
      ] = await Promise.all([
        placeOrderV1(variables),
        loadScript(RAZORPAY_SCRIPT),
      ]);

      if (!success) {
        if (code === "INVALID_ADDRESS") {
          setFormError(formError);
          if (
            formError?.pincode ===
              "Online Delivery is not available at this pincocde" ||
            formError?.pincode ===
              "Cash on Delivery is not available at this pincocde"
          ) {
            alertToaster(
              `  We're sorry! We currently don't deliver to this pincode. However,
                  we're working hard to expand our service areas and hope to reach
                  your location soon. Please try a different delivery address to
                  proceed.`,
              "info",
              "top-center",
              1000
            );
            delete formError.pincode;
            setPaymentLoader(false);
            return Promise.resolve();
          }
        }
        alertToaster("Something went wrong. Try Again!");
        setPaymentLoader(false);
      }

      if (success && rzpEnabled && store && transaction && order) {
        const options = {
          key: RAZORPAY_KEY,
          amount: transaction.amount,
          currency: "INR",
          name: store.name,
          image: getPublicImageURL(store.imageUrl),
          order_id: transaction.orderId,
          handler: async function ({ razorpay_payment_id }) {
            orderHelper.fetchTransactionStatus(order.id, razorpay_payment_id);
          },
          prefill: {
            name: shippingAddress.name,
            email: shippingAddress.email,
            contact: shippingAddress.phone,
          },
          notes: {
            storeId: store.id,
            orderId: order.id,
            paymentId: payment.id,
          },
          theme: {
            color: "#3399cc",
          },
          modal: {
            ondismiss: function () {
              orderHelper.reset();
              razorpayMethod = null;
              setPaymentLoader(false);
            },
          },
        };

        razorpayMethod = new Razorpay(options);
        razorpayMethod.open();
        addPaymentInfo();
        logger.verbose("Razorpay initialization");
      }

      return Promise.resolve();
    } catch (error) {
      console.log("error", error);
      setPaymentLoader(false);
    }
  };

  const { codCouponDisabled, onlineDisabled, ppcodCouponEnabled } =
    useMemo(() => {
      return {
        codCouponDisabled: appliedCoupon?.paymentMethod === "ONLINE",
        onlineDisabled: appliedCoupon?.paymentMethod === "COD",
        ppcodCouponEnabled: appliedCoupon?.ppcodCouponAmount > 0,
      };
    }, [appliedCoupon]);

  const isMaxCODDisabled = maxCOD > -1 ? codGrandTotal > maxCOD : false;
  const isMinCODDisabled = minCOD > -1 ? codGrandTotal < minCOD : false;

  const ppcodAmountToTake = ppcodCouponEnabled
    ? appliedCoupon?.ppcodCouponAmount
    : ppcodAmount;
  return (
    <main className="main checkout">
      <Head>
        <title>{name} | Checkout</title>
      </Head>
      <h1 className="d-none">{name} - Checkout</h1>
      {paymentLoader && <PaymentLoader loading={paymentLoader} />}

      {!user && !guestCheckout && !customUser && (
        <Passwordless forceOpen redirect={false} customSignupProp={true} />
      )}
      <div className={`checkout-page-content page-content pb-10`}>
        <div className="step-by pr-4 pl-4 d-sm-none pb-5 pt-7">
          <h3 className="title title-simple title-step">
            <ALink
              href="#"
              onClick={() => {
                setCartVisibility(true);
              }}
            >
              1. Shopping Cart
            </ALink>
            <i>
              <RightAngle size={18} color="currentColor" />
            </i>
          </h3>
          <h3 className="title title-simple title-step active">
            <ALink href="#">2. Checkout</ALink>
            <i>
              <RightAngle size={18} color="currentColor" />
            </i>
          </h3>
          <h3 className="title title-simple title-step">3. Order Complete</h3>
        </div>

        <div className={"container mt-0 md-7"}>
          {cartList.length > 0 && totalListingPrice > 0 ? (
            <>
              {/* <form className="form" onSubmit={placeOrder}> */}
              <div className="row">
                {!isMobile && (
                  <div className="col-lg-7 mb-4 mb-lg-0 pr-lg-4 p-0 d-sm-none">
                    <Addresses
                      onAddressChange={setAddress}
                      variant="CHECKOUT"
                      setIsValidAddress={setIsValidAddress}
                    />
                  </div>
                )}

                <aside
                  id="checkout-details"
                  className="col-lg-5 sticky-sidebar-wrapper"
                >
                  <div
                    className="sticky-sidebar"
                    data-sticky-options="{'bottom': 50}"
                  >
                    <div className="summary pt-5 p-0 border-no">
                      <div className="">
                        <div
                          onClick={() => setIsCollapse(!isCollapse)}
                          className="checkout-summary-btn d-flex bg-white border-regular align-items-center mb-2 "
                        >
                          <div>
                            <div className="d-flex align-items-center">
                              <ShoppingCart size={20} />
                              <p className="checkout-summary-label m-0">
                                Order Summary &nbsp;
                                {isCollapse ? (
                                  <UpAngle size={17} color="currentColor" />
                                ) : (
                                  <DownAngle color="currentColor" size={16} />
                                )}
                              </p>
                            </div>
                            {!!totalSaved && (
                              <p className="saving-lable mb-0 ml-6 text-success">
                                <span>{`₹${toDecimal(totalSaved)} `}</span>
                                saved so far on this order
                              </p>
                            )}
                          </div>
                          <p className="m-0 checkout-summary-total font-weight-semi-bold">
                            ₹{toDecimal(grandTotal)}
                          </p>
                        </div>
                        {!!(
                          (codCashbackRewardsOnOrder && payMethod === "COD") ||
                          (prepaidCashbackRewardsOnOrder &&
                            payMethod === "PREPAID")
                        ) && (
                          <div className="bg-white border-regular d-flex pl-3 mb-2 align-items-center">
                            <LoyaltyTag />
                            <p className="mb-0 pl-1 pb-1 pt-1">
                              You will earn ₹
                              {payMethod === "COD"
                                ? codCashbackRewardsOnOrder
                                : prepaidCashbackRewardsOnOrder}{" "}
                              Cashback on this order!
                            </p>
                          </div>
                        )}
                        {!!(
                          (payMethod === "COD" &&
                            amountNeededToAvailCodCashback.amount -
                              codGrandTotal >
                              0 &&
                            amountNeededToAvailCodCashback.isEnabled &&
                            !codCashbackRewardsOnOrder) ||
                          (payMethod === "PREPAID" &&
                            amountNeededToAvailPrepaidCashback.amount -
                              prepaidGrandTotal >
                              0 &&
                            amountNeededToAvailPrepaidCashback.isEnabled &&
                            !prepaidCashbackRewardsOnOrder)
                        ) && (
                          <div className="bg-white border-regular d-flex pl-3 mb-2 align-items-center">
                            <LoyaltyTag />
                            <p className="mb-0 pl-1 pt-1 pb-1">
                              Add items worth ₹
                              {payMethod === "COD"
                                ? toDecimal(
                                    amountNeededToAvailCodCashback.amount -
                                      codGrandTotal
                                  )
                                : toDecimal(
                                    amountNeededToAvailPrepaidCashback.amount -
                                      prepaidGrandTotal
                                  )}{" "}
                              more to earn cashback
                            </p>
                          </div>
                        )}
                      </div>

                      <Collapse in={isCollapse}>
                        <div className="collapsible-checkout-wrapper mb-2">
                          <table className="order-table cart-table">
                            <thead>
                              <tr>
                                <th className="p-0"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {cartItems.map((item) => (
                                <tr
                                  className="m-0 p-0 border-no"
                                  key={item.itemKey}
                                >
                                  <td className="m-0 p-0">
                                    <div className="mobile-specific-cart-product-container border-regular bg-white mb-2 d-flex p-relative">
                                      <figure>
                                        <NextImage
                                          src={item?.thumbImage}
                                          width={100}
                                          height={100}
                                          alt={item?.images?.items[0]?.alt}
                                          priority
                                        />
                                      </figure>
                                      <div className="text-left text-primary w-100 mr-5 ml-2">
                                        <div>{item.title}</div>

                                        {inventoryMapping &&
                                        item.qty >
                                          inventoryMapping[item.recordKey] ? (
                                          <div className="outofstock-tag mt-2">
                                            <p className="m-0 outofstock-label">
                                              out of stock
                                            </p>
                                          </div>
                                        ) : (
                                          <div className="product-subtotal mt-1">
                                            {(item?.cartItemType ===
                                              "FREE_PRODUCT" ||
                                              item?.cartItemType ===
                                                "AUTO_FREE_PRODUCT") && (
                                              <span className="text-success mr-1">
                                                {!!item.price && (
                                                  <del className="summary-subtotal-listingprice ml-0 mr-1">
                                                    ₹{toDecimal(item.price)}
                                                  </del>
                                                )}
                                                Free
                                              </span>
                                            )}

                                            {item?.cartItemType !==
                                              "FREE_PRODUCT" &&
                                              item?.cartItemType !==
                                                "AUTO_FREE_PRODUCT" && (
                                                <p className="m-0 product-discount-listing">
                                                  <span className="sm-product-amount">
                                                    ₹{toDecimal(item.price)}
                                                  </span>
                                                  {item.price <
                                                    item.listingPrice && (
                                                    <del className="summary-subtotal-listingprice">
                                                      ₹
                                                      {toDecimal(
                                                        item.listingPrice
                                                      )}
                                                    </del>
                                                  )}
                                                  <span
                                                    className={`discount-percetage ml-2`}
                                                  >
                                                    {productDiscountPercentage(
                                                      item
                                                    ) > 0 &&
                                                      `${productDiscountPercentage(
                                                        item
                                                      )}% off`}
                                                  </span>
                                                </p>
                                              )}

                                            <div className="text-grey">
                                              Qty:{item.qty || 1}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div className="check-payment-detail border-regular bg-white">
                            <table className="order-table cart-table">
                              <thead>
                                <tr>
                                  <th></th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="summary-subtotal">
                                  <td>
                                    <h4 className="summary-subtitle">
                                      Subtotal
                                    </h4>
                                  </td>
                                  <td>
                                    <p className="summary-subtotal-price">
                                      {totalPrice < totalListingPrice && (
                                        <del className="summary-subtotal-listingprice mr-2">
                                          ₹{toDecimal(totalListingPrice)}
                                        </del>
                                      )}
                                      ₹{toDecimal(totalPrice)}
                                    </p>
                                  </td>
                                </tr>
                                {!!appliedCoupon && !!couponTotal && (
                                  <tr className="summary-subtotal">
                                    <td>
                                      <h4 className="summary-subtitle">
                                        Coupons
                                        <span> ({appliedCoupon.code})</span>
                                      </h4>
                                    </td>
                                    <td>
                                      <p className="summary-subtotal-price discount-price-color">
                                        - {`₹${toDecimal(couponTotal)}`}
                                      </p>
                                    </td>
                                  </tr>
                                )}
                                {isFirst &&
                                  !!prepaidDiscount &&
                                  prepaidDiscount > 0 && (
                                    <tr className="summary-subtotal">
                                      <td>
                                        <h4 className="summary-subtitle">
                                          {prepaidDiscountPercent}% Online
                                          Payment Discount
                                        </h4>
                                      </td>
                                      <td className="summary-subtotal-price discount-price-color pb-0 pt-0">
                                        - {`₹${toDecimal(prepaidDiscount)}`}
                                      </td>
                                    </tr>
                                  )}
                                {(!!shippingTotal ||
                                  payMethod === "PREPAID") && (
                                  <tr className="summary-subtotal">
                                    <td>
                                      <h4 className="summary-subtitle">
                                        Shipping
                                        {payMethod === "PREPAID" && (
                                          <p className="m-0">
                                            For prepaid orders only
                                          </p>
                                        )}
                                      </h4>
                                    </td>
                                    <td
                                      className={`summary-subtotal-price pb-0 pt-0 ${
                                        !shippingTotal && "discount-price-color"
                                      }`}
                                    >
                                      {shippingTotal < 50 && (
                                        <del className="summary-subtotal-listingprice mr-2">
                                          ₹{toDecimal(50)}
                                        </del>
                                      )}
                                      {!!shippingTotal
                                        ? `₹${toDecimal(shippingTotal)}`
                                        : "Free"}
                                      &nbsp;
                                    </td>
                                  </tr>
                                )}

                                {!!codCharges && codCharges > 0 && (
                                  <tr className="summary-subtotal">
                                    <td>
                                      <h4 className="summary-subtitle">
                                        COD Charges
                                      </h4>
                                    </td>
                                    <td
                                      className={`summary-subtotal-price pb-0 pt-0 ${
                                        !appliedCODCharges &&
                                        "discount-price-color"
                                      }`}
                                    >
                                      {!appliedCODCharges && (
                                        <del className="summary-subtotal-listingprice mr-2">
                                          ₹{toDecimal(codCharges)}
                                        </del>
                                      )}
                                      {!!appliedCODCharges
                                        ? `₹${toDecimal(appliedCODCharges)}`
                                        : "Free"}
                                      &nbsp;
                                    </td>
                                  </tr>
                                )}

                                {isRewardApplied && !!usableRewards && (
                                  <tr className="summary-subtotal">
                                    <td>
                                      <h4 className="summary-subtitle">
                                        Cupid Coins
                                      </h4>
                                    </td>
                                    <td>
                                      <p className="summary-subtotal-price discount-price-color">
                                        - {`₹${toDecimal(usableRewards)}`}
                                      </p>
                                    </td>
                                  </tr>
                                )}
                                <tr className="summary-subtotal">
                                  <td>
                                    <h4 className="summary-subtitle">
                                      Total{" "}
                                      <p className="m-0">
                                        Inclusive of all taxes
                                      </p>
                                    </h4>
                                  </td>
                                  <td>
                                    <p className="summary-total-price ls-s">
                                      ₹{toDecimal(grandTotal)}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan={2}>
                                    <div
                                      className={
                                        "avg-delivery-lable-container mt-3"
                                      }
                                    >
                                      <p className="m-0">
                                        Average delivery time:{" "}
                                        <span>5-7 days</span>
                                      </p>
                                    </div>
                                    {!!totalSaved && (
                                      <div className="summary-saving-lable-container">
                                        <p className="saving-lable">
                                          <span>{`₹${toDecimal(
                                            totalSaved
                                          )}`}</span>{" "}
                                          saved so far on this order
                                        </p>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </Collapse>

                      {!!isMobile && (
                        <div className="col-lg-6 mb-lg-0 pr-lg-4 p-0 d-sm-show">
                          {
                            <div>
                              <h5 className="payment-heading">Address</h5>
                              <div className="mb-1 pl-3 pb-0">
                                Hey! Tell us where to deliver.
                              </div>
                            </div>
                          }
                          <Addresses
                            onAddressChange={setAddress}
                            variant="CHECKOUT"
                            setIsValidAddress={setIsValidAddress}
                          />
                        </div>
                      )}

                      <div
                        className="payment accordion radio-type "
                        id="payment-method"
                      >
                        <h4 className="payment-heading">Payment Methods</h4>

                        <div className="checkbox-group ">
                          {prepaidEnabled && (
                            <PaymentMethods
                              title="Pay Online"
                              tag={
                                !!prepaidDiscount &&
                                `EXTRA ${prepaidDiscountPercent}% OFF`
                              }
                              isSelected={payMethod === "PREPAID"}
                              description={
                                onlineDisabled
                                  ? `Online payment disabled for you coupon "${appliedCoupon?.code}"`
                                  : "Pay using credit/debit cards, net-banking, UPI, or digital wallets."
                              }
                              disabled={onlineDisabled}
                              onClick={() => {
                                !onlineDisabled && setFirst("PREPAID");
                              }}
                              amount={prepaidGrandTotal}
                            />
                          )}
                          {codEnabled && (
                            <PaymentMethods
                              title={`${
                                (ppcodEnabled && ppcodAmount) ||
                                ppcodCouponEnabled
                                  ? "Partial Cash On Delivery"
                                  : "Cash On Delivery"
                              }`}
                              tagVariant="danger"
                              showUpdateCoupon={codCouponDisabled}
                              tag={
                                !!codCharges &&
                                `₹${toDecimal(codCharges)} EXTRA`
                              }
                              isSelected={payMethod === "COD"}
                              description={
                                codCouponDisabled
                                  ? `COD payment disabled for your coupon "${appliedCoupon?.code}"`
                                  : isMinCODDisabled
                                  ? `COD payment is not allowed for orders below ₹${minCOD}.`
                                  : isMaxCODDisabled
                                  ? `COD payment is not allowed for orders above ₹${maxCOD}.`
                                  : (ppcodEnabled && ppcodAmount) ||
                                    ppcodCouponEnabled
                                  ? `Pay ₹${toDecimal(
                                      ppcodAmountToTake
                                    )} now (non-refundable). Rest ₹${toDecimal(
                                      codGrandTotal - ppcodAmountToTake
                                    )} on delivery.`
                                  : "Pay using Cash on Delivery."
                              }
                              disabled={
                                codCouponDisabled ||
                                isMaxCODDisabled ||
                                isMinCODDisabled
                              }
                              onClick={() => {
                                !codCouponDisabled &&
                                  !isMaxCODDisabled &&
                                  !isMinCODDisabled &&
                                  setFirst("COD");
                              }}
                              amount={codGrandTotal}
                            />
                          )}
                        </div>
                      </div>

                      {!!formError &&
                        !!Object.keys(formError || {})?.length && (
                          <div className="overflow-hidden mb-4">
                            <div className="alert alert-danger alert-summary alert-light alert-message alert-inline">
                              <ul className="m-0">
                                {Object.values(formError)?.map((val) => (
                                  <li key={val}>{val}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                      <div
                        className={`d-flex justify-content-center ${
                          isMobile
                            ? "stick-bottom-button stick-bottom-button-order"
                            : ""
                        }`}
                      >
                        {/* {!isValidAddress && !!isMobile && user && (
                          <button
                            onClick={() => {
                              openAllAddressModal();
                            }}
                            className="btn btn-primary btn-rounded d-flex justify-content-center align-items-center btn-order"
                          >
                            Add new address
                            {loading && <div className="spin-loader ml-2" />}
                          </button>
                        )} */}
                        {
                          <button
                            onClick={(e) => {
                              placeOrder(e);
                            }}
                            disabled={
                              !isReady ||
                              !isValidAddress ||
                              !isInventoryCheckReady ||
                              loading
                            }
                            className={`btn pb-4 pt-4 m-0 d-flex justify-content-center align-items-center btn-order ${
                              isValidAddress ? "btn-primary" : "btn-disabled"
                            }`}
                          >
                            Place Order
                            {(loading || paymentLoader) && (
                              <div className="spin-loader ml-2" />
                            )}
                          </button>
                        }
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
              {/* </form> */}
            </>
          ) : (
            <div className="empty-cart text-center">
              <p className="mt-2">Your cart is currently empty.</p>
              <i className="cart-empty d-icon-bag"></i>
              <p className="return-to-shop mb-0">
                <ALink
                  className="button wc-backward btn btn-dark btn-md"
                  href="/collections/all"
                >
                  Return to shop
                </ALink>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function mapStateToProps(state) {
  return {
    cartList: state.cart.data ? state.cart.data : [],
    user: state.user.data,
    customUser: state.user.custom,
    appliedCoupon: state.cart.coupon,
    store: state.system.store,
    metadata: state.system.meta,
    shoppingCartId: state.cart.cartId ? state.cart.cartId : null,
  };
}
const Component = connect(mapStateToProps, {
  emptyCart: cartActions.emptyCart,
  openLogin: modalActions.openPasswordlessModal,
  setCartVisibility: modalActions.setCartVisibility,
  placeOrder: eventActions.placeOrder,
  startCheckout: eventActions.startCheckout,
  openAllAddressModal: modalActions.openAllAddressModal,
  recordOutOfStock: eventActions.outOfStock,
  orderCreated: eventActions.orderCreated,
  addPaymentInfo: eventActions.addPaymentInfo,
  priceMismatch: eventActions.priceMismatch,
  validateCart: cartActions.validateCart,
})(Checkout);

Component.hideFooter = true;
Component.hideChatbot = true;
Component.hideCart = true;
Component.navbarConfig = {
  shippingTier: true,
};

export default Component;
