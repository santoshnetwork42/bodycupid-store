import { useEffect } from "react";
import { useRouter } from "next/router";

import ALink from "~/components/features/custom-link";

import SidebarFilterThree from "~/components/partials/shop/sidebar/sidebar-filter-three";
import { cleanQuery } from "~/utils/helper";

export default function ToolBox(props) {
  const { type = "left", filterItems } = props;
  const router = useRouter();
  const query = router.query;
  const { asPath } = router;
  const { grid } = query;
  const { category, subcategory, ...filterQuery } = query;
  const gridType = query.type ? query.type : "grid";
  let tmp = 0;

  useEffect(() => {
    window.addEventListener("scroll", stickyToolboxHandler);

    return () => {
      window.removeEventListener("scroll", stickyToolboxHandler);
    };
  }, []);

  const onChangeAttri = (e, attri) => {
    e.preventDefault();

    let url = router.pathname.replace("[grid]", query.grid);
    let arr =
      e.target.value !== "default" ? [`${attri}=${e.target.value}`] : [];
    for (let key in query) {
      if (key !== attri && key !== "grid") arr.push(key + "=" + query[key]);
    }
    url = url + "?" + arr.join("&");
    router.push(url);
  };

  const showSidebar = () => {
    if (type === "navigation" && window.innerWidth > 991) {
      document.querySelector(".navigation-toggle-btn").click();
    } else {
      document
        .querySelector("body")
        .classList.add(
          `${
            type === "left" ||
            type === "off-canvas" ||
            type === "navigation" ||
            type === "horizontal"
              ? "sidebar-active"
              : "right-sidebar-active"
          }`
        );
    }
  };

  const stickyToolboxHandler = (e) => {
    let top = document.querySelector(".page-content")
      ? document.querySelector(".page-content").offsetTop +
        document.querySelector("header").offsetHeight +
        100
      : 600;
    let stickyToolbox = document.querySelector(".sticky-toolbox");
    let height = 0;

    if (stickyToolbox) {
      height = stickyToolbox.offsetHeight;
    }

    if (
      window.pageYOffset >= top &&
      window.innerWidth < 768 &&
      e.currentTarget.scrollY < tmp
    ) {
      if (stickyToolbox) {
        if (!document.querySelector(".sticky-toolbox-wrapper")) {
          let newNode = document.createElement("div");
          newNode.className = "sticky-toolbox-wrapper";
          stickyToolbox.parentNode.insertBefore(newNode, stickyToolbox);
          document
            .querySelector(".sticky-toolbox-wrapper")
            .insertAdjacentElement("beforeend", stickyToolbox);
          document
            .querySelector(".sticky-toolbox-wrapper")
            .setAttribute("style", "height: " + height + "px");
        }

        if (
          !document
            .querySelector(".sticky-toolbox-wrapper")
            .getAttribute("style")
        ) {
          document
            .querySelector(".sticky-toolbox-wrapper")
            .setAttribute("style", "height: " + height + "px");
        }
      }
    } else {
      if (document.querySelector(".sticky-toolbox-wrapper")) {
        document
          .querySelector(".sticky-toolbox-wrapper")
          .removeAttribute("style");
      }
    }

    if (
      window.outerWidth > 767 &&
      document.querySelector(".sticky-toolbox-wrapper")
    ) {
      document.querySelector(".sticky-toolbox-wrapper").style.height = "auto";
    }

    tmp = e.currentTarget.scrollY;
  };

  return (
    <div>
      <nav
        className={`toolbox sticky-toolbox sticky-content fix-top mt-4 ${
          type === "horizontal" ? "toolbox-horizontal" : ""
        }`}
      >
        {type === "horizontal" ? <SidebarFilterThree /> : ""}
        <div className="toolbox-left d-flex justify-content-between w-100">
          {!!filterItems?.length && (
            <div className="filters-container d-flex mb-5 align-items-center">
              {filterItems.map((item, i) => {
                return (
                  <ALink
                    key={`${i}-${item.pathname}`}
                    className={`sub-category-tag ${
                      (asPath === item.path ||
                        asPath.includes(`${item.path}?`)) &&
                      "selected-sub-category-tag"
                    }`}
                    href={{
                      pathname: item.path,
                    }}
                  >
                    <p className="m-0">{item.name}</p>
                  </ALink>
                );
              })}
            </div>
          )}
          <div
            className={`toolbox-item toolbox-sort ${
              type === "boxed" || type === "banner"
                ? "select-box text-dark"
                : "select-menu"
            }`}
          >
            <label className="sort-by">Sort By: </label>
            <div className="d-flex justify-content-center align-items-center">
              <select
                name="orderby"
                className="form-control"
                defaultValue={query.sortby ? query.sortby : "default"}
                onChange={(e) => onChangeAttri(e, "sortby")}
              >
                <option value="default">Recommended</option>
                <option value="latest">Latest</option>
                <option value="best-seller">Best sellers</option>
                <option value="popularity">Highest rated</option>
                <option value="price-high">Price - High to Low</option>
                <option value="price-low">Price - Low to High</option>
              </select>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
