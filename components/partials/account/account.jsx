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

const MOBILE_TABS = [
  {
    id: 1,
    tabName: "My orders",
    svg: <ListRadio size={16} />,
    href: "/pages/orders",
  },
  {
    id: 2,
    tabName: "My addresses",
    svg: <LocationDot size={16} />,
    href: "/pages/addresses",
  },
  {
    id: 3,
    tabName: "My orders",
    svg: <User size={16} />,
    href: "/pages/account-details",
  },
];

function AccountsTabs({ user, store }) {
  const { name } = store;
  const router = useRouter();
  const { query, route } = router;
  const { activeTabIndex } = query;

  const [activeTab, setActiveTab] = useState(parseInt(activeTabIndex) || 0);

  const routeName = route.slice(route.lastIndexOf("/") + 1);

  useEffect(() => {
    if (routeName === "orders") {
      setActiveTab(0);
    } else if (routeName === "addresses") {
      setActiveTab(1);
    } else if (routeName === "account-details") {
      setActiveTab(2);
    }
  }, [route]);

  const headerLable = useMemo(() => {
    if (routeName === "orders") {
      return "My Orders";
    } else if (routeName === "addresses") {
      return "My Addresses";
    } else if (routeName === "account-details") {
      return "Account Details";
    }
  }, [routeName]);

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

      <div className="page-content mt-4 mb-5 pb-1 bg-white d-sm-none">
        <div className="container">
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
                <ALink
                  className={`nav-link ${
                    activeTab === 0 && "account-active-link"
                  }`}
                  href="/pages/orders"
                >
                  My Orders
                </ALink>
              </Tab>
              <Tab className="nav-item">
                <ALink
                  className={`nav-link ${
                    activeTab === 1 && "account-active-link"
                  }`}
                  href="/pages/addresses"
                >
                  My Address
                </ALink>
              </Tab>
              <Tab className="nav-item">
                <ALink
                  className={`nav-link ${
                    activeTab === 2 && "account-active-link"
                  }`}
                  href="/pages/account-details"
                >
                  Account details
                </ALink>
              </Tab>
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

      {routeName === "account" && (
        <div className="mobile-tabs d-sm-show mt-5 mb-5">
          {MOBILE_TABS.map((item) => {
            return (
              <ALink
                key={item.id}
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
        {!!headerLable && (
          <div className="d-flex align-items-center mobile-tab-header">
            <ALink href="/pages/account" className="d-flex align-items-center">
              <ArrowLeft size={20} />
            </ALink>
            <p className="m-0 header-label">{headerLable}</p>
          </div>
        )}

        <div className="mobile-tabs-content">
          {routeName === "orders" && <AccountOrders />}
          {routeName === "addresses" && (
            <div>
              <p className="mb-2">
                The following addresses can be used on the checkout page.
              </p>
              <Addresses />
            </div>
          )}
          {routeName === "account-details" && <AccountDetails />}
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

export default connect(mapStateToProps)(AccountsTabs);
