import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { addPhonePrefix, removePhonePrefix } from "~/utils/helper";
import getRandomString from "~/utils/getRandomString";
import { modalActions } from "~/store/modal";
import AlertPopup from "~/components/features/product/common/alert-popup";
import Modal from "~/components/common/modal";
import ALink from "~/components/features/custom-link";

function Passwordless({
  auth,
  isOpen,
  closeModal,
  openLogin,
  forceOpen,
  redirect,
}) {
  const router = useRouter();
  const [state, setState] = useState({
    phone: "",
    confirmationCode: "",
  });

  const [confirmSignUp, setConfirmSignUp] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setState({ phone: "", confirmationCode: "" });
      setConfirmSignUp(null);
      setCurrentUser(null);
    }
  }, [isOpen]);

  const handleSignup = useCallback(async () => {
    try {
      await Auth.signUp({
        username: addPhonePrefix(state.phone),
        password: getRandomString(30),
        phone_number: addPhonePrefix(state.phone),
        attributes: {
          name: "",
          given_name: "",
          middle_name: "",
          phone_number: addPhonePrefix(state.phone),
        },
        autoSignIn: {
          enabled: true,
        },
      });
      setConfirmSignUp("SIGNUP");
    } catch (error) {
      console.log("error signing up:", error);
      toast(<AlertPopup message={error.message} status="error" />);
    }
    return false;
  }, [state]);

  const handleConfirmSignUp = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (confirmSignUp === "SIGNUP") {
          await Auth.confirmSignUp(
            addPhonePrefix(state.phone),
            state.confirmationCode
          );
        } else {
          await Auth.sendCustomChallengeAnswer(
            currentUser,
            state.confirmationCode
          );
        }
        if (redirect) router.push("/pages/checkout");
        closeModal();
        return false;
      } catch (error) {
        console.log("error signup confirm:", error);
        toast(<AlertPopup message={error.message} status="error" />);
      }
      return false;
    },
    [state, confirmSignUp, currentUser, closeModal, redirect]
  );

  const handleSignIn = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const cu = await Auth.signIn({
          username: addPhonePrefix(state.phone),
        });
        setCurrentUser(cu);
        setConfirmSignUp("SIGNIN");
      } catch (error) {
        console.log("error signin:", error);
        if (error.code === "UserNotConfirmedException") {
          await Auth.resendSignUp(addPhonePrefix(state.phone));
          setConfirmSignUp("SIGNIN");
        } else if (error.code === "UserNotFoundException") {
          await handleSignup();
        } else {
          toast(<AlertPopup message={error.message} status="error" />);
        }
      }
      return false;
    },
    [state, handleSignup]
  );

  useEffect(() => {
    closeModal();
  }, [auth]);

  return (
    <Modal
      isOpen={forceOpen || isOpen}
      isCloseIcon={!forceOpen}
      onRequestClose={() => closeModal()}
      shouldReturnFocusAfterClose={false}
      overlayClassName="auth-modal-overlay"
      className="auth-popup bg-img"
    >
      <main className="main">
        <div className="page-content mt-6 pb-2 mb-2">
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
                        <span className="nav-link border-no lh-1 ls-normal">
                          Enter Mobile Number
                        </span>
                      </Tab>
                    </TabList>

                    <div className="tab-content">
                      <TabPanel className="tab-pane">
                        {!confirmSignUp && (
                          <form onSubmit={handleSignIn}>
                            <div className="form-group mb-3">
                              <div className="input-tel">
                                <div className="prefix">+91</div>
                                <input
                                  type="tel"
                                  className="form-control"
                                  id="singin-phone-2"
                                  name="singin-phone"
                                  placeholder="Phone number *"
                                  required
                                  maxLength={10}
                                  value={removePhonePrefix(state.phone)}
                                  onChange={(e) =>
                                    setState({
                                      ...state,
                                      phone: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <button
                              className="btn btn-dark btn-block btn-rounded"
                              type="submit"
                            >
                              Get OTP
                            </button>
                            <div className="text-center">
                              <ALink
                                href="#"
                                className="lost-link"
                                onClick={() => {
                                  closeModal();
                                  openLogin();
                                }}
                              >
                                Login with Password
                              </ALink>
                            </div>
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
    </Modal>
  );
}

function mapStateToProps(state) {
  return {
    auth: !!state.user.data,
    isOpen: state.modal.passwordless,
    redirect: !!state.modal.loginRedirect,
  };
}

export default connect(mapStateToProps, {
  closeModal: modalActions.closePasswordlessModal,
  openLogin: modalActions.openLoginModal,
})(Passwordless);
