import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API, graphqlOperation } from "aws-amplify";

import ALink from "~/components/features/custom-link";
import { DownAngle } from "~/components/icons";
import { getMenuCategories } from "~/graphql/api";
import { STORE_ID } from "~/config";
import {
  getSortedCategoryAndSubCategory,
  getSplitedArray,
} from "~/utils/helper";

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
        sort: [{ field: "priority", direction: "asc" }],
      })
    ).then(
      ({
        data: {
          searchProductCategories: { items },
        },
      }) => {
        const sortedItems = getSortedCategoryAndSubCategory(items);
        setCategories(sortedItems);
      }
    );
  }, []);

  return (
    <nav className="main-nav">
      <ul className="menu">
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
            <ALink className='text-uppercase' href={`/collections/${category.slug}`}>
              {category.name}
              <i>
                <DownAngle color="currentColor" size={12} />
              </i>
            </ALink>
            {!!category?.subCategory?.items?.length && (
              <div className="megamenu" >
                <div className="d-flex">
                  {getSplitedArray(category?.subCategory?.items, 10).map(
                    (cat, i) => (
                      <div className="ml-2 mr-2" key={`cat-${i}`}>
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
                    )
                  )}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default React.memo(MainMenu);
