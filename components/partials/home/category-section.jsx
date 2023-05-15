import React from "react";

import ALink from "~/components/features/custom-link";
import OptimizedImage from "~/components/features/optimized-image";

function CategorySection({ categories = [] }) {
  return (
    <section className="ellipse-section mt-4">
      <div className="container">
        <h2 className="title capitalize-title">Browse Our Categories</h2>
        <div className="row elements">
          {categories.map((category) => {
            return (
              <div key={category.id} className=" col-3">
                <div className="category category-spacing category-ellipse text-uppercase">
                  <ALink href={`/collections/${category.slug}`}>
                    <figure className="category-media">
                      <OptimizedImage
                        optimizedData={category.image}
                        alt={category.name}
                        loading="lazy"
                      />
                    </figure>
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

export default React.memo(CategorySection);
