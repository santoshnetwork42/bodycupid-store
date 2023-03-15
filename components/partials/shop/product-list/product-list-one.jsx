import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { API, graphqlOperation } from "aws-amplify";
// import { useLazyQuery } from '@apollo/react-hooks';
import InfiniteScroll from "react-infinite-scroll-component";

import ToolBox from "~/components/partials/shop/toolbox";
import ProductTwo from "~/components/features/product/product-two";
import ProductEight from "~/components/features/product/product-eight";
import {
  getBasicCategory,
  getBasicSubCategory,
  findProducts,
} from "~/graphql/api";
import { STORE_ID } from "~/config";
import Loader from "~/components/common/partials/loader";

const gridClasses = {
  3: "cols-2 cols-sm-3",
  4: "cols-2 cols-sm-3 cols-md-4",
  5: "cols-2 cols-sm-3 cols-md-4 cols-xl-5",
  6: "cols-2 cols-sm-3 cols-md-4 cols-xl-6",
  7: "cols-2 cols-sm-3 cols-md-4 cols-lg-5 cols-xl-7",
  8: "cols-2 cols-sm-3 cols-md-4 cols-lg-5 cols-xl-8",
};

function ProductListOne(props) {
  const { itemsPerRow = 3, type = "left", isToolbox = true } = props;

  const [token, setToken] = useState(null);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState();
  const router = useRouter();

  const {
    limit,
    minprice,
    maxprice,
    type: gridType = "grid",
    category: categorySlug,
    subcategory: subCategorySlug,
    search,
  } = router.query;
  const perPage = limit ? parseInt(limit) : 12;

  const filters = useMemo(() => {
    if (category || categorySlug === "all") {
      const apiSearchKey = subCategorySlug ? "subCategoryId" : "categoryId";
      const filter = category
        ? { [apiSearchKey]: { eq: category.id }, storeId: { eq: STORE_ID } }
        : { storeId: { eq: STORE_ID } };

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
      return { filter, limit: perPage };
    }
    return { storeId: { eq: STORE_ID } };
  }, [perPage, maxprice, minprice, category?.id, search]);

  useEffect(() => {
    setLoading(true);
    if (categorySlug !== "all") {
      const api = subCategorySlug ? getBasicSubCategory : getBasicCategory;
      const apiSearch = subCategorySlug
        ? "byslugProductSubCategory"
        : "byslugProductCategory";
      API.graphql(
        graphqlOperation(api, {
          slug: subCategorySlug || categorySlug,
          filter: { storeId: { eq: STORE_ID } },
        })
      )
        .then(
          ({
            data: {
              [apiSearch]: {
                items: [response],
              },
            },
          }) => {
            setCategory(response);
            if (!response) {
              setLoading(false);
            }
          }
        )
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [categorySlug, subCategorySlug]);

  const getProducts = useCallback(
    (reset) => {
      API.graphql(
        graphqlOperation(findProducts, {
          ...filters,
          nextToken: reset ? null : token,
        })
      )
        .then(
          ({
            data: {
              searchProducts: { items: response, total, nextToken },
            },
          }) => {
            if (reset) {
              setProducts(response);
            } else {
              setProducts([...products, ...response]);
            }
            setToken(nextToken);
            setTotal(total);
            setLoading(false);
          }
        )
        .catch((err) => {
          console.log(err);
        });
    },
    [filters, products, token]
  );

  useEffect(() => {
    if (filters) {
      getProducts(true);
    }
  }, [filters]);

  if (loading) {
    return (
      <>
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
      </>
    );
  }

  return (
    <>
      {isToolbox && <ToolBox type={type} />}
    
      <InfiniteScroll
        dataLength={products ? products.length : 0}
        next={() => {
          getProducts(false);
        }}
        style={{ overflow: "visible" }}
        hasMore={products.length < total}
        loader={<Loader loading small/>}
      >
        {gridType === "grid" ? (
          <div className={`row product-wrapper ${gridClasses[itemsPerRow]}`}>
            {products.map((item) => (
              <div className="product-wrap" key={"shop-" + item.id}>
                <ProductTwo product={item} />
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

export default ProductListOne;
