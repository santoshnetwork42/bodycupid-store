import React from "react";

import ALink from "~/components/features/custom-link";
import OptimizedImage from "~/components/features/optimized-image";

function CategorySection({ categories = [] }) {
  return (
    <section className="ellipse-section mt-10">
      <div className="container">
        <h2 className="title title-center">Browse Our Categories</h2>
        <div className="row elements">
          {categories.map((category) => {
            return (
              <div
                key={category.id}
                className="col-xl-3 col col-lg-3 col-md-2 col-sm-4 col-3"
              >
                <div className="category category-spacing category-ellipse">
                  <ALink href="#">
                    <figure className="category-media">
                      <OptimizedImage
                        optimizedData={category.image}
                        alt={category.name}
                        loading="lazy"
                      />
                    </figure>
                  </ALink>
                  <div className="category-content">
                    <h4 className="category-name">
                      <ALink href="#">{category.name}</ALink>
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

export default React.memo(CategorySection);
