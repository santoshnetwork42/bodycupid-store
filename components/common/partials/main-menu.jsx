import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API, graphqlOperation } from "aws-amplify";

import ALink from "~/components/features/custom-link";
import { getMenuCategories } from "~/graphql/api";
import { STORE_ID } from "~/config";

function MainMenu() {
  const { pathname } = useRouter();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
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
        setSubCategories(items.map((e) => e.subCategory?.items).flat());
        setCategories(items);
      }
    );
  }, []);

  return (
    <nav className="main-nav">
      <ul className="menu">
        <li
          id="all"
          className={pathname === "/collections/all" ? "active" : ""}
        >
          <ALink href="/collections/all">All Products</ALink>
        </li>

        {subCategories.map((category) => {
          return (
            category.isFeatured && (
              <li
                key={category.id}
                className={`
                ${
                  pathname.includes(`/collections/${category.slug}`)
                    ? "active"
                    : ""
                }
                ${
                  category?.subCategory?.items?.length
                    ? "d-xl-show submenu"
                    : ""
                }
              `}
              >
                <ALink href={`/collections/${category.slug}`}>
                  {category.name}
                </ALink>
              </li>
            )
          );
        })}
      </ul>
    </nav>
  );
}

export default React.memo(MainMenu);
