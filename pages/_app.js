import awaitGlobal from "await-global";
import { API, Amplify, Analytics, Auth, Hub, Logger } from "aws-amplify";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import "react-owl-carousel2/lib/styles.css";
import { Provider, useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import awsconfig from "~/aws-exports";
import Header from "~/components/common/header";
import NextHead from "~/components/common/next-head";
import Layout from "~/components/layout";
import Scripts from "~/components/scripts";
import { AWS_CLIENT_ID, STORE_ID, STORE_PREFIX } from "~/config";
import { GUEST_CHECKOUT_COOKIE_EXPIRY } from "~/constant.js";
import { getStore, getUser } from "~/graphql/api";
import "~/public/sass/style.scss";
import { rootActions } from "~/store";
import { eventActions } from "~/store/events";
import { systemActions } from "~/store/system";
import { userActions } from "~/store/user";
import ABProvider from "~/utils/contexts/ab";
import NavbarProvider from "~/utils/contexts/navbar";
import { errorHandler } from "~/utils/errorHandler";
import { wrapper } from "../store/index.js";

Amplify.configure({
  ...awsconfig,
  ssr: true,
  aws_user_pools_web_client_id: AWS_CLIENT_ID,
});
Analytics.disable();

const logger = new Logger("App");

const App = ({ Component, pageProps }) => {
  const store = useStore();
  const router = useRouter();

  const { query } = router;
  const { navbar, footer, store: wowStore, pageMeta } = pageProps;

  const navbarProps = {
    ...navbar,
    hideSearch: !!Component.hideSearch,
    showTopRunner: !!Component.showTopRunner,
    couponBanner: !!Component.couponBanner,
    hideCart: !!Component.hideCart,
  };

  const footerProps = {
    ...footer,
    hideFooter: !!Component.hideFooter,
    showStickyCheckout: !!Component.showStickyCheckout,
    hideChatbot: !!Component.hideChatbot,
  };

  const destroySession = useCallback(() => {
    store.__persistor.purge();
    store.dispatch(rootActions.destroySession());
  }, [store]);

  const setUser = useCallback(async () => {
    try {
      const state = store.getState();
      if (!state.user.data) {
        const user = await Auth.currentAuthenticatedUser().catch(() => null);
        if (user?.attributes?.sub) {
          const {
            data: { getUser: getUserResponse },
          } = await API.graphql({
            query: getUser,
            authMode: "AMAZON_COGNITO_USER_POOLS",
          });

          store.dispatch(userActions.setUser(getUserResponse));
          // await Analytics.updateEndpoint({
          //   userId: getUserResponse.id,
          //   userAttributes: {
          //     username: [getUserResponse.id],
          //     email: [getUserResponse.email || null],
          //     phone: [getUserResponse.phone || null],
          //     firstName: [getUserResponse.firstName || null],
          //     lastName: [getUserResponse.lastName || null],
          //   },
          // }).catch(() => null);
        }
      }
    } catch (error) {
      logger.error(error);
      errorHandler(error);
      destroySession();
    }
  }, [store, destroySession]);

  const setStore = useCallback(async () => {
    try {
      const state = store.getState();
      if (wowStore) {
        store.dispatch(systemActions.setStore(wowStore));
      } else if (!state.system.store) {
        const {
          data: { getStore: getStoreResponse },
        } = await API.graphql({
          query: getStore,
          variables: { id: STORE_ID, deviceType: "WEB" },
        });
        store.dispatch(systemActions.setStore(getStoreResponse));
      }
    } catch (error) {
      errorHandler(error);
    }
  }, [store, wowStore]);

  const setMetaData = useCallback(() => {
    const cookieMeta = Cookie.get(`${STORE_PREFIX}_metadata`);
    const meta = cookieMeta ? JSON.parse(cookieMeta) : {};
    const {
      utm_campaign: campaign,
      utm_content: content,
      utm_medium: medium,
      utm_source: source,
      utm_term: term,
      clickid,
    } = query;
    const landingPage = window?.location?.href;
    const referrer = document?.referrer;

    const metadata = {
      landingPage: meta?.landingPage || landingPage || null,
      referrer: referrer || meta?.referrer || null,
      utmCampaign: campaign || meta?.utmCampaign || null,
      utmContent: content || meta?.utmContent || null,
      utmMedium: medium || meta?.utmMedium || null,
      utmSource: source || meta?.utmSource || null,
      utmTerm: term || meta?.utmTerm || null,
      clickId: clickid || meta?.clickId || "",
    };

    if (JSON.stringify(metadata) !== cookieMeta) {
      Cookie.set(`${STORE_PREFIX}_metadata`, JSON.stringify(metadata));
    }
    store.dispatch(systemActions.setMeta(metadata));
  }, [store, query]);

  const setGuestCheckout = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get("guest");
    if (guestParam === "1") {
      const expiryDate = new Date();
      expiryDate.setTime(
        expiryDate.getTime() + GUEST_CHECKOUT_COOKIE_EXPIRY * 60 * 60 * 1000
      );
      const cookieOptions = { expires: expiryDate };
      Cookie.set(`${STORE_PREFIX}_guest`, "1", cookieOptions);
    }
  }, []);

  const initSession = useCallback(async () => {
    setStore();
    setUser();
  }, [setStore, setUser]);

  useEffect(() => {
    const loggedInEvents = ["signIn", "confirmSignUp", "autoSignIn"];
    const hubListenerCancelToken = Hub.listen("auth", async (authEvent) => {
      const {
        payload: { event, data },
      } = authEvent;
      if (event === "signOut") {
        logger.info("Signing out");
        destroySession();
        store.dispatch(eventActions.auth("logout"));
      } else if (loggedInEvents.includes(event)) {
        initSession();
      }
    });

    initSession();

    return () => hubListenerCancelToken();
  }, []);

  useEffect(() => {
    setMetaData();
  }, [query, setMetaData]);

  useEffect(() => {
    setGuestCheckout();
  }, []);

  useEffect(() => {
    awaitGlobal("FB")
      .then((fb) => {
        if (footerProps.hideChatbot) {
          fb.CustomerChat.hide();
        } else {
          fb.XFBML.parse();
          fb.CustomerChat.show(false);
        }
      })
      .catch(() => {});
  }, [footerProps.hideChatbot]);

  return (
    <>
      {!!pageMeta && <NextHead {...pageMeta} />}
      <Provider store={store}>
        <PersistGate
          persistor={store.__persistor}
          loading={<Header navbar={{ hideCart: true, hideMainMenu: true }} />}
        >
          <ABProvider>
            <NavbarProvider>
              <Layout navbar={navbarProps} footer={footerProps}>
                <Scripts />
                <Component {...pageProps} />
              </Layout>
            </NavbarProvider>
          </ABProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default wrapper.withRedux(App);
