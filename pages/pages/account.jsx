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

      <div className="page-content mt-4 mb-5 pb-1 bg-white">
        <div className="container">
          <h2 className="title capitalize-title mb-4">My Account</h2>

          <Tabs
            selectedTabClassName="show"
            selectedTabPanelClassName="active"
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
                <a className="nav-link">My Orders</a>
              </Tab>
              <Tab className="nav-item">
                <a className="nav-link">My Address</a>
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
