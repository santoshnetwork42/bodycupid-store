import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API, graphqlOperation } from "aws-amplify";

import ALink from "~/components/features/custom-link";
import { listProductCategories } from "~/graphql/queries";

function MainMenu() {
  const { pathname } = useRouter();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    API.graphql(graphqlOperation(listProductCategories, { limit: 4 })).then(
      ({
        data: {
          listProductCategories: { items },
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
                pathname.includes(`/categories/${category.slug}`)
                  ? "active"
                  : ""
              }
              ${category?.subCategory?.items?.length ? "d-xl-show submenu" : ""}
            `}
          >
            <ALink href={`/categories/${category.slug}`}>{category.name}</ALink>
            {!!category?.subCategory?.items?.length && (
              <ul>
                {category.subCategory.items.map((item) => (
                  <li key={`sub-categories-${item.id}`}>
                    <ALink href={"/categories/" + item.slug}>{item.name}</ALink>
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

export default MainMenu;
