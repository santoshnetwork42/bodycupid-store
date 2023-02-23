import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";

import { modalActions } from "~/store/modal";

import AuthView from "../../../pages/pages/login";

const modalStyles = {
  content: {
    position: "relative",
  },
  overlay: {
    background: "rgba(0,0,0,.4)",
    overflowX: "hidden",
    overflowY: "auto",
    display: "flex",
  },
};

Modal.setAppElement("#__next");

function LoginModal({ isOpen, redirect = true, closeLoginModal }) {
  console.log(isOpen);
  if (!isOpen) return <></>;

  return (
    <Modal
      isOpen={isOpen}
      style={modalStyles}
      onRequestClose={() => closeLoginModal()}
      shouldReturnFocusAfterClose={false}
      overlayClassName="auth-modal-overlay"
      className="auth-popup bg-img"
    >
      <AuthView redirect={redirect} />
    </Modal>
  );
}

function mapStateToProps(state) {
  return {
    auth: !!state.user.data,
    isOpen: state.modal.login,
    redirect: state.modal.loginRedirect,
  };
}

export default connect(mapStateToProps, {
  closeLoginModal: modalActions.closeLoginModal,
})(LoginModal);
