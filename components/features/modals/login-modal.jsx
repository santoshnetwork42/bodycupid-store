import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import { Auth } from "aws-amplify";

Modal.setAppElement("#__next");

function LoginModal() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    (async function () {
      const session = await Auth.currentAuthenticatedUser().catch(() => null);
      setAuth(!!session);
    })();
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
      <a className="login-link d-lg-show" href="/pages/login">
        <i className="d-icon-user"></i>Sign in
      </a>
      <span className="delimiter">/</span>
      <a className="register-link ml-0" href="/pages/login">
        Register
      </a>
    </>
  );
}

export default LoginModal;
