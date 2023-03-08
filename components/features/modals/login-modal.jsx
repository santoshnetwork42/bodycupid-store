import React from "react";
import { connect } from "react-redux";

import { modalActions } from "~/store/modal";
import AuthView from "~/pages/pages/login";
import Modal from "~/components/common/modal";

function LoginModal({ isOpen, redirect = true, closeLoginModal }) {
  if (!isOpen) return <></>;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => closeLoginModal()}
      shouldReturnFocusAfterClose={false}
      overlayClassName="auth-modal-overlay"
      className="auth-popup bg-img"
    >
      <AuthView redirect={redirect} showOTPLogin />
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
