import { useUpdateUserCoupon } from "@wow-star/utils";
import { useAppRouter } from "~/utils/navigation";
import Script from "next/script";
import { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";

import { STORE_ID, WISEPOPS_KEY } from "~/config";
import { alertToaster } from "~/utils/popupHelper";

function Wisepops({ user }) {
  const [isBeforeFormSubmitListenerAdded, setIsBeforeFormSubmitListenerAdded] =
    useState(false);
  const [isAfterFormSubmitListenerAdded, setIsAfterFormSubmitListenerAdded] =
    useState(false);

  const router = useRouter();

  const isBlogPage = router.asPath.includes("blog");

  useEffect(() => {
    const wootBubbleHolder =
      document && document.querySelector("#wisepops-root");
    if (wootBubbleHolder) {
      if (!isBlogPage) {
        wootBubbleHolder.classList.remove("woot--bubble-holder-hidden");
      } else {
        wootBubbleHolder.classList.add("woot--bubble-holder-hidden");
      }
    }
  }, [router.asPath]);

  const [, updateUserCoupon] = useUpdateUserCoupon();

  const beforeFormSubmitHandler = useCallback((event) => {
    event.detail.target.querySelector("button").setCustomValidity("");
  }, []);

  const afterFormSubmitHandler = (event) => {
    if (
      event.detail.target.elements["coupon"].value !== "BETTER LUCK NEXT TIME"
    ) {
      updateUserCoupon(event.detail.target.elements["coupon"].value, STORE_ID);
      alertToaster("Your coupon has been availed", "success");
    }
  };

  useEffect(() => {
    if (!isAfterFormSubmitListenerAdded) {
      setIsAfterFormSubmitListenerAdded(true);
      window.addEventListener(
        "wisepops.after-form-submit",
        afterFormSubmitHandler,
        { passive: true }
      );
    }

    if (!isBeforeFormSubmitListenerAdded) {
      setIsBeforeFormSubmitListenerAdded(true);
      window.addEventListener(
        "wisepops.before-form-submit",
        beforeFormSubmitHandler,
        { passive: true }
      );
    }
  }, [isAfterFormSubmitListenerAdded, isBeforeFormSubmitListenerAdded]);

  useEffect(() => {
    return () => {
      window.removeEventListener(
        "wisepops.before-form-submit",
        beforeFormSubmitHandler
      );
      setIsBeforeFormSubmitListenerAdded(false);

      window.removeEventListener(
        "wisepops.after-form-submit",
        afterFormSubmitHandler
      );
      setIsAfterFormSubmitListenerAdded(false);
    };
  }, [user]);

  return (
    <>
      {!isBlogPage && (
        <Script
          data-cfasync="false"
          src={`https://wisepops.net/loader.js?v=2&h=${WISEPOPS_KEY}`}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
  };
}
export default connect(mapStateToProps, {})(Wisepops);
