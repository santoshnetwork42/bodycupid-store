import React, { createContext, useState, useContext, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";

import { STORE_ID } from "~/config";
import {
  getMenuCategories,
  listCollections,
  searchShippingTiers,
  getFeaturedCoupon,
  searchConfigurations,
} from "~/graphql/api";
import { getSortedCategoryAndSubCategory } from "../helper";
import { errorHandler } from "../errorHandler";

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
          isFeatured: { eq: true },
          isActive: { eq: true },
          storeId: { eq: STORE_ID },
        },
      },
    })
      .then(
        (getFeaturedCouponResponse) =>
          getFeaturedCouponResponse.data.searchCouponCodes.items
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

  const getConfigurationData = async () => {
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
    if (config?.coupons && !coupons) {
      getCoupons();
    }
  }, [config?.coupons]);

  useEffect(() => {
    getCategories();
    getCollections();
    getConfigurationData();
  }, []);

  return (
    <NavbarContext.Provider
      value={{
        categories,
        collections,
        shippingTiers,
        coupons,
        configurations,
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
    subMenu: category?.subCategory?.items.map((subCat) => ({
      label: subCat.name,
      link: `/collections/${subCat.slug}`,
    })),
  }));

  if (collections.length) {
    const collectionsMenu = collections.map((col) => ({
      label: col.name,
      link: `/collections/${col.slug}`,
    }));

    menu.push({
      label: "Ranges",
      link: "/collections/ranges",
      subMenu: collectionsMenu,
    });
  }

  menu.push({ label: "Combos & Gifts", link: `/collections/combos-and-gifts` });
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

export default NavbarProvider;
