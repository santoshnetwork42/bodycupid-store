// import React, { createContext, useState, useContext, useEffect } from "react";
// import Cookie from "js-cookie";
// import { useRouter } from "next/router";

// import { STORE_PREFIX } from "~/config";

// const CART_AB = `${STORE_PREFIX}_CARTAB`;

// export const ABContext = createContext();

// function ABProvider({ children }) {
//   const router = useRouter();
//   const [cartAB, setCartAB] = useState(false);

//   const { query } = router;

//   const { cv } = query;

//   useEffect(() => {
//     const initialCartAB = Cookie.get(CART_AB) === "true";
//     if (initialCartAB) {
//       setCartAB(true);
//     } else if (!!cv) {
//       Cookie.set(CART_AB, "true", {
//         expires: 14,
//       });
//       setCartAB(true);
//     }
//   }, [cv]);
//   return <ABContext.Provider value={{ cartAB }}>{children}</ABContext.Provider>;
// }

// export const useCartAB = () => {
//   const { cartAB } = useContext(ABContext);
//   return cartAB;
// };

// export default ABProvider;
