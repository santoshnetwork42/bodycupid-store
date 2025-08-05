import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect } from "react";
import "react-input-range/lib/css/index.css";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Header from "~/components/common/header";
import { modalActions } from "~/store/modal";
import {
  resizeHandler,
  stickyFooterHandler,
  stickyHeaderHandler,
} from "~/utils";
import { useIsInteractive } from "~/utils/contexts/navbar";
import { removeHoverEffect } from "~/utils/helper";
import { cartActions } from "~/store/cart";
import { useCoupons } from "@wow-star/utils";

const Footer = dynamic(() => import("~/components/common/footer"));
const Passwordless = dynamic(
  () => import("~/components/common/partials/passwordless"),
  { ssr: false }
);
const Quickview = dynamic(
  () => import("~/components/features/product/common/quickview-modal"),
  { ssr: false }
);
const LoginModal = dynamic(
  () => import("~/components/features/modals/login-modal"),
  { ssr: false }
);
const MobileMenu = dynamic(
  () => import("~/components/common/partials/mobile-menu"),
  { ssr: false }
);
const Announcement = dynamic(() => import("~/components/common/announcement"), {
  ssr: false,
});
const Timer = dynamic(() => import("~/components/common/countDownTimer"), {
  ssr: false,
});
const StickyCheckout = dynamic(
  () => import("~/components/common/sticky-checkout"),
  { ssr: false }
);
const CouponDiscountBar = dynamic(
  () => import("~/components/common/coupon-discount-bar"),
  { ssr: false }
);

function Layout({
  children,
  navbar,
  footer,
  hideHeader,
  closeQuickview,
  closeLogin,
  closePasswordless,
  storeCoupon,
  updateCartCoupon,
  appliedCoupon,
}) {
  const router = useRouter();
  const isInteractive = useIsInteractive();
  const coupons = useCoupons();

  const couponCode = router?.query?.couponCode?.split("&")[0];
  if (couponCode) {
    const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000;
    storeCoupon({
      couponCode: (couponCode || "").toLocaleUpperCase(),
      couponExpiry: expiryTime,
    });
  }

  useEffect(() => {
    removeHoverEffect();
  }, []);

  useEffect(() => {
    if (!!coupons?.length) {
      const updatedCoupon = coupons?.find(
        (c) => c.code === appliedCoupon?.code
      );
      updateCartCoupon(updatedCoupon || null);
    }
  }, [coupons]);

  useLayoutEffect(() => {
    document.querySelector("body") &&
      document.querySelector("body").classList.remove("loaded");
  }, [router.pathname]);

  useEffect(() => {
    window.addEventListener("scroll", stickyHeaderHandler, { passive: true });
    window.addEventListener("scroll", stickyFooterHandler, { passive: true });
    window.addEventListener("resize", stickyHeaderHandler);
    window.addEventListener("resize", stickyFooterHandler);
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("scroll", stickyHeaderHandler);
      window.removeEventListener("scroll", stickyFooterHandler);
      window.removeEventListener("resize", stickyHeaderHandler);
      window.removeEventListener("resize", stickyFooterHandler);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    closeQuickview();
    closeLogin();
    closePasswordless();

    let bodyClasses = [...document.querySelector("body").classList];
    for (let i = 0; i < bodyClasses.length; i++) {
      document.querySelector("body").classList.remove(bodyClasses[i]);
    }

    setTimeout(() => {
      document.querySelector("body").classList.add("loaded");
    }, 50);
  }, [router.pathname]);
  return (
    <>
      <Head>
        <link rel="icon" href="/images/icons/favicon.png" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />

        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300&display=swap"
          rel="stylesheet"
        />
        {/* <link
          rel="stylesheet"
          type="text/css"
          href="/vendor/owl-carousel/owl.carousel.min.css"
        /> */}
      </Head>
      <div className="page-wrapper">
        {!hideHeader && isInteractive && (
          <Timer displayTimer={navbar.showTimer} />
        )}
        {!hideHeader && isInteractive && (
          <Announcement showTopRunner={navbar.showTopRunner} />
        )}

        <Header navbar={navbar} hideHeader={hideHeader} />

        {children}

        <StickyCheckout showStickyCheckout={footer.showStickyCheckout} />
        <Footer footer={footer} />
      </div>

      {!hideHeader && <MobileMenu />}
      <ToastContainer
        autoClose={3000}
        duration={300}
        newestOnTo={true}
        className="toast-container"
        position="bottom-left"
        closeButton={false}
        hideProgressBar={true}
        newestOnTop={true}
      />

      {!!navbar.couponBanner && <CouponDiscountBar />}

      <Quickview />
      <LoginModal />
      <Passwordless />
    </>
  );
}

function mapStateToProps(state) {
  return {
    appliedCoupon: state.cart.coupon,
  };
}
export default connect(mapStateToProps, {
  closeQuickview: modalActions.closeQuickview,
  closeLogin: modalActions.closeLoginModal,
  closePasswordless: modalActions.closePasswordlessModal,
  storeCoupon: cartActions.storeCoupon,
  updateCartCoupon: cartActions.updateCartCoupon,
})(Layout);
