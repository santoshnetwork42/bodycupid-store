import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import InputRange from "react-input-range";
import SlideToggle from "react-slide-toggle";
import { API, graphqlOperation } from "aws-amplify";

import ALink from "~/components/features/custom-link";
import Card from "~/components/features/accordion/card";
import { getMenuCategories } from "~/graphql/api";
import { scrollTopHandler } from "~/utils";
import { cleanQuery } from "~/utils/helper";

function SidebarFilterOne(props) {
  const { type = "left" } = props;

  const [sidebarData, setSidebarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const query = router.query;

  const [filterPrice, setPrice] = useState({
    max: query.maxprice ? parseInt(query.maxprice) : 3000,
    min: query.minprice ? parseInt(query.minprice) : 0,
  });
  const [isFirst, setFirst] = useState(true);
  let timerId;

  useEffect(() => {
    (async function () {
      const {
        data: {
          searchProductCategories: { items: categories },
        },
      } = await API.graphql(graphqlOperation(getMenuCategories));
      setSidebarData({ categories });
      setLoading(false);
    })();
  }, []);

  console.log(sidebarData);
  useEffect(() => {
    window.addEventListener("resize", hideSidebar);

    return () => {
      window.removeEventListener("resize", hideSidebar);
    };
  }, []);

  useEffect(() => {
    setPrice({
      max: query.maxprice ? parseInt(query.maxprice) : 3000,
      min: query.minprice ? parseInt(query.minprice) : 0,
    });
    if (isFirst) {
      setFirst(false);
    } else {
      scrollTopHandler();
    }
  }, [query]);

  const filterByPrice = (e) => {
    e.preventDefault();
    let url = router.pathname.replace("[grid]", query.grid);
    let arr = [`minprice=${filterPrice.min}`, `maxprice=${filterPrice.max}`];
    for (let key in query) {
      if (key !== "minprice" && key !== "maxprice" && key !== "grid")
        arr.push(key + "=" + query[key]);
    }
    url = url + "?" + arr.join("&");
    router.push(url);
  };

  const onChangePrice = (value) => {
    setPrice(value);
  };

  const toggleSidebar = (e) => {
    e.preventDefault();
    document
      .querySelector("body")
      .classList.remove(
        `${
          type === "left" || type === "off-canvas"
            ? "sidebar-active"
            : "right-sidebar-active"
        }`
      );

    let stickyWraper = e.currentTarget.closest(".sticky-sidebar-wrapper");

    let mainContent = e.currentTarget.closest(".main-content-wrap");
    if (mainContent && type !== "off-canvas" && query.grid !== "4cols")
      mainContent.querySelector(".row.product-wrapper") &&
        mainContent
          .querySelector(".row.product-wrapper")
          .classList.toggle("cols-md-4");

    if (mainContent && stickyWraper) {
      stickyWraper.classList.toggle("closed");

      if (stickyWraper.classList.contains("closed")) {
        mainContent.classList.add("overflow-hidden");
        clearTimeout(timerId);
      } else {
        timerId = setTimeout(() => {
          mainContent.classList.remove("overflow-hidden");
        }, 500);
      }
    }
  };

  const showSidebar = (e) => {
    e.preventDefault();
    document.querySelector("body").classList.add("sidebar-active");
  };

  const hideSidebar = () => {
    document
      .querySelector("body")
      .classList.remove(
        `${
          type === "left" ||
          type === "off-canvas" ||
          type === "boxed" ||
          type === "banner"
            ? "sidebar-active"
            : "right-sidebar-active"
        }`
      );
  };

  return (
    <aside
      className={`col-lg-3 shop-sidebar skeleton-body ${
        type === "off-canvas" ? "" : "sidebar-fixed sticky-sidebar-wrapper"
      } ${
        type === "off-canvas" || type === "boxed" ? "" : "sidebar-toggle-remain"
      } ${
        type === "left" ||
        type === "off-canvas" ||
        type === "boxed" ||
        type === "banner"
          ? "sidebar"
          : "right-sidebar"
      }`}
    >
      <div className="sidebar-overlay" onClick={hideSidebar}></div>
      {type === "boxed" || type === "banner" ? (
        <a href="#" className="sidebar-toggle" onClick={showSidebar}>
          <i className="fas fa-chevron-right"></i>
        </a>
      ) : (
        ""
      )}
      <ALink className="sidebar-close" href="#" onClick={hideSidebar}>
        <i className="d-icon-times"></i>
      </ALink>

      <div className="sidebar-content">
        {!loading && sidebarData ? (
          <div className="sticky-sidebar">
            {type === "boxed" || type === "banner" ? (
              ""
            ) : (
              <div className="filter-actions mb-4">
                <a
                  href="#"
                  className="sidebar-toggle-btn toggle-remain btn btn-outline btn-primary btn-icon-right btn-rounded"
                  onClick={toggleSidebar}
                >
                  Filter
                  {type === "left" || type === "off-canvas" ? (
                    <i className="d-icon-arrow-left"></i>
                  ) : (
                    <i className="d-icon-arrow-right"></i>
                  )}
                </a>
                <ALink
                  href={{
                    pathname: router.pathname,
                    query: cleanQuery({
                      subcategory: query.subcategory || null,
                      category: query.category,
                      grid: query.grid,
                      type: router.query.type ? router.query.type : null,
                    }),
                  }}
                  scroll={false}
                  className="filter-clean"
                >
                  Clean All
                </ALink>
              </div>
            )}

            <div className="widget widget-collapsible">
              <Card
                title="<h3 class='widget-title'>All Categories<span class='toggle-btn p-0 parse-content'></span></h3>"
                type="parse"
                expanded={true}
              >
                <ul className="widget-body filter-items search-ul">
                  {sidebarData.categories.map((item, index) =>
                    item.subCategory.items.length > 0 ? (
                      <li
                        key={item.name + " - " + index}
                        className={`with-ul overflow-hidden ${
                          item.slug === query.category ||
                          item.subCategory.items.findIndex(
                            (subCat) => subCat.slug === query.subcategory
                          ) > -1
                            ? "show"
                            : ""
                        } `}
                      >
                        <SlideToggle collapsed={true}>
                          {({
                            onToggle,
                            setCollapsibleElement,
                            toggleState,
                          }) => (
                            <>
                              <ALink
                                href={{
                                  pathname: "/collections/[category]",
                                  query: cleanQuery({
                                    category: item.slug,
                                    grid: query.grid,
                                    type: router.query.type || null,
                                  }),
                                }}
                                scroll={false}
                              >
                                {item.name}
                                <i
                                  className={`fas fa-chevron-down ${toggleState.toLowerCase()}`}
                                  onClick={(e) => {
                                    onToggle();
                                    e.stopPropagation();
                                    e.preventDefault();
                                  }}
                                ></i>
                              </ALink>

                              <div ref={setCollapsibleElement}>
                                <div>
                                  <ul style={{ display: "block" }}>
                                    {item.subCategory.items.map(
                                      (subItem, index) => (
                                        <li
                                          key={subItem.name + " - " + index}
                                          className={`with-ul ${
                                            subItem.slug === query.category
                                              ? "show"
                                              : ""
                                          } `}
                                        >
                                          <ALink
                                            scroll={false}
                                            href={{
                                              pathname:
                                                "/collections/[category]/[subcategory]",
                                              query: cleanQuery({
                                                category: item.slug,
                                                subcategory: subItem.slug,
                                                grid: query.grid,
                                                type: router.query.type || null,
                                              }),
                                            }}
                                          >
                                            {subItem.name}
                                          </ALink>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}
                        </SlideToggle>
                      </li>
                    ) : (
                      <li
                        className={query.category === item.slug ? "show" : ""}
                        key={item.name + " - " + index}
                      >
                        <ALink
                          href={{
                            pathname: "/collections/[category]",
                            query: cleanQuery({
                              category: item.slug,
                              grid: query.grid,
                              type: router.query.type || null,
                            }),
                          }}
                          scroll={false}
                        >
                          {item.name}
                        </ALink>
                      </li>
                    )
                  )}
                </ul>
              </Card>
            </div>

            <div className="widget widget-collapsible">
              <Card
                title="<h3 class='widget-title'>Filter by Price<span class='toggle-btn p-0 parse-content'></span></h3>"
                type="parse"
                expanded={true}
              >
                <div className="widget-body">
                  <form action="#">
                    <div className="filter-price-slider noUi-target noUi-ltr noUi-horizontal shop-input-range">
                      <InputRange
                        formatLabel={(value) => `$${value}`}
                        maxValue={3000}
                        minValue={0}
                        step={50}
                        value={filterPrice}
                        onChange={onChangePrice}
                      />
                    </div>

                    <div className="filter-actions">
                      <div className="filter-price-text mb-4">
                        Price: ₹{filterPrice.min} - ₹{filterPrice.max}
                        <span className="filter-price-range"></span>
                      </div>

                      <button
                        className="btn btn-dark btn-filter btn-rounded"
                        onClick={filterByPrice}
                      >
                        Filter
                      </button>
                    </div>
                  </form>
                </div>
              </Card>
            </div>

            {/* <div className="widget widget-collapsible">
              <Card
                title="<h3 class='widget-title'>Size<span class='toggle-btn p-0 parse-content'></span></h3>"
                type="parse"
                expanded={true}
              >
                <ul className="widget-body filter-items">
                  {filterData.sizes.map((item, index) => (
                    <li
                      className={
                        containsAttrInUrl("sizes", item.slug) ? "active" : ""
                      }
                      key={item + " - " + index}
                    >
                      <ALink
                        scroll={false}
                        href={{
                          pathname: router.pathname,
                          query: {
                            ...query,
                            page: 1,
                            sizes: getUrlForAttrs("sizes", item.slug),
                            type: router.query.type ? router.query.type : null,
                          },
                        }}
                      >
                        {item.name}
                      </ALink>
                    </li>
                  ))}
                </ul>
              </Card>
            </div> */}

            {/* <div className="widget widget-collapsible">
              <Card
                title="<h3 class='widget-title'>Color<span class='toggle-btn p-0 parse-content'></span></h3>"
                type="parse"
                expanded={true}
              >
                <ul className="widget-body filter-items">
                  {filterData.colors.map((item, index) => (
                    <li
                      className={
                        containsAttrInUrl("colors", item.slug) ? "active" : ""
                      }
                      key={item + " - " + index}
                    >
                      <ALink
                        scroll={false}
                        href={{
                          pathname: router.pathname,
                          query: {
                            ...query,
                            page: 1,
                            colors: getUrlForAttrs("colors", item.slug),
                            type: router.query.type ? router.query.type : null,
                          },
                        }}
                      >
                        {item.name}
                      </ALink>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div className="widget widget-collapsible">
              <Card
                title="<h3 class='widget-title'>Brand<span class='toggle-btn p-0 parse-content'></span></h3>"
                type="parse"
                expanded={true}
              >
                <ul className="widget-body filter-items">
                  {filterData.brands.map((item, index) => (
                    <li
                      className={
                        containsAttrInUrl("brands", item.slug) ? "active" : ""
                      }
                      key={item + " - " + index}
                    >
                      <ALink
                        scroll={false}
                        href={{
                          pathname: router.pathname,
                          query: {
                            ...query,
                            page: 1,
                            brands: getUrlForAttrs("brands", item.slug),
                            type: router.query.type ? router.query.type : null,
                          },
                        }}
                      >
                        {item.name}
                      </ALink>
                    </li>
                  ))}
                </ul>
              </Card>
            </div> */}

            {/* <div className="widget widget-products widget-collapsible">
              <h4 className="widget-title">Our Featured</h4>

              <div className="widget-body">
                <OwlCarousel adClass="owl-nav-top">
                  <div className="products-col">
                    {sidebarData.featured.slice(0, 3).map((item, index) => (
                      <SmallProduct
                        product={item}
                        key={item.name + " - " + index}
                      />
                    ))}
                  </div>
                  <div className="products-col">
                    {sidebarData.featured.slice(3, 6).map((item, index) => (
                      <SmallProduct
                        product={item}
                        key={item.name + " - " + index}
                      />
                    ))}
                  </div>
                </OwlCarousel>
              </div>
            </div> */}
          </div>
        ) : (
          <div className="widget-2 mt-10 pt-5"></div>
        )}
      </div>
    </aside>
  );
}

export default React.memo(SidebarFilterOne);
