import React, { createContext, useState, useContext, useEffect } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

import { STORE_PREFIX } from "~/config";

const CART_AB = `${STORE_PREFIX}_CARTAB`; 

export const ABContext = createContext();

function ABProvider({ children }) {
  const router = useRouter();

  const { query } = router;

  return <ABContext.Provider>{children}</ABContext.Provider>;
}

export const useCartAB = () => {
  const { cartAB } = useContext(ABContext);
  return cartAB;
};

export default ABProvider;
