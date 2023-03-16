import React, { useCallback, useState } from "react";
import Head from "next/head";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";

import ALink from "~/components/features/custom-link";
import { addPhonePrefix, removePhonePrefix } from "~/utils/helper";

function ForgotPassword() {
  const router = useRouter();
  const [state, setState] = useState({
    phone: "",
    password: "",
    confirmationCode: null,
  });
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(null);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (!showOTP) {
          await Auth.forgotPassword(addPhonePrefix(state.phone));
          setShowOTP(true);
        } else {
          await Auth.forgotPasswordSubmit(
            addPhonePrefix(state.phone),
            state.confirmationCode,
            state.password
          );
          router.push("/pages/login");
        }
      } catch (error) {
        console.log("error signin:", error);
      }
      return false;
    },
    [state, showOTP]
  );

  return (
    <main className="main">
      <Head>
        <title>Wow life science | Login</title>
      </Head>

      <h1 className="d-none">Wow life science - Login</h1>
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
                        Forgot Password
                      </span>
                    </Tab>
                  </TabList>

                  <div className="tab-content">
                    <TabPanel className="tab-pane">
                      <form onSubmit={handleSubmit}>
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
                        {!!showOTP && (
                          <>
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
                            <div className="form-group">
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
                          </>
                        )}
                        <button
                          className="btn btn-dark btn-block btn-rounded mt-2 d-flex justify-content-center align-items-center"
                          type="submit"
                          disabled={loading}
                        >
                          {showOTP ? "Reset Password" : "Get Code"}
                          {loading && <div className="spin-loader ml-2" />}
                        </button>
                        <div className="form-footer mt-3 align-items-center border-no justify-content-center">
                          <ALink href="/pages/login" className="lost-link">
                            Login / Signup
                          </ALink>
                        </div>
                      </form>
                    </TabPanel>
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

export default React.memo(ForgotPassword);
