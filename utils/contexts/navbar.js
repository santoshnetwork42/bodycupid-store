import React, { createContext, useState, useContext, useEffect } from "react";
import { API } from "aws-amplify";
import Cookie from "js-cookie";
import { connect } from "react-redux";
import { NavbarProvider as Navbar, useConfiguration } from "@wow-star/utils";

import { STORE_ID, STORE_PREFIX } from "~/config";
import { GUEST_CHECKOUT } from "~/constant";

export const NavbarContext = createContext();

function NavbarProvider({ children, cartList, appliedCoupon }) {
  const [isInteractive, setIsInteractive] = useState(false);

  const apiResolve = (query, variables, authMode) =>
    API.graphql({
      query,
      variables,
      authMode: authMode === "AUTH" ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY",
    });

  useEffect(() => {
    const handleMouseMovement = () => {
      setIsInteractive(true);
      // Remove the event listener after APIs are called
      window.removeEventListener("mousemove", handleMouseMovement);
    };

    window.addEventListener("mousemove", handleMouseMovement);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMovement);
    };
  }, []);

  return (
    <Navbar
      storeId={STORE_ID}
      resolve={apiResolve}
      isInteractive={isInteractive}
      cartItems={cartList}
      appliedCoupon={appliedCoupon}
    >
      <NavbarContext.Provider value={{ isInteractive }}>
        {children}
      </NavbarContext.Provider>
    </Navbar>
  );
}

export const useIsInteractive = () => {
  const { isInteractive } = useContext(NavbarContext);
  return !!isInteractive;
};

export const useGuestCheckout = () => {
  const guestCheck = useConfiguration(GUEST_CHECKOUT, 0);
  const guestCookie = Cookie.get(`${STORE_PREFIX}_guest`);
  if (guestCheck === 1 || guestCookie) return true;
  return false;
};

function mapStateToProps(state) {
  return {
    cartList: state.cart.data ? state.cart.data : [],
    user: state.user.data,
    appliedCoupon: state.cart.coupon,
  };
}
const Component = connect(mapStateToProps)(NavbarProvider);

export default Component;
