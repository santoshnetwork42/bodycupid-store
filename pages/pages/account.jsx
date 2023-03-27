import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";
import Addresses from "~/components/common/addresses";
import AccountOrders from "~/components/partials/account/orders";
import AccountDetails from "~/components/partials/account/account-details";

function Account({ user, store }) {
  const { name } = store;
  const router = useRouter();
  const { query } = router;
  const { activeTabIndex } = query;

  const [activeTab, setActiveTab] = useState(parseInt(activeTabIndex) || 0);

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

  const onActiveTabIndexChange = (index) => {
    setActiveTab(index);
  };

  if (!user) return <></>;

  return (
    <main className="main account">
      <Head>
        <title>{name} | Account</title>
      </Head>

      <h1 className="d-none">{name} - Account</h1>

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
            defaultIndex={activeTab}
            className="tab tab-vertical gutter-lg"
            selectedIndex={activeTab}
            onSelect={(index) => {
              onActiveTabIndexChange(index);
            }}
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
                  Hello{" "}
                  <span>
                    {user.firstName} {user.lastName}
                  </span>{" "}
                  (not <span>User</span>?{" "}
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
                  <ALink
                    href="#"
                    className="link-to-tab text-primary"
                    onClick={() => {
                      onActiveTabIndexChange(1);
                    }}
                  >
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
                <AccountOrders />
              </TabPanel>
              <TabPanel className="tab-pane addresses">
                <p className="mb-2">
                  The following addresses can be used on the checkout page.
                </p>
                <Addresses />
              </TabPanel>
              <TabPanel className="tab-pane account">
                <AccountDetails />
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
    store: state.system.store,
  };
}

export default connect(mapStateToProps)(Account);
