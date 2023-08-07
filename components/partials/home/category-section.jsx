import React from "react";
import Image from "next/image";

import ALink from "~/components/features/custom-link";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { eventActions } from "~/store/events";
import { connect } from "react-redux";
import { getSource } from "~/utils/helper";

function CategorySection({ categories = [], tileClicked }) {
  const source = getSource();

  return (
    <section className="ellipse-section pt-6">
      <div className="container">
        <h2 className="title capitalize-title">Browse Our Categories</h2>
        <div className="row elements">
          {categories.map((category) => {
            return (
              <div key={category.id} className="col-3">
                <div className="category category-spacing category-ellipse text-uppercase">
                  <ALink
                    href={`/collections/${category.slug}`}
                    onClick={() => {
                      tileClicked({
                        banner_name: category.name,
                        item_id: category.id,
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
