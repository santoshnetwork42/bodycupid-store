import { useCallback, useEffect, useMemo } from "react";
import { useStore, Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Amplify, Hub, Auth, API } from "aws-amplify";
import Head from "next/head";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

import { wrapper } from "../store/index.js";
import Layout from "~/components/layout";
import { rootActions } from "~/store";
import { userActions } from "~/store/user";
import { systemActions } from "~/store/system";
import { STORE_ID, STORE_PREFIX } from "~/config";
import fetchData from "~/utils/fetchData";

import awsconfig from "~/aws-exports";

import "~/public/sass/style.scss";
import "react-owl-carousel2/lib/styles.css";
import { getUser, getStore } from "~/graphql/api";
import Scripts from "~/components/scripts.jsx";

Amplify.configure({ ...awsconfig, ssr: true });

const App = ({ Component, pageProps }) => {
  const store = useStore();
  const router = useRouter();

  const { query } = router;
  const { navbar, footer, store: wowStore } = pageProps;

  const navbarProps = {
    ...navbar,
    showMobileSearchBar: !!Component.showMobileSearchBar,
  };

  const footerProps = {
    ...footer,
    hideFooter: !!Component.hideFooter,
  };

  const storeName = useMemo(() => {
    if (wowStore) return wowStore.name;
    const state = store.getState();
    return state?.system?.store?.name;
  }, [wowStore]);

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
            variables: { id: user?.attributes?.sub },
            authMode: "AMAZON_COGNITO_USER_POOLS",
          });

          store.dispatch(userActions.setUser(getUserResponse));
        }
      }
    } catch (error) {
      console.log(error);
      destroySession();
    }
  }, [store]);

  const setStore = useCallback(async () => {
    const state = store.getState();
    if (!state.system.store) {
      if (wowStore) {
        store.dispatch(systemActions.setStore(wowStore));
      } else {
        const {
          data: { getStore: getStoreResponse },
        } = await API.graphql({
          query: getStore,
          variables: { id: STORE_ID },
        });
        store.dispatch(systemActions.setStore(getStoreResponse));
      }
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
    };

    Cookie.set(`${STORE_PREFIX}_metadata`, JSON.stringify(metadata));
    store.dispatch(systemActions.setMeta(metadata));
  }, [store, query]);

  const initSession = useCallback(async () => {
    setStore();
    setUser();
    setMetaData();
  }, [setStore, setUser, setMetaData]);

  useEffect(() => {
    const loggedInEvents = ["signIn", "confirmSignUp", "autoSignIn"];
    Hub.listen("auth", async (authEvent) => {
      const {
        payload: { event },
      } = authEvent;
      if (event === "signOut") {
        destroySession();
      } else if (loggedInEvents.includes(event)) {
        initSession();
      }
    });
    initSession();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate
        persistor={store.__persistor}
        loading={
          <div className="loading-overlay">
            <div className="bounce-loader">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
              <div className="bounce4"></div>
            </div>
          </div>
        }
      >
        <Head>
          <meta charSet="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no, shrink-to-fit=no"
          />
          <meta name="HandheldFriendly" content="true" />
          <title>{storeName}</title>
          <meta name="keywords" content="WOW" />
          <meta name="description" content={storeName} />
        </Head>
        <Scripts />
        <Layout navbar={navbarProps} footer={footerProps}>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  if (!!ctx.req) {
    pageProps = pageProps || {};
    const { getStore: store } = await fetchData(getStore, { id: STORE_ID });
    pageProps.store = store;
  }
  return { pageProps };
};

export default wrapper.withRedux(App);
