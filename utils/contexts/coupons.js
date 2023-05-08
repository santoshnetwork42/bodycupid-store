import React, { createContext, useState, useContext, useEffect } from "react";
import { API } from "aws-amplify";

import { STORE_ID } from "~/config";
import { getFeaturedCoupon } from "~/graphql/api";

export const CouponContext = createContext();

function CouponsProvider({ children }) {
  const [coupons, setCoupons] = useState([]);

  const getCoupons = async () => {
    const response = await API.graphql({
      query: getFeaturedCoupon,
      variables: {
        filter: {
          isFeatured: { eq: true },
          isActive: { eq: true },
          storeId: { eq: STORE_ID },
        },
      },
    });

    setCoupons(
      response.data.searchCouponCodes.items
        .filter((coupon) => {
          const { expirationDate } = coupon;
          return (!expirationDate || new Date(expirationDate).getTime() >= new Date().getTime());
        })
    );
  };

  useEffect(() => {
    getCoupons();
  }, []);

  return (
    <CouponContext.Provider value={{ coupons, getCoupons }}>
      {children}
    </CouponContext.Provider>
  );
}

export const useCoupons = () => {
  const { coupons } = useContext(CouponContext);
  return coupons || [];
};

export default CouponsProvider;