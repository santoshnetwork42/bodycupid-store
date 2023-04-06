import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API, graphqlOperation } from "aws-amplify";

import ALink from "~/components/features/custom-link";
import { getMenuCategories } from "~/graphql/api";
import { STORE_ID } from "~/config";

function MainMenu() {
  const { pathname } = useRouter();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = useCallback(() => {
    API.graphql(
      graphqlOperation(getMenuCategories, {
        filter: { storeId: { eq: STORE_ID } },
      })
    ).then(
      ({
        data: {
          searchProductCategories: { items },
        },
      }) => {
        setCategories(items);
      }
    );
  }, []);

  const getSmallerArrays = (a) => {
    let arrayOfArrays = [];
    for (let i = 0; i < a.length; i += 8) {
      arrayOfArrays.push([...a].splice(i, 8));
    }
    return arrayOfArrays;
  };

  return (
    <nav className="main-nav">
      <ul className="menu">
        <li
          id="all"
          className={pathname === "/collections/all" ? "active" : ""}
        >
          <ALink href="/collections/all">All Products</ALink>
        </li>

        {categories.map((category) => (
          <li
            key={category.id}
            className={`
              ${
                pathname.includes(`/collections/${category.slug}`)
                  ? "active"
                  : ""
              }
              ${category?.subCategory?.items?.length ? "submenu" : ""}
            `}
          >
            <ALink href={`/collections/${category.slug}`}>
              {category.name}
            </ALink>
            <div className="megamenu">
              <div className="d-flex">
                {getSmallerArrays(category?.subCategory?.items).map((cat) => (
                  <div className="ml-2 mr-2">
                    {!!cat.length && (
                      <ul>
                        {cat.map((item) => (
                          <li key={`sub-categories-${item.id}`}>
                            <ALink
                              className="cat-name"
                              href={
                                "/collections/" +
                                category.slug +
                                "/" +
                                item.slug
                              }
                            >
                              {item.name}
                            </ALink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default React.memo(MainMenu);
