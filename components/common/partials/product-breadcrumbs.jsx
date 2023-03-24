import React from "react";

import ALink from "~/components/features/custom-link";

function ProductBreadcrumbs({ product }) {
  return (
    <div>
      <ul className="breadcrumb breadcrumb-lg">
        <li>
          <ALink href="/">
            <i className="d-icon-home"></i>
          </ALink>
        </li>
        <li>
          <ALink href="/collections/all" className="active">
            Products
          </ALink>
        </li>
        {product.category && (
          <li>
            <ALink
              href={{
                pathname: "/collections/[category]",
                query: { category: product.category.slug },
              }}
              className="active"
            >
              {product.category.name}
            </ALink>
          </li>
        )}
        {product.subCategory && (
          <li>
            <ALink
              href={{
                pathname: "/collections/[category][subcategory]",
                query: {
                  category: product.category.slug,
                  subcategory: product.subCategory.slug,
                },
              }}
              className="active"
            >
              {product.subCategory.name}
            </ALink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default React.memo(ProductBreadcrumbs);
