import React from "react";

import ALink from "~/components/features/custom-link";

function TokenPagination(props) {
  const { onPage, total = 0, loaded = 0, nextToken } = props;

  if (!total) return <></>;

  return (
    <div className="toolbox toolbox-pagination">
      <p className="show-info">
        Showing{" "}
        <span>
          1 - {loaded} of {total}
        </span>
        Products
      </p>
      {!!nextToken && loaded < total && (
        <ul className="pagination">
          <li className={`page-item`}>
            <ALink
              className="page-link page-link-next"
              href="#"
              onClick={() => onPage()}
              scroll={false}
            >
              Load More<i className="d-icon-arrow-right"></i>
            </ALink>
          </li>
        </ul>
      )}
    </div>
  );
}

export default React.memo(TokenPagination);
