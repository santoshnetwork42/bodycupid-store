import React, { useCallback, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next");
const KEY_NAME_ESC = "Escape";
const KEY_EVENT_TYPE = "keyup";
const customStyles = {
  content: {
    position: "relative",
  },
  overlay: {
    background: "rgba(0,0,0,.4)",
    zIndex: "10000",
    overflowX: "hidden",
    overflowY: "auto",
  },
};

function CustomModal(props) {
  const {
    isCloseIcon = true,
    allowEsc = true,
    onRequestClose,
    style = customStyles,
    children,
    ...restProps
  } = props;

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);
    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
    };
  }, [handleEscKey]);

  const handleEscKey = useCallback(
    (event) => {
      if (event.key === KEY_NAME_ESC && allowEsc) {
        onRequestClose();
      }
    },
    [onRequestClose, allowEsc]
  );

  return (
    <Modal {...restProps} onRequestClose={onRequestClose} style={style}>
      <>
        {children}
        {isCloseIcon && (
          <button
            title="Close (Esc)"
            type="button"
            className="mfp-close p-0"
            onClick={onRequestClose}
          >
            <span>×</span>
          </button>
        )}
      </>
    </Modal>
  );
}

export default CustomModal;
