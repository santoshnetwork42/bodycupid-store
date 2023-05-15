import React, {
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { API, graphqlOperation } from "aws-amplify";

import { STORE_ID } from "~/config";
import { getMenuCategories, listCollections } from "~/graphql/api";
import { getSortedCategoryAndSubCategory } from "../helper";
import { errorHandler } from "../errorHandler";

export const NavbarContext = createContext();

function NavbarProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);

  const getCollections = () => {
    API.graphql(
      graphqlOperation(listCollections, {
        filter: { storeId: { eq: STORE_ID }, showInMenu: { eq: true } },
        sort: [{ field: "priority", direction: "asc" }],
      })
    )
      .then(
        ({
          data: {
            listCollections: { items },
          },
        }) => {
          setCollections(items);
        }
      )
      .catch(errorHandler);
  };

  const getCategories = () => {
    API.graphql(
      graphqlOperation(getMenuCategories, {
        filter: { storeId: { eq: STORE_ID } },
        sort: [{ field: "priority", direction: "asc" }],
      })
    )
      .then(
        ({
          data: {
            searchProductCategories: { items },
          },
        }) => {
          const sortedItems = getSortedCategoryAndSubCategory(items);
          setCategories(sortedItems);
        }
      )
      .catch(errorHandler);
  };

  useEffect(() => {
    getCategories();
    getCollections();
  }, []);

  return (
    <NavbarContext.Provider value={{ categories, collections }}>
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

export default NavbarProvider;
