import { useCallback, useEffect } from 'react';
import { useStore, Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import Helmet from "react-helmet";
import { Auth, Hub } from "aws-amplify";
import { Amplify } from 'aws-amplify';

import { wrapper } from "../store/index.js";
import Layout from '~/components/layout';
import { userActions } from '~/store/user';
import awsconfig from "~/aws-exports";

import "~/public/sass/style.scss";

Amplify.configure({ ...awsconfig, ssr: true })

const App = ({ Component, pageProps }) => {
    const store = useStore();

    const setUser = useCallback(async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            store.dispatch(userActions.setUser(user));
        } catch {
            store.dispatch(userActions.removeUser());
        }
    }, [store]);

    useEffect(() => {
        const loggedInEvents = ["signIn", "confirmSignUp", "autoSignIn"];
        Hub.listen('auth', async (authEvent) => {
            const { payload: { event } } = authEvent;
            if (event === "signOut") {
                store.dispatch(userActions.removeUser());
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
                loading={<div className="loading-overlay">
                    <div className="bounce-loader">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                        <div className="bounce4"></div>
                    </div>
                </div>}>
                <Helmet>
                    <meta charSet="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                    <title>Riode - React eCommerce Template</title>

                    <meta name="keywords" content="React Template" />
                    <meta name="description" content="Riode - React eCommerce Template" />
                    <meta name="author" content="D-THEMES" />
                </Helmet>

                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </PersistGate>
        </Provider>
    );
}

App.getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
};

export default wrapper.withRedux(App);