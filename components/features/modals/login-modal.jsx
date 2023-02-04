import React, { useEffect, useState } from "react";
import { Auth, Hub } from "aws-amplify";
import Modal from "react-modal";
import ALink from "~/components/features/custom-link";

import AuthView from "../../../pages/pages/login";

const loggedInEvents = ["signIn", "confirmSignUp", "autoSignIn"];
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

function LoginModal() {
  const [auth, setAuth] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    (async function () {
      const session = await Auth.currentAuthenticatedUser().catch(() => null);
      setAuth(!!session);
    })();

    Hub.listen("auth", ({ payload: { event } }) => {
      if (event === "signOut") {
        setAuth(false);
      } else if (loggedInEvents.includes(event)) {
        setAuth(true);
      }
    });
  }, []);

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

export default LoginModal;
