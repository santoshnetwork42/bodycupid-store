import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";
import { Cross } from "~/components/icons";
import Card from "~/components/features/accordion/card";
import { getMenuCategories } from "~/graphql/api";
import { STORE_ID } from "~/config";
import { getSortedCategoryAndSubCategory } from "~/utils/helper";

function MobileMenu({ user }) {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
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

  useEffect(() => {
    window.addEventListener("resize", hideMobileMenuHandler);
    document.querySelector("body").addEventListener("click", onBodyClick);

    return () => {
      window.removeEventListener("resize", hideMobileMenuHandler);
      document.querySelector("body").removeEventListener("click", onBodyClick);
    };
  }, []);

  useEffect(() => {
    setSearch("");
  }, [router.query.slug]);

  const hideMobileMenuHandler = () => {
    if (window.innerWidth > 991) {
      document.querySelector("body").classList.remove("mmenu-active");
    }
  };

  const hideMobileMenu = () => {
    document.querySelector("body").classList.remove("mmenu-active");
  };

  function onSearchChange(e) {
    setSearch(e.target.value);
  }

  function onBodyClick(e) {
    if (e.target.closest(".header-search"))
      return (
        e.target.closest(".header-search").classList.contains("show-results") ||
        e.target.closest(".header-search").classList.add("show-results")
      );

    document.querySelector(".header-search.show") &&
      document.querySelector(".header-search.show").classList.remove("show");
    document.querySelector(".header-search.show-results") &&
      document
        .querySelector(".header-search.show-results")
        .classList.remove("show-results");
  }

  async function onSubmitSearchForm(e) {
    e.preventDefault();
    await router.push({
      pathname: "/collections/all",
      query: {
        search: search,
      },
    });
    hideMobileMenu();
  }

  const handleLogout = useCallback(async () => {
    await Auth.signOut();
    router.push("/");
    return true;
  }, []);

  return (
    <div className="mobile-menu-wrapper">
      <div className="mobile-menu-overlay" onClick={hideMobileMenu}></div>

      <ALink className="mobile-menu-close" href="#" onClick={hideMobileMenu}>
        <i>
          <Cross color="currentColor" />
        </i>
      </ALink>

      <div className="mobile-menu-container scrollable">
        <ul className="mobile-menu mmenu-anim">
          <li>
            {categories.map((category) => (
              <Card
                title={category.name}
                type="mobile"
                url={`/collections/${category.slug}`}
              >
                <ul>
                  {category.subCategory.items.map((item) => (
                    <li key={item.id}>
                      <ALink
                        href={"/collections/" + category.slug + "/" + item.slug}
                      >
                        {item.name}
                      </ALink>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </li>

          {/* <li>
            <Card
              title="Products"
              type="mobile"
              url="/product/fashionable-leather-satchel"
            >
              <ul>
                <li>
                  <Card title="Product Pages" type="mobile">
                    <ul>
                      {mainMenu.product.pages.map((item, index) => (
                        <li key={`product-${item.title}`}>
                          <ALink href={"/" + item.url}>
                            {item.title}
                            {item.hot ? (
                              <span className="tip tip-hot">Hot</span>
                            ) : (
                              ""
                            )}
                          </ALink>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </li>

                <li>
                  <Card title="Product Layouts" type="mobile">
                    <ul>
                      {mainMenu.product.layout.map((item, index) => (
                        <li key={`product-${item.title}`}>
                          <ALink href={"/" + item.url}>
                            {item.title}
                            {item.new ? (
                              <span className="tip tip-new">New</span>
                            ) : (
                              ""
                            )}
                          </ALink>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </li>
              </ul>
            </Card>
          </li> */}

          {/* <li>
            <Card title="Pages" type="mobile" url="/pages/about-us">
              <ul>
                {mainMenu.other.map((item, index) => (
                  <li key={`other-${item.title}`}>
                    <ALink href={"/" + item.url}>
                      {item.title}
                      {item.new ? <span className="tip tip-new">New</span> : ""}
                    </ALink>
                  </li>
                ))}
              </ul>
            </Card>
          </li>

          <li>
            <Card title="Blog" type="mobile" url="/blog/classic">
              <ul>
                {mainMenu.blog.map((item, index) =>
                  item.subPages ? (
                    <li key={"blog" + item.title}>
                      <Card
                        title={item.title}
                        url={"/" + item.url}
                        type="mobile"
                      >
                        <ul>
                          {item.subPages.map((item, index) => (
                            <li key={`blog-${item.title}`}>
                              <ALink href={"/" + item.url}>{item.title}</ALink>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </li>
                  ) : (
                    <li
                      key={"blog" + item.title}
                      className={item.subPages ? "submenu" : ""}
                    >
                      <ALink href={"/" + item.url}>{item.title}</ALink>
                    </li>
                  )
                )}
              </ul>
            </Card>
          </li>

          <li>
            <Card title="elements" type="mobile" url="/elements">
              <ul>
                {mainMenu.element.map((item, index) => (
                  <li key={`elements-${item.title}`}>
                    <ALink href={"/" + item.url}>{item.title}</ALink>
                  </li>
                ))}
              </ul>
            </Card>
          </li> */}

          {/* <li className="mb-4 border-no">
            <a href="https://d-themes.com/buynow/riodereact">Buy Wow!</a>
          </li> */}

          {!user ? (
            <li>
              <ALink href={"/pages/login"}>Login</ALink>
            </li>
          ) : (
            <li>
              <ALink href={"/"} onClick={handleLogout}>
                Logout
              </ALink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
  };
}

export default connect(mapStateToProps)(MobileMenu);
