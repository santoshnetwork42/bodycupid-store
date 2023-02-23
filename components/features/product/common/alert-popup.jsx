import React from "react";
import SlideToggle from "react-slide-toggle";

const className = {
  error: "alert-danger",
  success: "alert-success",
  warning: "alert-warning",
  info: "alert-primary",
};

export default function AlertPopup(props) {
  const { message, status } = props;
  return (
    <SlideToggle expanded={true}>
      {({ onToggle, setCollapsibleElement }) => (
        <div ref={setCollapsibleElement} className="overflow-hidden">
          <div
            className={`alert ${className[status]} alert-dark alert-round alert-inline error-height`}
          >
            <h4 className="alert-title">{message}</h4>

            <button type="button" className="btn btn-link btn-close">
              <i className="d-icon-times" onClick={onToggle}></i>
            </button>
          </div>
        </div>
      )}
    </SlideToggle>
  );
}
