import { useCallback, useEffect } from "react";
import { useStore, Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Amplify, Hub } from "aws-amplify";
import Head from "next/head";

import { wrapper } from "../store/index.js";
import Layout from '~/components/layout';
import { rootActions } from '~/store';
import { userActions } from '~/store/user';

import awsconfig from "~/aws-exports";

import "~/public/sass/style.scss";
import "react-owl-carousel2/lib/styles.css";

Amplify.configure({ ...awsconfig, ssr: true });

const App = ({ Component, pageProps }) => {
  const store = useStore();
  const { navbar, footer } = pageProps;

  const setUser = useCallback(async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      store.dispatch(userActions.setUser({
        username: user.username,
        attributes: user.attributes,
      }));
    } catch {
      store.dispatch(rootActions.destroySession());
    }
  }, [store]);

  useEffect(() => {
    const loggedInEvents = ["signIn", "confirmSignUp", "autoSignIn"];
    Hub.listen('auth', async (authEvent) => {
      const { payload: { event } } = authEvent;
      if (event === "signOut") {
        store.dispatch(rootActions.destroySession());
      } else if (loggedInEvents.includes(event)) {
        setUser();
      }
    });
    setUser();
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
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />

          <title>Wow life science</title>
          <meta name="keywords" content="WOW" />
          <meta name="description" content="Wow life science" />
          <meta name="author" content="D-THEMES" />
        </Head>
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
