import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";

import ALink from "~/components/features/custom-link";
import { useRouter } from "next/router";
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

function LoginModal({ auth }) {
  const [showLogin, setShowLogin] = useState(false);
  const { pathname } = useRouter();
  useEffect(() => {
    if (pathname === "/pages/forgot-password" && showLogin) {
      setShowLogin(false)
    }
  }, [pathname])

  if (auth) {
    return (
      <>
        <a className="login-link d-lg-show" href="/pages/account">
          <i className="d-icon-user"></i>Account
        </a>
      </>
    );
  }

  return (
    <>
      <ALink
        href="#"
        className="login-link d-lg-show"
        onClick={() => {
          setShowLogin(true);
          return false;
        }}
      >
        <i className="d-icon-user"></i>Sign in
      </ALink>
      <span className="delimiter">/</span>
      <ALink
        href="#"
        className="register-link ml-0"
        onClick={() => {
          setShowLogin(true);
          return false;
        }}
      >
        Register
      </ALink>

      <Modal
        isOpen={showLogin}
        style={modalStyles}
        onRequestClose={() => setShowLogin(false)}
        shouldReturnFocusAfterClose={false}
        overlayClassName="auth-modal-overlay"
        className="auth-popup bg-img"
      >
        <AuthView />
      </Modal>
    </>
  );
}

function mapStateToProps(state) {
  return {
    auth: !!state.user.data,
  };
}

export default connect(mapStateToProps, {})(LoginModal);
