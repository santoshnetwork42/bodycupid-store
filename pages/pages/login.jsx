import React, { useCallback, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import ALink from "~/components/features/custom-link";

function Login() {
  const router = useRouter();
  const [state, setState] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmationCode: null,
  });

  const [confirmSignUp, setConfirmSignUp] = useState(null);

  const handleSignup = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await Auth.signUp({
          username: state.phone,
          password: state.password,
          phone_number: state.phone,
          email: state.email,
          attributes: {
            name: state.name,
            given_name: state.name,
            middle_name: state.name,
            email: state.email,
          },
          autoSignIn: {
            // optional - enables auto sign in after user is confirmed
            enabled: true,
          },
        });
        setConfirmSignUp("SIGNUP");
      } catch (error) {
        console.log("error signing up:", error);
        toast.error(error.message);
      }
      return false;
    },
    [state]
  );

  const handleConfirmSignUp = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await Auth.confirmSignUp(state.phone, state.confirmationCode);
        if (confirmSignUp === "SIGNUP") {
          router.push("/");
        } else {
          setConfirmSignUp(null);
        }
      } catch (error) {
        console.log("error signup confirm:", error);
        toast.error(error.message);
      }
      return false;
    },
    [state, confirmSignUp]
  );

  const handleSignIn = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await Auth.signIn({
          username: state.phone,
          password: state.password,
        });
        router.push("/");
      } catch (error) {
        console.log("error signin:", error);
        if (error.code === "UserNotConfirmedException") {
          await Auth.resendSignUp(state.phone);
          setConfirmSignUp("SIGNIN");
        } else {
          toast.error(error.message);
        }
      }
      return false;
    },
    [state]
  );

  useEffect(() => {
    (async function () {
      const session = await Auth.currentAuthenticatedUser().catch(() => null);
      if (session) {
        router.push("/");
      }
    })();
  }, []);

  return (
    <main className="main">
      <Helmet>
        <title>Wow React eCommerce Template | Login</title>
      </Helmet>

      <h1 className="d-none">Wow React eCommerce Template - Login</h1>
      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <ALink href="/">
                <i className="d-icon-home"></i>
              </ALink>
            </li>
            <li>
              <ALink href="/shop">Wow Shop</ALink>
            </li>
            <li>My Account</li>
          </ul>
        </div>
      </nav>
      <div className="page-content mt-6 pb-2 mb-10">
        <div className="container">
          <div className="login-popup">
            <div className="form-box">
              <div className="tab tab-nav-simple tab-nav-boxed form-tab">
                <Tabs
                  selectedTabClassName="active"
                  selectedTabPanelClassName="active"
                >
                  <TabList className="nav nav-tabs nav-fill align-items-center border-no justify-content-center mb-5">
                    <Tab className="nav-item">
                      <span className="nav-link border-no lh-1 ls-normal">
                        Sign in
                      </span>
                    </Tab>
                    <li className="delimiter">or</li>
                    <Tab className="nav-item">
                      <span className="nav-link border-no lh-1 ls-normal">
                        Register
                      </span>
                    </Tab>
                  </TabList>

                  <div className="tab-content">
                    <TabPanel className="tab-pane">
                      {!confirmSignUp && (
                        <form onSubmit={handleSignIn}>
                          <div className="form-group mb-3">
                            <input
                              type="tel"
                              className="form-control"
                              id="singin-phone-2"
                              name="singin-phone"
                              placeholder="Username or Phone number *"
                              required
                              value={state.phone}
                              onChange={(e) =>
                                setState({
                                  ...state,
                                  phone: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control"
                              id="singin-password-2"
                              placeholder="Password *"
                              name="singin-password"
                              required
                              value={state.password}
                              onChange={(e) =>
                                setState({
                                  ...state,
                                  password: e.target.value,
                                })
                              }
                            />
                          </div>
                          {/* <div className="form-footer">
                            <div className="form-checkbox">
                              <input
                                type="checkbox"
                                className="custom-checkbox"
                                id="signin-remember-2"
                                name="signin-remember"
                              />
                              <label
                                className="form-control-label"
                                htmlFor="signin-remember-2"
                              >
                                Remember me
                              </label>
                            </div>
                            <ALink href="#" className="lost-link">
                              Lost your password?
                            </ALink>
                          </div> */}
                          <button
                            className="btn btn-dark btn-block btn-rounded"
                            type="submit"
                          >
                            Login
                          </button>
                        </form>
                      )}
                      {/* <div className="form-choice text-center">
                        <label className="ls-m">or Login With</label>
                        <div className="social-links">
                          <ALink
                            href="#"
                            className="social-link social-google fab fa-google border-no"
                          ></ALink>
                          <ALink
                            href="#"
                            className="social-link social-facebook fab fa-facebook-f border-no"
                          ></ALink>
                          <ALink
                            href="#"
                            className="social-link social-twitter fab fa-twitter border-no"
                          ></ALink>
                        </div>
                      </div> */}
                    </TabPanel>

                    <TabPanel className="tab-pane">
                      {!confirmSignUp && (
                        <form onSubmit={handleSignup}>
                          <div className="form-group">
                            <label htmlFor="register-name-2">Your name:</label>
                            <input
                              type="text"
                              className="form-control"
                              id="register-name-2"
                              name="register-name"
                              placeholder="Your name *"
                              required
                              value={state.name}
                              onChange={(e) =>
                                setState({
                                  ...state,
                                  name: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="register-phone-2">
                              Your phone number:
                            </label>
                            <input
                              type="tel"
                              className="form-control"
                              id="register-phone-2"
                              name="register-phone"
                              placeholder="Your phone number *"
                              required
                              value={state.phone}
                              onChange={(e) =>
                                setState({
                                  ...state,
                                  phone: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="register-email-2">
                              Your email address:
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="register-email-2"
                              name="register-email"
                              placeholder="Your email address*"
                              required
                              value={state.email}
                              onChange={(e) =>
                                setState({
                                  ...state,
                                  email: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="register-password-2">
                              Password:
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="register-password-2"
                              name="register-password"
                              placeholder="Password *"
                              required
                              value={state.password}
                              onChange={(e) =>
                                setState({
                                  ...state,
                                  password: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form-footer">
                            <div className="form-checkbox">
                              <input
                                type="checkbox"
                                className="custom-checkbox"
                                id="register-agree-2"
                                name="register-agree"
                                required
                              />
                              <label
                                className="form-control-label"
                                htmlFor="register-agree-2"
                              >
                                I agree to the privacy policy
                              </label>
                            </div>
                          </div>
                          <button
                            className="btn btn-dark btn-block btn-rounded"
                            type="submit"
                          >
                            Register
                          </button>
                        </form>
                      )}
                      {/* <div className="form-choice text-center">
                        <label className="ls-m">or Register With</label>
                        <div className="social-links">
                          <ALink
                            href="#"
                            className="social-link social-google fab fa-google border-no"
                          ></ALink>
                          <ALink
                            href="#"
                            className="social-link social-facebook fab fa-facebook-f border-no"
                          ></ALink>
                          <ALink
                            href="#"
                            className="social-link social-twitter fab fa-twitter border-no"
                          ></ALink>
                        </div>
                      </div> */}
                    </TabPanel>

                    {confirmSignUp && (
                      <form onSubmit={handleConfirmSignUp}>
                        <div className="form-group">
                          <label htmlFor="confirm-code-2">
                            Confirmation Code:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="confirm-code-2"
                            name="confirm-code"
                            placeholder="Confirmation Code *"
                            required
                            value={state.confirmationCode}
                            onChange={(e) =>
                              setState({
                                ...state,
                                confirmationCode: e.target.value,
                              })
                            }
                          />
                        </div>
                        <button
                          className="btn btn-dark btn-block btn-rounded"
                          type="submit"
                        >
                          Confirm
                        </button>
                      </form>
                    )}
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default React.memo(Login);
