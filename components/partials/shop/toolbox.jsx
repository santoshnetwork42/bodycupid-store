import { useRouter } from "next/router";
import { useEffect } from "react";

import ALink from "~/components/features/custom-link";

import SidebarFilterThree from "~/components/partials/shop/sidebar/sidebar-filter-three";
import { cleanQuery } from "~/utils/helper";

export default function ToolBox(props) {
  const { type = "left" } = props;
  const router = useRouter();
  const query = router.query;
  const { maxprice, minprice, grid, limit } = query;
  const { category, subcategory, ...filterQuery } = query;
  const gridType = query.type ? query.type : "grid";
  const sortBy = query.sortby ? query.sortby : "default";
  const perPage = query.limit ? query.limit : 12;
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
    <>
      <nav
        className={`toolbox sticky-toolbox sticky-content fix-top ${
          type === "horizontal" ? "toolbox-horizontal" : ""
        }`}
      >
        {type === "horizontal" ? <SidebarFilterThree /> : ""}
        <div className="toolbox-left">
          {type === "left" ||
          type === "off-canvas" ||
          type === "navigation" ||
          type === "horizontal" ? (
            <ALink
              href="#"
              className={`toolbox-item left-sidebar-toggle btn btn-outline btn-primary btn-rounded ${
                type === "navigation"
                  ? "btn-icon-left btn-sm"
                  : "btn-sm btn-icon-right"
              } ${
                type === "off-canvas" || type === "navigation"
                  ? ""
                  : "d-lg-none"
              }`}
              onClick={showSidebar}
            >
              {type === "navigation" ? <i className="d-icon-filter-2"></i> : ""}
              Filter
              {type === "navigation" ? (
                ""
              ) : (
                <i className="d-icon-arrow-right"></i>
              )}
            </ALink>
          ) : (
            ""
          )}
          <div
            className={`toolbox-item toolbox-sort ${
              type === "boxed" || type === "banner"
                ? "select-box text-dark"
                : "select-menu"
            }`}
          >
            {(type === "boxed" || type === "banner") && <label>Sort By:</label>}
            <select
              name="orderby"
              className="form-control"
              defaultValue={query.sortby ? query.sortby : "default"}
              onChange={(e) => onChangeAttri(e, "sortby")}
            >
              <option value="default">Latest</option>
              <option value="popularity">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="toolbox-right">
          <div className="toolbox-item toolbox-show select-box text-dark">
            <label>Show :</label>
            <select
              name="count"
              className="form-control"
              value={perPage}
              onChange={(e) => onChangeAttri(e, "limit")}
            >
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="36">36</option>
            </select>
          </div>
          <div
            className={`toolbox-item toolbox-layout ${
              type === "right" ? "mr-lg-0" : ""
            }`}
          >
            <ALink
              href={{
                pathname: router.pathname,
                query: { ...query, type: "list" },
              }}
              scroll={false}
              className={`d-icon-mode-list btn-layout ${
                gridType === "list" ? "active" : ""
              }`}
            ></ALink>
            <ALink
              href={{
                pathname: router.pathname,
                query: { ...query, type: "grid" },
              }}
              scroll={false}
              className={`d-icon-mode-grid btn-layout ${
                gridType !== "list" ? "active" : ""
              }`}
            ></ALink>
          </div>

          {type === "right" ? (
            <ALink
              href="#"
              className="toolbox-item right-sidebar-toggle btn btn-sm btn-outline btn-primary btn-rounded btn-icon-right d-lg-none"
              onClick={showSidebar}
            >
              Filter<i className="d-icon-arrow-left"></i>
            </ALink>
          ) : (
            ""
          )}
        </div>
      </nav>
      <div className="filters-container d-flex mb-5 flex-wrap align-items-center">
        {!!category && category !== "all" && (
          <div className="selected-filter-tags d-flex align-items-center">
            <span className="text-capitalize">
              {category.replaceAll("-", " ")}
            </span>
            <ALink
              href={{
                pathname: "/collections/[category]",
                query: cleanQuery({
                  ...filterQuery,
                  category: "all",
                  grid: grid,
                  type: router.query.type ? router.query.type : null,
                  limit: limit ? limit : null,
                }),
              }}
              className="product-remove"
            >
              <i className="fas fa-times"></i>
            </ALink>
          </div>
        )}

        {!!subcategory && (
          <div className="selected-filter-tags d-flex align-items-center">
            <span className="text-capitalize">
              {subcategory.replaceAll("-", " ")}
            </span>
            <ALink
              href={{
                pathname: "/collections/[category]",
                query: cleanQuery({
                  ...filterQuery,
                  category: category,
                  grid: grid,
                  type: router.query.type ? router.query.type : null,
                  limit: limit ? limit : null,
                }),
              }}
              className="product-remove"
              title="Remove coupon"
            >
              <i className="fas fa-times"></i>
            </ALink>
          </div>
        )}
        {!!minprice && (
          <div className="selected-filter-tags d-flex align-items-center">
            <span className="text-capitalize">Minmum Price : ₹{minprice}</span>
            <ALink
              href={{
                pathname: router.pathname,
                query: cleanQuery({
                  subcategory: subcategory || null,
                  category: category,
                  grid: grid,
                  type: router.query.type ? router.query.type : null,
                  limit: limit ? limit : null,
                  maxprice: maxprice ? maxprice : null,
                }),
              }}
              className="product-remove"
              title="Remove coupon"
            >
              <i className="fas fa-times"></i>
            </ALink>
          </div>
        )}
        {!!maxprice && (
          <div className="selected-filter-tags d-flex align-items-center">
            <span className="text-capitalize">Maximum Price : ₹{maxprice}</span>
            <ALink
              href={{
                pathname: router.pathname,
                query: cleanQuery({
                  subcategory: subcategory || null,
                  category: category,
                  grid: grid,
                  type: router.query.type ? router.query.type : null,
                  limit: limit ? limit : null,
                  minprice: minprice ? minprice : null,
                }),
              }}
              className="product-remove"
              title="Remove coupon"
            >
              <i className="fas fa-times"></i>
            </ALink>
          </div>
        )}
      </div>
    </>
  );
}
