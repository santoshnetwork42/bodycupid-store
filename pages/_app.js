import { useCallback, useEffect } from "react";
import { useStore, Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Amplify, Hub, Auth, API } from "aws-amplify";
import Head from "next/head";

import { wrapper } from "../store/index.js";
import Layout from "~/components/layout";
import { rootActions } from "~/store";
import { userActions } from "~/store/user";
import { systemActions } from "~/store/system";
import { STORE_ID } from "~/config";

import awsconfig from "~/aws-exports";

import "~/public/sass/style.scss";
import "react-owl-carousel2/lib/styles.css";
import { getUser, getStore } from "~/graphql/api";
import Scripts from "~/components/scripts.jsx";

Amplify.configure({ ...awsconfig, ssr: true });

const App = ({ Component, pageProps }) => {
  const store = useStore();
  const { navbar, footer } = pageProps;

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

  // const setCart = useCallback(async () => {
  //   try {
  //     const user = await Auth.currentAuthenticatedUser();
  //     const {
  //       data: { getUser: getUserResponse },
  //     } = await API.graphql({
  //       query: getUser,
  //       variables: { id: user.username },
  //       authMode: "AMAZON_COGNITO_USER_POOLS",
  //     });

  //     store.dispatch(userActions.setUser(getUserResponse));
  //   } catch (error) {
  //     console.log(error);
  //     destroySession();
  //   }
  // }, [store]);

  const setStore = useCallback(async () => {
    const state = store.getState();
    if (!state.system.store) {
      const {
        data: { getStore: getStoreResponse },
      } = await API.graphql({
        query: getStore,
        variables: { id: STORE_ID },
      });
      store.dispatch(systemActions.setStore(getStoreResponse));
    }
  }, [store]);

  const initSession = useCallback(async () => {
    setStore();
    setUser();
  }, [setStore, setUser]);

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
          <title>Wow life science</title>
          <meta name="keywords" content="WOW" />
          <meta name="description" content="Wow life science" />
        </Head>
        <Scripts/>
        <Layout navbar={navbar} footer={footer}>
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
  return { pageProps };
};

export default wrapper.withRedux(App);
