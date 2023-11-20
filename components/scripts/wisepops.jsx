import React, { useCallback, useEffect, useMemo, useState } from "react";
import Script from "next/script";
import { connect } from "react-redux";
import { alertToaster } from "~/utils/popupHelper";
import { WISEPOPS_KEY } from "~/config";

import { modalActions } from "~/store/modal";
import { useUpdateUserCoupon } from "~/utils/contexts/navbar";

function Wisepops({ user, openLogin, showTopRunner }) {
  const [isBeforeFormSubmitListenerAdded, setIsBeforeFormSubmitListenerAdded] =
    useState(false);
  const [isAfterFormSubmitListenerAdded, setIsAfterFormSubmitListenerAdded] =
    useState(false);

  const [, updateCoupon] = useUpdateUserCoupon();

  const beforeFormSubmitHandler = useCallback(
    (event) => {
      if (!user) {
        event.detail.popup
          .getElement("wisepops-close")
          .querySelector("button.wisepops-close")
          .click();
        event.detail.target
          .querySelector("button")
          .setCustomValidity("Please login");
        openLogin(false);
      } else {
        event.detail.target.querySelector("button").setCustomValidity("");
      }
    },
    [user]
  );

  const afterFormSubmitHandler = (event) => {
    if (
      event.detail.target.elements["coupon"].value !== "BETTER LUCK NEXT TIME"
    ) {
      updateCoupon(event.detail.target.elements["coupon"].value);
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
      {!!showTopRunner && (
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
export default connect(mapStateToProps, {
  openLogin: modalActions.openPasswordlessModal,
})(Wisepops);
