import React from "react";
import SlideToggle from "react-slide-toggle";

export default function AlertPopup(props) {
  const { message, status } = props;
  switch (status) {
    case "error":
      return (
        <SlideToggle expanded={true}>
          {({ onToggle, setCollapsibleElement }) => (
            <div ref={setCollapsibleElement} className="overflow-hidden">
              <div className="alert alert-danger alert-dark alert-round alert-inline error-height">
                <h4 className="alert-title">{message}</h4>

                <button type="button" className="btn btn-link btn-close">
                  <i className="d-icon-times" onClick={onToggle}></i>
                </button>
              </div>
            </div>
          )}
        </SlideToggle>
      );
    case "success":
      return (
        <SlideToggle expanded={true}>
          {({ onToggle, setCollapsibleElement }) => (
            <div ref={setCollapsibleElement} className="overflow-hidden">
              <div className="alert alert-success alert-dark alert-round alert-inline error-height">
                <h4 className="alert-title">{message}</h4>
                <button type="button" className="btn btn-link btn-close">
                  <i className="d-icon-times" onClick={onToggle}></i>
                </button>
              </div>
            </div>
          )}
        </SlideToggle>
      );
    case "warning":
      return (
        <SlideToggle expanded={true}>
          {({ onToggle, setCollapsibleElement }) => (
            <div ref={setCollapsibleElement} className="overflow-hidden">
              <div className="alert alert-warning alert-dark alert-round alert-inline error-height">
                <h4 className="alert-title">{message}</h4>
                <button type="button" className="btn btn-link btn-close">
                  <i className="d-icon-times" onClick={onToggle}></i>
                </button>
              </div>
            </div>
          )}
        </SlideToggle>
      );
    case "info":
      return (
        <SlideToggle expanded={true}>
          {({ onToggle, setCollapsibleElement }) => (
            <div ref={setCollapsibleElement} className="overflow-hidden">
              <div className="alert alert-primary alert-dark alert-round alert-inline error-height">
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
}
