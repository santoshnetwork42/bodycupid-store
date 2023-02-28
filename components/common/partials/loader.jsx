import React from "react";
import ReactModal from "react-modal";

const Loader = ({ loading }) => {
  const modalStyles = {
    content: {
      position: "relative",
    },
    overlay: {
      background: "transplant",
      overflowX: "hidden",
      overflowY: "auto",
      display: "flex",
    },
    boxShadow:'none'
  };

  return (
      <ReactModal
        style={modalStyles}
        overlayClassName="auth-modal-overlay common-loader-wrapper"
        className="auth-popup bg-img"
        isOpen={loading}
      >
        <div className="common-loading-overlay"></div>
      </ReactModal>
  );
};

export default Loader;
