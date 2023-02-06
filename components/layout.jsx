import { useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.min.css";
import "react-image-lightbox/style.css";
import "react-input-range/lib/css/index.css";

import ALink from "~/components/features/custom-link";

import Header from "~/components/common/header";
import Footer from "~/components/common/footer";
import StickyFooter from "~/components/common/sticky-footer";
import Quickview from "~/components/features/product/common/quickview-modal";
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

function Layout({ children, closeQuickview }) {
  const router = useRouter();

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
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900;SegoeScript:700&display=swap"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/vendor/riode-fonts/riode-fonts.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/vendor/fontawesome-free/css/all.min.css"
        />
      </Head>
      <div className="page-wrapper">
        <Header />

        {children}

        <Footer />

        <StickyFooter />
      </div>

      <ALink
        id="scroll-top"
        href="#"
        title="Top"
        role="button"
        className="scroll-top"
        onClick={() => scrollTopHandler(false)}
      >
        <i className="d-icon-arrow-up"></i>
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

      <VideoModal />
    </>
  );
}

export default connect(null, { closeQuickview: modalActions.closeQuickview })(
  Layout
);
