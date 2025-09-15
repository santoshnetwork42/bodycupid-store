"use client";

import React, { useEffect } from "react";
import { connect } from "react-redux";

import SearchBox from "~/components/common/partials/search-box";
import SearchListOne from "~/components/partials/shop/product-list/search-list-one";
import { useAppRouter } from "~/utils/navigation";

function SearchPage(props) {
  const { store, products, pageFilter, isSearch } = props;
  const { name } = store || {};

  const router = useAppRouter();
  const { query } = router;
  const { search } = query || {};

  useEffect(() => {
    const inputField = document.getElementById("search-input");

    if (inputField) {
      inputField.focus();
      inputField.value = "";
    }
  }, []);

  return (
    <main className="main">
      <h1 className="d-none">{name} - All Products</h1>

      <div className="page-content pb-3">
        <div className="container">
          <div className="row main-content-wrap gutter-lg">
            <div className="col-lg-12 mn-4 d-sm-show">
              <SearchBox defaultSearch={search} />
            </div>
            <div className="col-lg-12 main-content">
              <SearchListOne
                sectionId="Search"
                products={products}
                pageFilter={pageFilter}
                isSearch={isSearch}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default connect((state) => ({ store: state.system.store }))(React.memo(SearchPage));

