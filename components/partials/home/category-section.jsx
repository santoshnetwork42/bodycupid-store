import React, { useEffect, useState } from "react";
import Image from "next/image";

import ALink from "~/components/features/custom-link";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { eventActions } from "~/store/events";
import { connect } from "react-redux";
import { getSource } from "~/utils/helper";
import { useIsInteractive } from "~/utils/contexts/navbar";
import { API, graphqlOperation } from "aws-amplify";
import { getHomePageCategories } from "~/graphql/api";
import { STORE_ID } from "~/config";

function CategorySection({ tileClicked }) {
  const source = getSource();
  const isInteractive = useIsInteractive();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (isInteractive) {
      API.graphql(
        graphqlOperation(getHomePageCategories, {
          limit: 8,
          filter: {
            isFeatured: { eq: true },
            storeId: { eq: STORE_ID },
            isArchive: { eq: false },
          },
          sort: [{ field: "priority", direction: "asc" }],
        })
      )
        .then((res) => res.data.searchProductCategories.items)
        .then(setCategories);
    }
  }, [isInteractive]);

  return (
    <section className="ellipse-section pt-6">
      <div className="container">
        <h2 className="title capitalize-title">Browse Our Categories</h2>
        <div className="row elements">
          {categories.map((category, index) => {
            return (
              <div key={category.id} className="col-3">
                <div className="category category-spacing category-ellipse text-uppercase">
                  <ALink
                    href={`/collections/${category.slug}`}
                    onClick={() => {
                      tileClicked({
                        banner_name: category.name,
                        item_id: index + 1,
                        Source: source,
                        "Item Count": 0,
                        "Section Name": " browse our categories",
                      });
                    }}
                  >
                    <Image
                      src={getPublicImageURL(category.imageUrl)}
                      alt={category.name}
                      height={220}
                      width={220}
                      quality={90}
                      className="category-media"
                    />
                  </ALink>
                  <div className="category-content">
                    <h4 className="category-name text-uppercase">
                      <ALink href={`/collections/${category.slug}`}>
                        {category.name}
                      </ALink>
                    </h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default connect(null, {
  tileClicked: eventActions.tileClicked,
})(React.memo(CategorySection));
