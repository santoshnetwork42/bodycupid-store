import { useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.min.css";
import "react-image-lightbox/style.css";
import "react-input-range/lib/css/index.css";

import ALink from "~/components/features/custom-link";

import { UpArrow } from "~/components/icons";
import Header from "~/components/common/header";
import Footer from "~/components/common/footer";
import Passwordless from "~/components/common/partials/passwordless";
import Quickview from "~/components/features/product/common/quickview-modal";
import LoginModal from "~/components/features/modals/login-modal";
import VideoModal from "~/components/features/modals/video-modal";
import MobileMenu from "~/components/common/partials/mobile-menu";

import { modalActions } from "~/store/modal";

import {
  showScrollTopHandler,
  scrollTopHandler,
  stickyHeaderHandler,
  stickyFooterHandler,
  resizeHandler,
} from "~/utils";
import { removeHoverEffect } from "~/utils/helper";
import Announcement from "./common/announcement";
import StickyCheckout from "./common/sticky-checkout";

function Layout({
  children,
  navbar,
  footer,
  closeQuickview,
  closeLogin,
  closePasswordless,
}) {
  const router = useRouter();
  useEffect(() => {
    removeHoverEffect();
  }, []);

  useLayoutEffect(() => {
    document.querySelector("body") &&
      document.querySelector("body").classList.remove("loaded");
  }, [router.pathname]);

  useEffect(() => {
    window.addEventListener("scroll", showScrollTopHandler, { passive: true });
    window.addEventListener("scroll", stickyHeaderHandler, { passive: true });
    window.addEventListener("scroll", stickyFooterHandler, { passive: true });
    window.addEventListener("resize", stickyHeaderHandler);
    window.addEventListener("resize", stickyFooterHandler);
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("scroll", showScrollTopHandler);
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
        <link rel="icon" href="images/icons/favicon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300&display=swap"
          rel="stylesheet"
        ></link>
        {/* <link
          rel="stylesheet"
          type="text/css"
          href="/vendor/riode-fonts/riode-fonts.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/vendor/fontawesome-free/css/all.min.css"
        /> */}
        <link
          rel="stylesheet"
          type="text/css"
          href="vendor/owl-carousel/owl.carousel.min.css"
        />
      </Head>
      <div className="page-wrapper">
        <Announcement showTopRUnner={navbar.showTopRunner} />

        <Header navbar={navbar} />

        {children}

        <StickyCheckout showStickyCheckout={footer.showStickyCheckout} />
        <Footer footer={footer} />
      </div>

      <ALink
        id="scroll-top"
        href="#"
        title="Top"
        role="button"
        className="scroll-top"
        onClick={() => scrollTopHandler(false)}
      >
        <UpArrow size={27} />
      </ALink>

      <MobileMenu />

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

      <Quickview />
      <LoginModal />
      <VideoModal />
      <Passwordless />
    </>
  );
}

export default connect(null, {
  closeQuickview: modalActions.closeQuickview,
  closeLogin: modalActions.closeLoginModal,
  closePasswordless: modalActions.closePasswordlessModal,
})(Layout);
