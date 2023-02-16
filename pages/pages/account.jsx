import React, { useEffect, useState } from "react";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { API } from "aws-amplify";
import { useSetState } from "react-use";

import ALink from "~/components/features/custom-link";
import Addresses from "~/components/common/addresses";
import { listOrders, getUser } from "~/graphql/queries";
import { updateUser as updateUserMutation } from "~/graphql/mutations";
import { formateDate, toDecimal } from "~/utils/index";

function Account({ user }) {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [userDetail, setUser] = useSetState({ ...user });

  const getOrders = useCallback(async () => {
    const {
      data: { listOrders: listOrdersResponse },
    } = await API.graphql({
      query: listOrders,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    setOrders(listOrdersResponse.items);
  }, []);

  const getUserDetails = useCallback(async () => {
    const {
      data: { getUser: getUserResponse },
    } = await API.graphql({
      query: getUser,
      variables: { id: user.username },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    setUser(getUserResponse);
  }, []);

  useEffect(() => {
    if (user) {
      getOrders();
      getUserDetails();
    }
  }, [!!user]);

  useEffect(() => {
    (async function () {
      try {
        await Auth.currentAuthenticatedUser();
      } catch {
        router.push("/pages/login");
      }
    })();
  }, []);

  const handleLogout = useCallback(async () => {
    await Auth.signOut();
    router.push("/");
    return true;
  }, []);

  const updateUser = useCallback(
    async (e) => {
      e.preventDefault();
      await API.graphql({
        query: updateUserMutation,
        variables: {
          input: {
            id: user.username,
            firstName: userDetail.firstName,
            lastName: userDetail.lastName,
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      return false;
    },
    [userDetail, user]
  );

  if (!user) return <></>;

  return (
    <main className="main account">
      <Head>
        <title>Wow React eCommerce Template | Account</title>
      </Head>

      <h1 className="d-none">Wow React eCommerce Template - Account</h1>

      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <ALink href="/">
                <i className="d-icon-home"></i>
              </ALink>
            </li>
            <li>Account</li>
          </ul>
        </div>
      </nav>

      <div className="page-content mt-4 mb-10 pb-6">
        <div className="container">
          <h2 className="title title-center mb-10">My Account</h2>

          <Tabs
            selectedTabClassName="show"
            selectedTabPanelClassName="active"
            defaultIndex={0}
            className="tab tab-vertical gutter-lg"
          >
            <TabList
              className="nav nav-tabs mb-4 col-lg-3 col-md-4"
              role="tablist"
            >
              <Tab className="nav-item">
                <a className="nav-link">Dashboard</a>
              </Tab>
              <Tab className="nav-item">
                <a className="nav-link">Orders</a>
              </Tab>
              <Tab className="nav-item">
                <a className="nav-link">Address</a>
              </Tab>
              <Tab className="nav-item">
                <a className="nav-link">Account details</a>
              </Tab>
              <Tab className="nav-item">
                <ALink className="nav-link" href="/" onClick={handleLogout}>
                  Logout
                </ALink>
              </Tab>
            </TabList>
            <div className="tab-content col-lg-9 col-md-8">
              <TabPanel className="tab-pane dashboard">
                <p className="mb-0">
                  Hello <span>{user.username}</span> (not <span>User</span>?{" "}
                  <ALink
                    href="/"
                    className="text-primary"
                    onClick={handleLogout}
                  >
                    Log out
                  </ALink>
                  )
                </p>
                <p className="mb-8">
                  From your account dashboard you can view your{" "}
                  <ALink href="#" className="link-to-tab text-primary">
                    recent orders
                  </ALink>
                  , manage your shipping and billing addresses,
                  <br />
                  and edit your password and account details.
                </p>
                <ALink href="/shop" className="btn btn-dark btn-rounded">
                  Go To Shop<i className="d-icon-arrow-right"></i>
                </ALink>
              </TabPanel>
              <TabPanel className="tab-pane orders">
                <table className="order-table">
                  <thead>
                    <tr>
                      <th className="pl-2">Order</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Total</th>
                      <th className="pr-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="order-number">
                          <ALink href="#">#{order.code}</ALink>
                        </td>
                        <td className="order-date">
                          <time>{formateDate(order.createdAt)}</time>
                        </td>
                        <td className="order-status">
                          <span>{order.status}</span>
                        </td>
                        <td className="order-total">
                          <span>
                            ₹{toDecimal(order.payments.items[0]?.amount)}
                          </span>
                        </td>
                        <td className="order-action">
                          <ALink
                            href={`/order/${order.id}`}
                            className="btn btn-primary btn-link btn-underline"
                          >
                            View
                          </ALink>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabPanel>
              <TabPanel className="tab-pane addresses">
                <p className="mb-2">
                  The following addresses can be used on the checkout page.
                </p>
                <Addresses />
              </TabPanel>
              <TabPanel className="tab-pane account">
                <form onSubmit={updateUser} className="form">
                  <div className="row">
                    <div className="col-sm-6">
                      <label>First Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="first_name"
                        required
                        value={userDetail.firstName}
                        onChange={(e) => setUser({ firstName: e.target.value })}
                      />
                    </div>
                    <div className="col-sm-6">
                      <label>Last Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        required
                        value={userDetail.lastName}
                        onChange={(e) => setUser({ lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* <label>Display Name *</label>
                  <input
                    type="text"
                    className="form-control mb-0"
                    name="display_name"
                    required
                  />
                  <small className="d-block form-text mb-7">
                    This will be how your name will be displayed in the account
                    section and in reviews
                  </small> */}

                  <label>Email Address *</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    required
                    value={userDetail.email}
                    onChange={(e) => setUser({ email: e.target.value })}
                    disabled
                  />
                  <label>Phone *</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    required
                    value={userDetail.phone}
                    onChange={(e) => setUser({ phone: e.target.value })}
                    disabled
                  />
                  {/* <fieldset>
                    <legend>Password Change</legend>
                    <label>
                      Current password (leave blank to leave unchanged)
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="current_password"
                    />

                    <label>New password (leave blank to leave unchanged)</label>
                    <input
                      type="password"
                      className="form-control"
                      name="new_password"
                    />

                    <label>Confirm new password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirm_password"
                    />
                  </fieldset> */}

                  <button type="submit" className="btn btn-primary">
                    SAVE CHANGES
                  </button>
                </form>
              </TabPanel>
              <TabPanel className="tab-pane"></TabPanel>
            </div>
          </Tabs>
        </div>
      </div>
    </main>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
  };
}

export default connect(mapStateToProps)(Account);
