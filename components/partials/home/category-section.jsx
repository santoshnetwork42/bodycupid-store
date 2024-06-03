import React from "react";
import Image from "~/components/image";

import { connect } from "react-redux";
import ALink from "~/components/features/custom-link";
import { eventActions } from "~/store/events";
import { getSource } from "~/utils/helper";

function CategorySection({ tileClicked, categories }) {
  const source = getSource();

  return (
    <section className="ellipse-section pt-6">
      <div className="container">
        <h2 className="title capitalize-title">Browse Our Categories</h2>
        <div className="row elements">
          {categories?.map((category, index) => {
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
                      src={category.imageUrl}
                      alt={category.name}
                      height={220}
                      width={220}
                      quality={80}
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
