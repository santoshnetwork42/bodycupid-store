"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useMemo } from "react";
import { makeStore } from "~/store";

// Lightweight provider scaffold for App Router.
// We will extend this as we migrate more logic from pages/_app.js.
export default function Providers({ children }) {
  const store = useMemo(() => makeStore(), []);
  return (
    <Provider store={store}>
      <PersistGate persistor={store.__persistor}>{children}</PersistGate>
    </Provider>
  );
}

