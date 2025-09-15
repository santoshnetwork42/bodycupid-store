import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAppRouter } from "~/utils/navigation";
import { API, graphqlOperation } from "aws-amplify";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";

import ToolBox from "~/components/partials/shop/toolbox";
import ProductTwo from "~/components/features/product/product-two";
import { findProducts } from "~/graphql/api";
import Loader from "~/components/common/partials/loader";
import { errorHandler } from "~/utils/errorHandler";
import { eventActions } from "~/store/events";
import { fetchSearchItems } from "~/utils/helper";
import { setSoldOutLast } from "~/utils/products";

const gridClasses = {
  3: "cols-2 cols-sm-3",
  4: "cols-2 cols-sm-3 cols-md-4",
  5: "cols-2 cols-sm-3 cols-md-4 cols-xl-5",
  6: "cols-2 cols-sm-3 cols-md-4 cols-xl-6",
  7: "cols-2 cols-sm-3 cols-md-4 cols-lg-5 cols-xl-7",
  8: "cols-2 cols-sm-3 cols-md-4 cols-lg-5 cols-xl-8",
};

function ProductListOne(props) {
  const {
    itemsPerRow = 4,
    type = "left",
    isToolbox = true,
    products: initialData,
    pageFilter = {},
    recordSearch,
    filterItems,
    viewList,
    sectionId,
    defaultSorting,
    nextToken: fromPropsNextToken = "",
    sortBy: sortbyFromProps = [],
  } = props;

  const router = useRouter();
  const { query } = router;

  const {
    minprice,
    maxprice,
    type: gridType = "grid",
    search,
    sortby,
    slug,
  } = query;

  useEffect(() => {
    if (search?.trim()) {
      recordSearch(search?.trim());
    }
  }, [search]);

  const [applyFilters, resetFilter] = useState(
    !!sortby || !!search?.trim() || minprice || maxprice
  );
  const [token, setToken] = useState(fromPropsNextToken || null);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const perPage = 50;

  const filters = useMemo(() => {
    const sortBy = [];
    const filter = {};

    if (
      !Number.isNaN(Number(minprice)) &&
      !Number.isNaN(Number(maxprice)) &&
      Number(minprice)
    ) {
      filter.defaultPrice = {
        range: [Number(minprice), Number(maxprice)],
      };
    } else if (!Number.isNaN(Number(minprice)) && Number(minprice)) {
      filter.defaultPrice = { gte: Number(minprice) };
    } else if (!Number.isNaN(Number(maxprice)) && Number(maxprice)) {
      filter.defaultPrice = { lte: Number(maxprice) };
    }
    switch (sortby) {
      case "latest":
        sortBy.push({ field: "createdAt", direction: "desc" });
        break;
      case "popularity":
        sortBy.push({ field: "rating", direction: "desc" });
        break;
      case "price-low":
        sortBy.push({ field: "defaultPrice", direction: "asc" });
        break;
      case "price-high":
        sortBy.push({ field: "defaultPrice", direction: "desc" });
        break;
      case "availability":
        sortBy.push({ field: "defaultInventory", direction: "desc" });
        break;
      case "best-seller":
        sortBy.push({ field: "totalOrders", direction: "desc" });
        break;
      default:
        if (sortbyFromProps.length > 0) {
          sortBy.push(...sortbyFromProps);
        } else {
          sortBy.push({ field: "position", direction: "asc" });
        }
    }

    return {
      filter,
      limit: perPage,
      sort: sortBy,
      variantFilter: { status: { eq: "ENABLED" } },
      imageLimit: 1,
    };
  }, [perPage, maxprice, minprice, search, sortby]);

  const getProducts = useCallback(
    async (reset) => {
      try {
        if (!applyFilters) return;
        if (reset) setLoading(true);
        const searchTerm = search?.trim();
        if (!searchTerm) {
          const {
            data: {
              searchProducts: { items: response, total, nextToken },
            },
          } = await API.graphql(
            graphqlOperation(findProducts, {
              ...filters,
              filter: { ...filters.filter, ...pageFilter },
              nextToken: reset ? null : token,
            })
          );

          if (reset) {
            const productsMapped = setSoldOutLast(response);
            setProducts(productsMapped);
          } else {
            viewList(sectionId, "PLP", response);
            const productsMapped = setSoldOutLast([...products, ...response]);
            setProducts(productsMapped);
          }
          setToken(nextToken);
          setTotal(total);
          setLoading(false);
        } else {
          fetchSearchItems(search, 20).then((fetchedItems) => {
            const productsMapped = setSoldOutLast(fetchedItems);
            setProducts(productsMapped);
            setTotal(fetchedItems.length);

            setLoading(false);
          });
        }
      } catch (error) {
        setLoading(false);
        errorHandler(error);
      }
    },
    [filters, products, token, applyFilters, sectionId]
  );

  useEffect(() => {
    const { items, nextToken, total } = initialData || {};
    const productsMapped = setSoldOutLast(items);
    setProducts(productsMapped);
    setToken(nextToken);
    setTotal(total);
    viewList(sectionId, "PLP", items);
  }, [sectionId]);

  useEffect(() => {
    if (sectionId !== "top-products") {
      getProducts(true);
      resetFilter(true);
    }
  }, [filters]);

  if (loading) {
    return (
      <div>
        <br />
        {gridType === "grid" ? (
          <div className={`row product-wrapper ${gridClasses[itemsPerRow]}`}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
              <div
                className="product-loading-overlay"
                key={"popup-skel-" + item}
              ></div>
            ))}
          </div>
        ) : (
          <div className="row product-wrapper skeleton-body cols-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
              <div
                className="skel-pro skel-pro-list mb-4"
                key={"list-skel-" + item}
              ></div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {isToolbox && !search && (
        <ToolBox
          type={type}
          filterItems={filterItems}
          defaultSorting={defaultSorting}
        />
      )}

      <InfiniteScroll
        dataLength={products ? products.length : 0}
        next={() => {
          getProducts(false);
        }}
        style={{ overflow: "visible" }}
        hasMore={products?.length < total}
        loader={<Loader loading small />}
      >
        <div className={`row product-wrapper ${gridClasses[itemsPerRow]} pt-5`}>
          {products.map((item, index) => (
            <div className="product-wrap" key={"shop-" + item.id}>
              <ProductTwo
                priority={index < 8}
                slug={slug}
                product={item}
                section={{
                  id: sectionId,
                  name: "PLP",
                }}
                isSearch={!!search}
              />
            </div>
          ))}
        </div>

        {!total && (
          <p className="ml-1">
            No products were found matching your selection.
          </p>
        )}
      </InfiniteScroll>
    </>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, {
  recordSearch: eventActions.search,
  viewList: eventActions.viewList,
})(ProductListOne);
