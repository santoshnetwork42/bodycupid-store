import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { API, graphqlOperation } from "aws-amplify";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";

import ToolBox from "~/components/partials/shop/toolbox";
import ProductTwo from "~/components/features/product/product-two";
import ProductEight from "~/components/features/product/product-eight";
import { findProducts } from "~/graphql/api";
import Loader from "~/components/common/partials/loader";
import { errorHandler } from "~/utils/errorHandler";
import { eventActions } from "~/store/events";

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
    categoryId,
    subCategoryId,
    tagId,
    pageFilter = {},
    subCategories,
    recordSearch,
    viewList,
  } = props;

  const sectionId = tagId || subCategoryId || categoryId;

  const router = useRouter();
  const { query } = router;

  const {
    minprice,
    maxprice,
    type: gridType = "grid",
    search,
    sortby,
    category,
  } = query;

  useEffect(() => {
    if (search?.trim()) {
      recordSearch(search?.trim());
    }
  }, [search]);

  const [applyFilters, resetFilter] = useState(
    !!sortby || !!search?.trim() || minprice || maxprice
  );
  const [token, setToken] = useState(null);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const perPage = 50;

  const filters = useMemo(() => {
    const sortBy = [];
    const filter = {};
    if (!!search?.trim()) {
      filter.title = { matchPhrasePrefix: search };
    }

    if (
      !Number.isNaN(Number(minprice)) &&
      !Number.isNaN(Number(maxprice)) &&
      Number(minprice)
    ) {
      filter.price = {
        range: [Number(minprice), Number(maxprice)],
      };
    } else if (!Number.isNaN(Number(minprice)) && Number(minprice)) {
      filter.price = { gte: Number(minprice) };
    } else if (!Number.isNaN(Number(maxprice)) && Number(maxprice)) {
      filter.price = { lte: Number(maxprice) };
    }
    switch (sortby) {
      case "popularity":
        sortBy.push({ field: "rating", direction: "desc" });
        break;
      case "price-low":
        sortBy.push({ field: "price", direction: "asc" });
        break;
      case "price-high":
        sortBy.push({ field: "price", direction: "desc" });
        break;
      case "best-seller":
        filter.collections = { eq: "best-seller" };
        break;
      default:
    }

    return { filter, limit: perPage, sort: sortBy };
  }, [perPage, maxprice, minprice, search, sortby]);

  const getProducts = useCallback(
    async (reset) => {
      try {
        if (!applyFilters) return;
        if (reset) setLoading(true);
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
          setProducts(response);
        } else {
          viewList(sectionId, "PLP", response);
          setProducts([...products, ...response]);
        }
        setToken(nextToken);
        setTotal(total);
        setLoading(false);
      } catch (error) {
        errorHandler(error);
      }
    },
    [filters, products, token, applyFilters, sectionId]
  );

  useEffect(() => {
    const { items, nextToken, total } = initialData || {};
    setProducts(items);
    setToken(nextToken);
    setTotal(total);
    viewList(sectionId, "PLP", items);
  }, [categoryId, subCategoryId, tagId]);

  useEffect(() => {
    getProducts(true);
    resetFilter(true);
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
      {isToolbox && <ToolBox type={type} subCategories={subCategories} />}

      <InfiniteScroll
        dataLength={products ? products.length : 0}
        next={() => {
          getProducts(false);
        }}
        style={{ overflow: "visible" }}
        hasMore={products.length < total}
        loader={<Loader loading small />}
      >
        {gridType === "grid" ? (
          <div className={`row product-wrapper ${gridClasses[itemsPerRow]}`}>
            {products.map((item) => (
              <div className="product-wrap" key={"shop-" + item.id}>
                <ProductTwo
                  slug={category}
                  product={item}
                  section={{
                    id: tagId || subCategoryId || categoryId,
                    name: "PLP",
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="product-lists product-wrapper">
            {products.map((item) => (
              <ProductEight product={item} key={"shop-list-" + item.id} />
            ))}
          </div>
        )}

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
