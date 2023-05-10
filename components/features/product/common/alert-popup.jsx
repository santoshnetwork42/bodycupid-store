import React from "react";
import SlideToggle from "react-slide-toggle";

import { Close } from "~/components/icons";

const className = {
  error: "alert-danger",
  success: "alert-success",
  warning: "alert-warning",
  info: "alert-primary",
  transparent: "alert-transparent",
};

const colorMapping = {
  error: "#ffa372",
  success: "#ffa372",
  warning: "#ffa372",
  info: "#ffa372",
  transparent: "#ffa372",
};

export default function AlertPopup(props) {
  const { message, status, onClick } = props;

  if (!onClick) {
    return (
      <div
        className={`alert ${className[status]} alert-round alert-dark alert-inline error-height`}
      >
        <h4 className="alert-title font-weight-semi-bold">{message}</h4>
      </div>
    );
  }

  return (
    <SlideToggle expanded={true}>
      {({ onToggle, setCollapsibleElement }) => (
        <div ref={setCollapsibleElement} className="overflow-hidden">
          <div
            className={`alert ${className[status]} alert-round alert-dark alert-inline error-height`}
          >
            <h4 className="alert-title font-weight-semi-bold">{message}</h4>

            <button
              type="button"
              className="btn btn-link btn-close"
              onClick={(e) => {
                e?.stopPropagation();
                onToggle();
                onClick();
              }}
            >
              <Close color={colorMapping[status]} size={18} />
            </button>
          </div>
        </div>
      )}
    </SlideToggle>
  );
}
