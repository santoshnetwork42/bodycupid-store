import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API, graphqlOperation } from "aws-amplify";

import ALink from "~/components/features/custom-link";
import { getMenuCategories } from "~/graphql/api";

function MainMenu() {
  const { pathname } = useRouter();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    API.graphql(graphqlOperation(getMenuCategories)).then(
      ({
        data: {
          searchProductCategories: { items },
        },
      }) => {
        setCategories(items);
      }
    );
  }, []);

  return (
    <nav className="main-nav">
      <ul className="menu">
        <li id="menu-home" className={pathname === "/" ? "active" : ""}>
          <ALink href="/">Home</ALink>
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
              ${category?.subCategory?.items?.length ? "d-xl-show submenu" : ""}
            `}
          >
            <ALink href={`/collections/${category.slug}`}>
              {category.name}
            </ALink>
            {!!category?.subCategory?.items?.length && (
              <ul>
                {category.subCategory.items.map((item) => (
                  <li key={`sub-categories-${item.id}`}>
                    <ALink
                      href={"/collections/" + category.slug + "/" + item.slug}
                    >
                      {item.name}
                    </ALink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}

        <li>
          <ALink href="/contact">Contact</ALink>
        </li>
      </ul>
    </nav>
  );
}

export default React.memo(MainMenu);
