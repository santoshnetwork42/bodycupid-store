import React, { createContext, useState, useContext, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import Cookie from "js-cookie";

import { STORE_ID, STORE_PREFIX } from "~/config";
import { getCoupon, getInitialData } from "~/graphql/api";
import { getSortedCategoryAndSubCategory } from "../helper";
import { errorHandler } from "../errorHandler";
import { GUEST_CHECKOUT } from "~/constant";
import { useDispatch } from "react-redux";
import { cartActions } from "~/store/cart";
import { getDefaultSorting } from "..";
import { getProductInventory } from "../products";

export const NavbarContext = createContext();

function NavbarProvider({ children }) {
  const dispatch = useDispatch();
  const [isInteractive, setIsInteractive] = useState(false);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [shippingTiers, setShippingTiers] = useState(null);
  const [coupons, setCoupons] = useState(null);
  const [configurations, setConfigurations] = useState([]);

  const getDashboardData = () => {
    API.graphql(
      graphqlOperation(getInitialData, {
        //Category
        menuCategoryFilter: {
          storeId: { eq: STORE_ID },
          isFeatured: { eq: true },
          isArchive: { eq: false },
        },
        menuCategorySubCategoryFilter: {
          isFeatured: { eq: true },
          isArchive: { eq: false },
        },
        menuCategorySort: [{ field: "priority", direction: "asc" }],
        collectionFilter: {
          storeId: { eq: STORE_ID },
          showInMenu: { eq: true },
          isArchive: { eq: false },
        },

        //Collection
        collectionSort: [{ field: "priority", direction: "asc" }],

        //Configuration
        configurationFilter: {
          storeId: { eq: STORE_ID },
        },

        //Coupon
        couponFilter: {
          isActive: { eq: true },
          storeId: { eq: STORE_ID },
          or: [
            { isFeatured: { eq: true } },
            {
              couponType: { eq: "FREEBIE" },
            },
          ],
        },

        //LtoProduct
        ltoProductFilter: {
          storeId: { eq: STORE_ID },
          recommended: { eq: true },
        },
        ltoProductSort: [{ field: "recommendPriority", direction: "asc" }],

        //Shipping
        shippingFilter: { storeId: { eq: STORE_ID } },
      })
    )
      .then((response) => {
        //Category
        const sortedCategoryAndSubCategory = getSortedCategoryAndSubCategory(
          response.data.searchProductCategories.items
        );
        setCategories(sortedCategoryAndSubCategory);

        //Collection
        setCollections(response.data.searchCollectionTypes.items);

        //Configuration
        setConfigurations(response.data.searchConfigurations.items);

        //ShippingTier
        setShippingTiers(response.data.searchShippingTiers.items);

        //Coupon
        setCoupons(
          response.data.searchCoupons.items.filter((coupon) => {
            const { expirationDate } = coupon;
            return (
              !expirationDate ||
              new Date(expirationDate).getTime() >= new Date().getTime()
            );
          })
        );

        //LtoProduct
        const ltoProducts = response.data.searchProducts.items.filter((lto) => {
          const status = lto.variants?.items?.length
            ? lto.variants?.items[0].status === "ENABLED"
            : lto.status === "ENABLED";
          const { hasInventory } = getProductInventory(lto);
          return hasInventory && status;
        });
        dispatch(cartActions.initialLTO(ltoProducts));
      })
      .catch(errorHandler);
  };

  useEffect(() => {
    if (isInteractive) {
      getDashboardData();
    }
  }, [isInteractive]);

  useEffect(() => {
    const handleMouseMovement = () => {
      setIsInteractive(true);
      // Remove the event listener after APIs are called
      window.removeEventListener("mousemove", handleMouseMovement);
      window.removeEventListener("scroll", handleMouseMovement);
    };

    window.addEventListener("mousemove", handleMouseMovement);
    window.addEventListener("scroll", handleMouseMovement);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMovement);
      window.removeEventListener("scroll", handleMouseMovement);
    };
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
        isInteractive,
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

export const useIsInteractive = () => {
  const { isInteractive } = useContext(NavbarContext);
  return !!isInteractive;
};

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
      link: `/collections/${col.slug}?sortby=${getDefaultSorting(
        col.defaultSorting
      )}`,
      slug: col.slug,
    }));

    menu.push({
      label: "Ranges",
      link: "/collections/ranges",
      subMenu: collectionsMenu,
      slug: "ranges",
    });
  }

  if (menu.length) {
    menu.push({
      label: "Combos & Gifts",
      link: `/collections/combos-and-gifts`,
      slug: "combos-and-gifts",
    });

    menu.push({
      label: "Festive Offers",
      link: "",
      slug: "festive-offers",
      subMenu: [
        {
          label: "3 Perfumes @ 1099",
          link: "/collections/fragrance-bundle-offer",
          slug: "fragrance-bundle-offer",
        },
        {
          label: "Perfume Kits @ 499",
          link: "/collections/perfumes",
          slug: "perfumes",
        },
        {
          label: "BUY 3 @ 599",
          link: "/collections/special-bundle-offer",
          slug: "special-bundle-offer",
        },
      ],
    });
    // menu.push({
    //   label: "Buy 3 @ 599",
    //   link: `/collections/special-bundle-offer`,
    //   slug: "special-bundle-offer",
    // });
  }

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
