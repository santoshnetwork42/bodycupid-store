import React from "react";
import { CloseIcon } from "~/components/icons";

const BottomDrawer = ({
  title,
  description,
  isOpen,
  onClose,
  children,
  maxHeight,
  showOverlay,
}) => {
  return (
    <>
      {showOverlay && (
        <div className="drawer-overlay" onClick={onClose}></div> // Overlay div
      )}
      
      <div className={`drawer ${isOpen ? "open" : ""}`}>
        <div
          className="drawer-content"
          style={{ maxHeight: `${maxHeight}rem` }}
        >
          <div className="drawer-header-wrapper">
            <div className="d-flex-col gap-2">
              <div className="drawer-header">{title}</div>
              <div>{description}</div>
            </div>
            <button className="close-btn" onClick={onClose}>
              <CloseIcon color="grey" size={28} />
            </button>
          </div>
          <div className="drawer-body">{children}</div>
        </div>
      </div>
    </>
  );
};

export default BottomDrawer;
