import React, { useCallback, useEffect, useState } from "react";
import { connect, useStore } from "react-redux";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { Auth, API } from "aws-amplify";
import { useRouter } from "next/router";
import { Logger } from "aws-amplify";
import delay from "delay";

import { addPhonePrefix, removePhonePrefix } from "~/utils/helper";
import getRandomString from "~/utils/getRandomString";
import { errorHandler } from "~/utils/errorHandler";
import { alertToaster } from "~/utils/popupHelper";

import { modalActions } from "~/store/modal";
import { userActions } from "~/store/user";

import Modal from "~/components/common/modal";
import ALink from "~/components/features/custom-link";

import {
  ensureUserAndDispatchOTP,
  getUser,
  verifyCustomOTP,
} from "~/graphql/api";
import { eventActions } from "~/store/events";
import useWindowDimensions from "~/utils/getWindowDimension";
import fetchData from "~/utils/fetchData";
import { STORE_ID } from "~/config";
import BottomDrawer from "~/components/common/bottomDrawer";
import AlertPopup from "~/components/features/product/common/alert-popup";
import { toast } from "react-toastify";

const logger = new Logger("Login-without-password");

function Passwordless({
  auth,
  isOpen,
  closeModal,
  forceOpen,
  redirect,
  setUser,
  login,
  OtpRequested,
  setCustomUser,
  customSignup,
  customSignupProp,
}) {
  const forceCustomSignup = !!(customSignup || customSignupProp);

  const router = useRouter();
  const { query } = router;
  const { isSmallSize: isMobile } = useWindowDimensions();

  const [state, setState] = useState({
    phone: "",
    confirmationCode: new Array(6).fill(""),
  });

  const store = useStore();

  const [confirmSignUp, setConfirmSignUp] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    let timer;
    if (seconds) {
      timer = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }
    return () => {
      timer && clearInterval(timer);
    };
  }, [seconds]);

  useEffect(() => {
    if (!isOpen) {
      setState({ phone: "", confirmationCode: new Array(6).fill("") });
      setConfirmSignUp(null);
      setCurrentUser(null);
      setOtpError(false);
    }
  }, [isOpen]);

  const handleSignup = useCallback(async () => {
    try {
      await Auth.signUp({
        username: addPhonePrefix(state.phone),
        password: getRandomString(30),
        phone_number: addPhonePrefix(state.phone),
        attributes: {
          // name: "",
          // given_name: "",
          // middle_name: "",
          phone_number: addPhonePrefix(state.phone),
        },
        autoSignIn: {
          enabled: true,
        },
      });
      setSeconds(30);
      setConfirmSignUp("SIGNUP");
      // login( )
    } catch (error) {
      logger.error("error signing up:", error);
      alertToaster(error.message, "error");
    }
    return false;
  }, [state]);

  const handleConfirmSignUp = useCallback(
    async (e) => {
      e?.preventDefault();
      setLoading(true);
      try {
        if (confirmSignUp === "SIGNUP") {
          await Auth.confirmSignUp(
            addPhonePrefix(state.phone),
            state.confirmationCode.join("")
          );

          await delay(2000);
          const user = await Auth.currentAuthenticatedUser().catch(() => null);
          logger.info("User", user);

          if (user?.attributes?.sub) {
            const {
              data: { getUser: getUserResponse },
            } = await API.graphql({
              query: getUser,
              authMode: "AMAZON_COGNITO_USER_POOLS",
            });
            const { sub, phone_number } = user?.attributes;
            store.dispatch(
              eventActions.auth("signup", { userId: sub, phone: phone_number })
            );

            await setUser(getUserResponse);
          }

          closeModal();
          if (redirect) router.push("/pages/checkout");
        } else if (confirmSignUp === "CUSTOM_SIGN_IN") {
          const response = await fetchData(verifyCustomOTP, {
            storeId: STORE_ID,
            phone: addPhonePrefix(state.phone),
            otp: state.confirmationCode.join(""),
          });

          const { isVerified } = response?.verifyCustomOTP;

          if (isVerified) {
            setCustomUser(state.phone);
            closeModal();
            store.dispatch(
              eventActions.auth("signup", {
                userId: null,
                phone: addPhonePrefix(state.phone),
              })
            );
            if (redirect) router.push("/pages/checkout");
          } else {
            setOtpError(true);
          }
        } else {
          const { signInUserSession } = await Auth.sendCustomChallengeAnswer(
            currentUser,
            state.confirmationCode.join("")
          );
          if (!!signInUserSession) {
            const { sub } = signInUserSession.accessToken.payload;
            store.dispatch(eventActions.auth("login", { userId: sub }));

            closeModal();
            if (redirect) router.push("/pages/checkout");
          } else {
            setOtpError(true);
          }
        }
        toast(
          <AlertPopup message={"Logged In Successfully"} status="success" />,
          {
            position: "top-center",
            autoClose: 2000,
          }
        );
      } catch (error) {
        logger.error(error);
        errorHandler(error);
        setOtpError(true);
      }
      setLoading(false);
      return false;
    },
    [state, confirmSignUp, currentUser, closeModal, redirect]
  );

  const handleSignIn = useCallback(
    async (e) => {
      e?.preventDefault();
      setLoading(true);
      try {
        const cu = await Auth.signIn({
          username: addPhonePrefix(state.phone),
        });
        setCurrentUser(cu);
        setConfirmSignUp("SIGNIN");
        setSeconds(30);
        setLoading(false);
      } catch (error) {
        logger.error("error in signin:", error);
        if (error.code === "UserNotConfirmedException") {
          await Auth.resendSignUp(addPhonePrefix(state.phone));
          setConfirmSignUp("SIGNUP");
        } else if (error.code === "UserNotFoundException") {
          if (!forceCustomSignup) {
            await handleSignup();
          } else {
            const response = await fetchData(ensureUserAndDispatchOTP, {
              storeId: STORE_ID,
              phone: addPhonePrefix(state.phone),
            });
            const { isExistingUser } = response?.ensureUserAndDispatchOTP;

            setSeconds(30);
            if (isExistingUser) {
              await handleSignup();
            } else {
              setConfirmSignUp("CUSTOM_SIGN_IN");
            }
          }
        } else {
          alertToaster(error.message, "error");
        }
        setLoading(false);
      }
      return false;
    },
    [state, handleSignup]
  );

  useEffect(() => {
    closeModal();
  }, [auth]);

  useEffect(() => {
    const input = document.querySelector("#otp1");
    if (input) {
      input.focus();
    }
  }, [isOpen, confirmSignUp]);

  useEffect(() => {
    let ac;
    if (
      confirmSignUp &&
      typeof window !== "undefined" &&
      "OTPCredential" in window
    ) {
      ac = new AbortController();
      navigator?.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((otp) => {
          setState({
            ...state,
            confirmationCode: otp.code.split(""),
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }

    return () => {
      if (ac) ac.abort();
    };
  }, [confirmSignUp]);

  useEffect(() => {
    if (state.confirmationCode.join("").length === 6) {
      handleConfirmSignUp();
    }
  }, [state.confirmationCode]);

  const handleChange = useCallback(
    (ele, index) => {
      const { value } = ele;
      if (value?.length <= 1) {
        setState({
          ...state,
          confirmationCode: [
            ...state.confirmationCode.map((o, i) => (i === index ? value : o)),
          ],
        });
      } else if (value?.length > 1) {
        const otpArray = value.split("");
        setState({
          ...state,
          confirmationCode: Array(6)
            .fill("")
            .map((_x, i) => otpArray[i] || ""),
        });
      }
    },
    [state]
  );

  const inputFocus = (ele) => {
    if (ele.key === "Delete" || ele.key === "Backspace") {
      ele.target?.previousSibling?.focus();
    } else {
      ele.target?.nextSibling?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("Text");
    const otpArray = pastedData.split("");
    setState({
      ...state,
      confirmationCode: Array(6)
        .fill("")
        .map((_x, i) => otpArray[i] || ""),
    });
  };

  const handleEvent = () => {
    OtpRequested();
  };

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return isMobile ? (
    <div>
      {(forceOpen || isOpen) && (
        <BottomDrawer
          title={!confirmSignUp ? "Sign In" : "OTP Verification"}
          isOpen={forceOpen || isOpen}
          onClose={closeModal}
          maxHeight={40}
          showOverlay
        >
          {/* Pass any content as children */}
          <div className="page-content pb-2 bg-white">
            <div className="container p-0">
              <div className="">
                <div className="form-box">
                  <div className="tab tab-nav-simple tab-nav-boxed form-tab">
                    <Tabs
                      selectedTabClassName="active"
                      selectedTabPanelClassName="active"
                    >
                      <p className="mb-0">
                        {confirmSignUp ? "" : "Mobile Number*"}
                      </p>

                      <div className="mt-2">
                        {!confirmSignUp && (
                          <form onSubmit={handleSignIn}>
                            <div className="form-group mb-3">
                              <div className="input-tel">
                                <div className="prefix">+91</div>
                                <input
                                  type="tel"
                                  className="form-control mobile-number-input mb-0"
                                  id="singin-phone-2"
                                  name="singin-phone"
                                  placeholder="Phone number"
                                  required
                                  maxLength={10}
                                  value={removePhonePrefix(state.phone)}
                                  onChange={(e) => {
                                    setState({
                                      ...state,
                                      phone: (e.target.value || "")
                                        ?.replaceAll(/[^0-9]+/g, "")
                                        ?.trim(),
                                    });
                                  }}
                                />
                              </div>
                            </div>

                            <button
                              className="btn btn-primary btn-block btn-rounded d-flex justify-content-center align-items-center"
                              type="submit"
                              disabled={loading}
                              onClick={handleEvent}
                            >
                              Get OTP
                              {loading && <div className="spin-loader ml-2" />}
                            </button>
                          </form>
                        )}

                        {confirmSignUp && (
                          <form onSubmit={handleConfirmSignUp}>
                            <div className="form-group mb-1">
                              <label
                                htmlFor="confirm-code-2"
                                className="number-otp-label"
                              >
                                Enter 6-Digit OTP sent to +91{state.phone}
                              </label>
                            </div>
                            <div className="d-flex justify-content-between gap-4 otp-container mb-3">
                              {state.confirmationCode.map((ele, index) => (
                                <input
                                  key={index}
                                  id={`otp${index + 1}`}
                                  name={`otp${index + 1}`}
                                  type="number"
                                  autoComplete="one-time-code"
                                  className="border-regular drawer-otp-input"
                                  value={ele}
                                  maxLength={1}
                                  onChange={(e) => {
                                    handleChange(e.target, index);
                                  }}
                                  onFocus={(e) => e.target.select()}
                                  onKeyUp={(e) => inputFocus(e, index)}
                                  onPaste={handlePaste}
                                />
                              ))}
                            </div>
                            {otpError && (
                              <div className="overflow-hidden mb-4">
                                <div className="alert alert-danger alert-summary alert-light alert-message alert-inline m-0">
                                  OTP invalid, please try again.
                                </div>
                              </div>
                            )}
                            {/* <button
                            className="btn btn-primary btn-block btn-rounded d-flex justify-content-center align-items-center"
                            type="submit"
                            disabled={loading}
                          >
                            Confirm
                            {loading && <div className="spin-loader ml-2" />}
                          </button> */}
                            {!seconds ? (
                              <ALink href="#" onClick={handleSignIn}>
                                <p className="resend-label mt-2">
                                  Didn't get the code? Resend OTP
                                </p>
                              </ALink>
                            ) : (
                              <p className="not-receive-otp-label mt-2 mb-0">
                                Didn't receive it? Resend in {seconds}
                              </p>
                            )}
                          </form>
                        )}
                      </div>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BottomDrawer>
      )}
    </div>
  ) : (
    <Modal
      isOpen={forceOpen || isOpen}
      isCloseIcon={!forceOpen}
      onRequestClose={() => closeModal()}
      shouldReturnFocusAfterClose={false}
      overlayClassName="auth-modal-overlay login-modal-container"
      className="auth-popup bg-img"
    >
      <main className="main">
        <div className="page-content mt-6 pb-2 bg-white mb-2">
          <div className="container">
            <div className="login-popup">
              <div className="form-box">
                <div className="tab tab-nav-simple tab-nav-boxed form-tab">
                  <Tabs
                    selectedTabClassName="active"
                    selectedTabPanelClassName="active"
                  >
                    <TabList className="nav nav-tabs nav-fill align-items-center border-no justify-content-center mb-5 flex-no-wrap">
                      <Tab className="nav-item">
                        <span className="nav-link border-no lh-1 ls-default">
                          {confirmSignUp ? "OTP Verification" : "Sign In"}
                        </span>
                      </Tab>
                    </TabList>

                    <div className="tab-content">
                      <TabPanel className="tab-pane">
                        {!confirmSignUp && (
                          <form onSubmit={handleSignIn}>
                            <div className="form-group mb-3">
                              <p className="mb-2">Mobile Number*</p>
                              <div className="input-tel">
                                <div className="prefix">+91</div>
                                <input
                                  type="tel"
                                  className="form-control prevent-zoom"
                                  id="singin-phone-2"
                                  name="singin-phone"
                                  placeholder="Phone number"
                                  required
                                  maxLength={10}
                                  value={removePhonePrefix(state.phone)}
                                  onChange={(e) => {
                                    setState({
                                      ...state,
                                      phone: (e.target.value || "")
                                        ?.replaceAll(/[^0-9]+/g, "")
                                        ?.trim(),
                                    });
                                  }}
                                />
                              </div>
                            </div>

                            <button
                              className="btn btn-primary btn-block btn-rounded d-flex justify-content-center align-items-center"
                              type="submit"
                              disabled={loading}
                              onClick={handleEvent}
                            >
                              Get OTP
                              {loading && <div className="spin-loader ml-2" />}
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

                      {confirmSignUp && (
                        <form onSubmit={handleConfirmSignUp}>
                          <div className="form-group mb-1">
                            <label
                              htmlFor="confirm-code-2"
                              className="number-otp-label"
                            >
                              Enter 6-Digit OTP sent to +91{state.phone}
                            </label>
                          </div>
                          <div className="d-flex otp-container mb-3">
                            {state.confirmationCode.map((ele, index) => (
                              <input
                                key={index}
                                id={`otp${index + 1}`}
                                name={`otp${index + 1}`}
                                type="number"
                                autoComplete="one-time-code"
                                className="otpInput prevent-zoom"
                                value={ele}
                                maxLength={1}
                                onChange={(e) => {
                                  handleChange(e.target, index);
                                }}
                                onFocus={(e) => e.target.select()}
                                onKeyUp={(e) => inputFocus(e, index)}
                                onPaste={handlePaste}
                              />
                            ))}
                          </div>
                          {otpError && (
                            <div className="overflow-hidden mb-4">
                              <div className="alert alert-danger alert-summary alert-light alert-message alert-inline m-0">
                                OTP invalid, please try again.
                              </div>
                            </div>
                          )}
                          {/* <button
                            className="btn btn-primary btn-block btn-rounded d-flex justify-content-center align-items-center"
                            type="submit"
                            disabled={loading}
                          >
                            Confirm
                            {loading && <div className="spin-loader ml-2" />}
                          </button> */}
                          {!seconds ? (
                            <ALink href="#" onClick={handleSignIn}>
                              <p className="resend-label mt-2">
                                Didn't get the code? Resend OTP
                              </p>
                            </ALink>
                          ) : (
                            <p className="not-receive-otp-label mt-2">
                              Didn't receive it? Resend in {seconds}
                            </p>
                          )}
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
    </Modal>
  );
}

function mapStateToProps(state) {
  return {
    auth: !!state.user.data,
    isOpen: state.modal.passwordless,
    redirect: !!state.modal.loginRedirect,
    customSignup: !!state.modal.customSignup,
  };
}

export default connect(mapStateToProps, {
  closeModal: modalActions.closePasswordlessModal,
  openLogin: modalActions.openLoginModal,
  setUser: userActions.setUser,
  login: eventActions.logIn,
  OtpRequested: eventActions.OtpRequested,
  setCustomUser: userActions.setCustomUser,
})(Passwordless);
