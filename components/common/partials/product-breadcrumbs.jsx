import React from "react";

import ALink from "~/components/features/custom-link";

function ProductBreadcrumbs({ category, subCategory }) {
  const { slug, name } = category;
  const { slug: subCatSlug, name: subCatName } = subCategory;
  return (
    <div>
      <ul className="breadcrumb breadcrumb-lg">
        <li>
          <ALink href="/collections/all">
            <i className="d-icon-home"></i>
          </ALink>
        </li>
        {category && (
          <li>
            <ALink
              href={{
                pathname: "/collections/[category]",
                query: { category: slug },
              }}
              className="active"
            >
              {name}
            </ALink>
          </li>
        )}
        {subCategory && (
          <li>
            <ALink
              href={{
                pathname: "/collections/[category]/[subcategory]",
                query: {
                  category: slug,
                  subcategory: subCatSlug,
                },
              }}
              className="active"
            >
              {subCatName}
            </ALink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default React.memo(ProductBreadcrumbs);
