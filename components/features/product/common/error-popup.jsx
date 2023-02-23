import React from "react";
import SlideToggle from "react-slide-toggle";

export default function ErrorPopup(props) {
  const { message } = props;

  return (
    <SlideToggle expanded={true}>
      {({ onToggle, setCollapsibleElement }) => (
        <div ref={setCollapsibleElement} className="overflow-hidden">
          <div className="alert alert-danger alert-dark alert-round alert-inline error-height">
            <h4 className="alert-title">Error : </h4>
            {message}
            <button type="button" className="btn btn-link btn-close">
              <i className="d-icon-times" onClick={onToggle}></i>
            </button>
          </div>
        </div>
      )}
    </SlideToggle>
  );
}
