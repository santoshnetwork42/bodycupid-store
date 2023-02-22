import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API, graphqlOperation } from "aws-amplify";
// import { useLazyQuery } from '@apollo/react-hooks';

import ToolBox from "~/components/partials/shop/toolbox";
import ProductTwo from "~/components/features/product/product-two";
import ProductEight from "~/components/features/product/product-eight";
import Pagination from "~/components/features/pagination";
import {
  getBasicCategory,
  getBasicSubCategory,
  findProducts,
} from "~/graphql/api";

const gridClasses = {
  3: "cols-2 cols-sm-3",
  4: "cols-2 cols-sm-3 cols-md-4",
  5: "cols-2 cols-sm-3 cols-md-4 cols-xl-5",
  6: "cols-2 cols-sm-3 cols-md-4 cols-xl-6",
  7: "cols-2 cols-sm-3 cols-md-4 cols-lg-5 cols-xl-7",
  8: "cols-2 cols-sm-3 cols-md-4 cols-lg-5 cols-xl-8",
};

function ProductListOne(props) {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState();
  const [totalPage, setTotalPage] = useState(1);
  const { itemsPerRow = 3, type = "left", isToolbox = true } = props;
  const router = useRouter();
  const query = router.query;
  const { limit, minprice, maxprice } = query;

  const perPage = limit ? parseInt(limit) : 12;
  const page = query.page ? query.page : 1;
  const gridType = query.type ? query.type : "grid";

  useEffect(() => {
    setLoading(true);
    const api = query.subcategory ? getBasicSubCategory : getBasicCategory;
    const apiSearch = query.subcategory
      ? "byslugProductSubCategory"
      : "byslugProductCategory";
    API.graphql(
      graphqlOperation(api, {
        slug: query.subcategory || query.category,
      })
    )
      .then(
        ({
          data: {
            [apiSearch]: {
              items: [category],
            },
          },
        }) => {
          setCategory(category);
        }
      )
      .catch((err) => {
        console.log("err", err);
      });
  }, [query.category, query.subcategory]);

  useEffect(() => {
    if (products && products.length) {
      setTotalPage(Math.ceil(total / perPage));
    }
  }, [products]);

  useEffect(() => {
    if (category) {
      const apiSearch = query.subcategory ? "subCategoryId" : "categoryId";
      const filter = { [apiSearch]: { eq: category.id } };
      if (
        !Number.isNaN(Number(query.minprice)) &&
        !Number.isNaN(Number(query.maxprice)) &&
        Number(query.minprice)
      ) {
        filter.price = {
          range: [Number(query.minprice), Number(query.maxprice)],
        };
      } else if (
        !Number.isNaN(Number(query.minprice)) &&
        Number(query.minprice)
      ) {
        filter.price = { gte: Number(query.minprice) };
      } else if (
        !Number.isNaN(Number(query.maxprice)) &&
        Number(query.maxprice)
      ) {
        filter.price = { lte: Number(query.maxprice) };
      }

      API.graphql(graphqlOperation(findProducts, { filter, limit: perPage }))
        .then(
          ({
            data: {
              searchProducts: { items: response, total },
            },
          }) => {
            setTotal(total);
            setProducts(response);
            setLoading(false);
          }
        )
        .catch((err) => {
          console.log(err);
        });
    }
  }, [category?.id, perPage, minprice, maxprice, limit]);

  return (
    <>
      {isToolbox ? <ToolBox type={type} /> : ""}
      {loading &&
        (gridType === "grid" ? (
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
        ))}

      {gridType === "grid" ? (
        <div className={`row product-wrapper ${gridClasses[itemsPerRow]}`}>
          {products &&
            products.map((item) => (
              <div className="product-wrap" key={"shop-" + item.id}>
                <ProductTwo product={item} adClass="" />
              </div>
            ))}
        </div>
      ) : (
        <div className="product-lists product-wrapper">
          {products &&
            products.map((item) => (
              <ProductEight product={item} key={"shop-list-" + item.id} />
            ))}
        </div>
      )}

      {products && products.length === 0 ? (
        <p className="ml-1">No products were found matching your selection.</p>
      ) : (
        ""
      )}
      {products ? (
        <div className="toolbox toolbox-pagination">
          {products && (
            <p className="show-info">
              Showing{" "}
              <span>
                {perPage * (page - 1) + 1} - {Math.min(perPage * page, total)}{" "}
                of {total}
              </span>
              Products
            </p>
          )}

          <Pagination totalPage={totalPage} />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default ProductListOne;
