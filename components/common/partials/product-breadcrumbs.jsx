import React from "react";

import ALink from "~/components/features/custom-link";
import { House, RightAngle } from "~/components/icons";

function ProductBreadcrumbs({ category, subCategory }) {
  const { slug, name } = category;
  const { slug: subCatSlug, name: subCatName } = subCategory;
  return (
    <div>
      <ul className="breadcrumb breadcrumb-lg">
        <li>
          <ALink href="/collections/all">
            <i>
              <House color="currentColor" size={16} />
            </i>
          </ALink>
        </li>
        {category && (
          <li>
            <i>
              <RightAngle color="currentColor" size={10} />
            </i>
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
            <i>
              <RightAngle color="currentColor" size={10} />
            </i>
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
