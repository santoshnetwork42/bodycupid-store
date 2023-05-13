import React from "react";
import Image from "next/image";

import ALink from "~/components/features/custom-link";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";

function CategorySection({ categories = [] }) {
  return (
    <section className="ellipse-section mt-4">
      <div className="container">
        <h2 className="title capitalize-title">Browse Our Categories</h2>
        <div className="row elements">
          {categories.map((category) => {
            return (
              <div key={category.id} className="col-3">
                <div className="category category-spacing category-ellipse text-uppercase">
                  <ALink
                    href={`/collections/${category.category.slug}/${category.slug}`}
                  >
                    <Image
                      src={getPublicImageURL(category.imageUrl)}
                      alt={category.name}
                      height={360}
                      width={360}
                      quality={90}
                      className="category-media"
                    />
                  </ALink>
                  <div className="category-content">
                    <h4 className="category-name text-uppercase">
                      <ALink
                        href={`/collections/${category.category.slug}/${category.slug}`}
                      >
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
