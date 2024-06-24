import React from "react";

import ALink from "~/components/features/custom-link";
import { House, RightAngle } from "~/components/icons";

function BlogBreadcrumbs({ link, type = "default" }) {
  const { slug, name } = link || {};
  return (
    <div>
      <ul
        className="breadcrumb breadcrumb-lg blog"
        style={{ display: "grid", gridTemplateColumns: "auto 1fr" }}
      >
        <li>
          <ALink href="/blog">
            <i>
              <House color="currentColor" size={16} />
            </i>
          </ALink>
        </li>
        {!!link && (
          <li className="w-100">
            <i>
              <RightAngle color="currentColor" size={10} />
            </i>
            <ALink
              href={{
                pathname: "/blog/[slug]",
                query: { slug },
              }}
              className="active"
              style={{
                lineClamp: 1,
                WebkitLineClamp: 1,
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                display: "-webkit-box",
                width: "100%",
              }}
            >
              {name}
            </ALink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default React.memo(BlogBreadcrumbs);
