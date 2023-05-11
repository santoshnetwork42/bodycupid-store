import React, { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";
import Addresses from "~/components/common/addresses";
import AccountOrders from "~/components/partials/account/orders";
import AccountDetails from "~/components/partials/account/account-details";
import {
  ArrowLeft,
  ArrowRightFromBracket,
  ListRadio,
  LocationDot,
  RightAngle,
  User,
} from "~/components/icons";
import { modalActions } from "~/store/modal";

const MOBILE_TABS = [
  {
    tabName: "My orders",
    svg: <ListRadio size={16} />,
    href: "/pages/orders",
    activeTab: 0,
  },
  {
    tabName: "My addresses",
    svg: <LocationDot size={16} />,
    href: "/pages/addresses",
    activeTab: 1,
  },
  {
    tabName: "Account Details",
    svg: <User size={16} />,
    href: "/pages/account-details",
    activeTab: 2,
  },
];

function AccountsTabs({ user, store, openPasswordLess }) {
  const router = useRouter();

  const { name } = store;
  const { pathname } = router;

  // const [activeTab, setActiveTab] = useState(parseInt(activeTabIndex) || 0);

  // useEffect(() => {
  //   if (pathname === "orders") {
  //     setActiveTab(0);
  //   } else if (pathname === "addresses") {
  //     setActiveTab(1);
  //   } else if (pathname === "account-details") {
  //     setActiveTab(2);
  //   }
  // }, [route]);

  const currentTab = useMemo(
    () => MOBILE_TABS.find((t) => t.href === pathname),
    [pathname]
  );

  const { tabName: headerLabel, activeTab = 0 } = currentTab || {};

  useEffect(() => {
    (async function () {
      try {
        await Auth.currentAuthenticatedUser();
      } catch {
        openPasswordLess();
      }
    })();
  }, []);

  const handleLogout = useCallback(async () => {
    await Auth.signOut();
    router.push("/");
    return true;
  }, []);

  // const onActiveTabIndexChange = (index) => {
  //   setActiveTab(index);
  // };

  if (!user) return <></>;

  return (
    <main className="main account bg-white">
      <Head>
        <title>{name} | Account</title>
      </Head>

      <h1 className="d-none">{name} - Account</h1>

      <div className="page-content pt-4 pb-5 pb-1 bg-white d-sm-none">
        <div className="container">
          <Tabs
            selectedTabClassName="show"
            selectedTabPanelClassName="active"
            className="tab tab-vertical gutter-lg"
            selectedIndex={activeTab}
          >
            <TabList
              className="nav nav-tabs mb-4 col-lg-3 col-md-4"
              role="tablist"
            >
              {MOBILE_TABS.map((tab) => (
                <Tab className="nav-item" key={tab.href}>
                  <ALink
                    className={`nav-link ${
                      activeTab === tab.activeTab && "account-active-link"
                    }`}
                    href={tab.href}
                  >
                    {tab.tabName}
                  </ALink>
                </Tab>
              ))}
              <Tab className="nav-item">
                <ALink className="nav-link" href="/" onClick={handleLogout}>
                  Logout
                </ALink>
              </Tab>
            </TabList>

            <div className="tab-content col-lg-9 col-md-8">
              <TabPanel className="tab-pane orders pt-0">
                <AccountOrders />
              </TabPanel>
              <TabPanel className="tab-pane addresses">
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

      {pathname === "/pages/account" && (
        <div className="mobile-tabs d-sm-show pt-5 pb-5">
          {MOBILE_TABS.map((item) => {
            return (
              <ALink
                key={item.href}
                href={item.href}
                className="d-flex mobile-account-tab align-items-center "
              >
                <div className="d-flex align-items-center">
                  {item.svg}
                  <p className="m-0 tab-label">{item.tabName}</p>
                </div>
                <RightAngle size={14} />
              </ALink>
            );
          })}
          <ALink
            href="/"
            className="d-flex mobile-account-tab align-items-center "
            onClick={handleLogout}
          >
            <div className="d-flex align-items-center">
              <ArrowRightFromBracket size={16} />
              <p className="m-0 tab-label">Logout</p>
            </div>
          </ALink>
        </div>
      )}

      <div className="d-xl-none d-sm-show">
        {!!headerLabel && (
          <div className="d-flex align-items-center mobile-tab-header">
            <ALink href="/pages/account" className="d-flex align-items-center">
              <ArrowLeft size={20} />
            </ALink>
            <p className="m-0 header-label">{headerLabel}</p>
          </div>
        )}

        <div className="mobile-tabs-content">
          {pathname === "/pages/orders" && <AccountOrders />}
          {pathname === "/pages/addresses" && (
            <div>
              <Addresses />
            </div>
          )}
          {pathname === "/pages/account-details" && <AccountDetails />}
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

export default connect(mapStateToProps, {
  openPasswordLess: modalActions.openPasswordlessModal,
})(AccountsTabs);
