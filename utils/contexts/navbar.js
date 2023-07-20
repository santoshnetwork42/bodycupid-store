import React, { createContext, useState, useContext, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import Cookie from "js-cookie";

import { STORE_ID, STORE_PREFIX } from "~/config";
import {
  getMenuCategories,
  listCollections,
  searchShippingTiers,
  getFeaturedCoupon,
  searchConfigurations,
  getCoupon,
} from "~/graphql/api";
import { getSortedCategoryAndSubCategory } from "../helper";
import { errorHandler } from "../errorHandler";
import { GUEST_CHECKOUT } from "~/constant";

export const NavbarContext = createContext();

function NavbarProvider({ children, config }) {
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [shippingTiers, setShippingTiers] = useState(null);
  const [coupons, setCoupons] = useState(null);
  const [configurations, setConfigurations] = useState([]);

  const getCollections = () => {
    API.graphql(
      graphqlOperation(listCollections, {
        filter: { storeId: { eq: STORE_ID }, showInMenu: { eq: true } },
        sort: [{ field: "priority", direction: "asc" }],
      })
    )
      .then(
        (listCollectionsResponse) =>
          listCollectionsResponse.data.listCollections.items
      )
      .then(setCollections)
      .catch(errorHandler);
  };

  const getCategories = () => {
    API.graphql(
      graphqlOperation(getMenuCategories, {
        filter: { storeId: { eq: STORE_ID }, showInMenu: { eq: true } },
        subCategoryFilter: { showInMenu: { eq: true } },
        sort: [{ field: "priority", direction: "asc" }],
      })
    )
      .then(
        (getCategoriesResponse) =>
          getCategoriesResponse.data.searchProductCategories.items
      )
      .then(getSortedCategoryAndSubCategory)
      .then(setCategories)
      .catch(errorHandler);
  };

  const getShippingTiers = () => {
    API.graphql(
      graphqlOperation(searchShippingTiers, {
        filter: { storeId: { eq: STORE_ID } },
      })
    )
      .then(
        (getShippingTiersResponse) =>
          getShippingTiersResponse.data.searchShippingTiers.items
      )
      .then(setShippingTiers)
      .catch(errorHandler);
  };

  const getCoupons = () => {
    API.graphql({
      query: getFeaturedCoupon,
      variables: {
        filter: {
          isActive: { eq: true },
          storeId: { eq: STORE_ID },
          or: [
            { isFeatured: { eq: true } },
            {
              couponType: { eq: "FREEBIE" },
            },
          ],
        },
      },
    })
      .then(
        (getFeaturedCouponResponse) =>
          getFeaturedCouponResponse.data.searchCoupons.items
      )
      .then((items) => {
        setCoupons(
          items.filter((coupon) => {
            const { expirationDate } = coupon;
            return (
              !expirationDate ||
              new Date(expirationDate).getTime() >= new Date().getTime()
            );
          })
        );
      })
      .catch(errorHandler);
  };

  const getConfigurations = async () => {
    try {
      API.graphql(
        graphqlOperation(searchConfigurations, {
          filter: {
            storeId: { eq: STORE_ID },
          },
        })
      )
        .then((res) => res.data.searchConfigurations.items)
        .then(setConfigurations);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    if (config?.shippingTier && !shippingTiers) {
      getShippingTiers();
    }
  }, [config?.shippingTier]);

  useEffect(() => {
    getCategories();
    getCollections();
    getConfigurations();
    getCoupons();
  }, []);

  const addUserCoupon = async (coupon) => {
    setCoupons([
      { ...coupon, autoApply: true, isExternal: true },
      ...(coupons || []),
    ]);
  };

  return (
    <NavbarContext.Provider
      value={{
        categories,
        collections,
        shippingTiers,
        coupons,
        configurations,
        addUserCoupon,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
}

export const useMenu = () => {
  const { categories, collections } = useContext(NavbarContext);

  const menu = categories.map((category) => ({
    label: category.name,
    link: `/collections/${category.slug}`,
    slug: category.slug,
    subMenu: category?.subCategory?.items.map((subCat) => ({
      label: subCat.name,
      link: `/collections/${subCat.slug}`,
      slug: subCat.slug,
    })),
  }));

  if (collections.length) {
    const collectionsMenu = collections.map((col) => ({
      label: col.name,
      link: `/collections/${col.slug}`,
      slug: col.slug,
    }));

    menu.push({
      label: "Ranges",
      link: "/collections/ranges",
      subMenu: collectionsMenu,
      slug: "ranges",
    });
  }

  menu.push({
    label: "Combos & Gifts",
    link: `/collections/combos-and-gifts`,
    slug: "combos-and-gifts",
  });

  menu.push({
    label: "Clearance Sale",
    link: `/collections/clearance-sale`,
    slug: "clearance-sale",
  });

  return menu;
};

export const useShippingTiers = () => {
  const { shippingTiers } = useContext(NavbarContext);
  return shippingTiers;
};

export const useCoupons = () => {
  const { coupons } = useContext(NavbarContext);
  return coupons;
};

export const useConfiguration = (key, defaultValue) => {
  const { configurations } = useContext(NavbarContext);
  const configuration = configurations.find(
    (configuration) => configuration.key === key
  );
  return configuration?.value || defaultValue;
};

export const useGuestCheckout = () => {
  const guestCheck = useConfiguration(GUEST_CHECKOUT, 0);
  const guestCookie = Cookie.get(`${STORE_PREFIX}_guest`);
  if (guestCheck === 1 || guestCookie) return true;
  return false;
};

export const useUpdateUserCoupon = () => {
  const { coupons, addUserCoupon } = useContext(NavbarContext);

  const updateUserCoupon = async (couponCode) => {
    API.graphql(
      graphqlOperation(getCoupon, {
        code: couponCode,
      })
    )
      .then((res) => res.data.getCoupon)
      .then(addUserCoupon);
  };

  return [coupons, updateUserCoupon];
};

export default NavbarProvider;
