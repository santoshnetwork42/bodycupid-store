import { useAppRouter } from "~/utils/navigation";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";

import Loader from "~/components/common/partials/loader";
import ProductTwo from "~/components/features/product/product-two";
import { eventActions } from "~/store/events";
import { errorHandler } from "~/utils/errorHandler";
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

function SearchListOne(props) {
  const {
    itemsPerRow = 4,
    products: initialData,
    recordSearch,
    sectionId,
  } = props;

  const router = useRouter();
  const { query } = router;

  const { type: gridType = "grid", search, slug } = query;

  useEffect(() => {
    if (search?.trim()) {
      recordSearch(search?.trim());
    }
  }, [search]);

  const [token, setToken] = useState(null);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const getProducts = useCallback(async () => {
    try {
      const searchTerm = search?.trim();

      if (searchTerm) {
        fetchSearchItems(search, 30).then((fetchedItems) => {
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
  }, [search, products, sectionId]);

  useEffect(() => {
    getProducts();
  }, [search]);

  useEffect(() => {
    const { items, nextToken, total } = initialData || {};
    const productsMapped = setSoldOutLast(items);
    setProducts(productsMapped);
    setToken(nextToken);
    setTotal(total);
  }, [sectionId]);

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
      <InfiniteScroll
        dataLength={products ? products.length : 0}
        style={{ overflow: "visible" }}
        loader={<Loader loading small />}
      >
        <div className={`row product-wrapper ${gridClasses[itemsPerRow]} pt-5`}>
          {products.map((item, index) => (
            <div className="product-wrap" key={"shop-" + item?.id}>
              <ProductTwo
                priority={index < 8}
                slug={slug}
                product={item}
                section={{
                  id: sectionId,
                  name: "PLP",
                }}
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
})(SearchListOne);
