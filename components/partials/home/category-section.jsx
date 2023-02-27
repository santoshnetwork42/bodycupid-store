import React from "react";
import Reveal from "react-awesome-reveal";

import ALink from "~/components/features/custom-link";
import OptimizedImage from "~/components/features/optimized-image";

import { fadeIn } from "~/utils/data/keyframes";

function CategorySection({ categories = [] }) {
  const categoriesWithImage = categories.filter((category) => category.image);

  if (categoriesWithImage.length === 0) {
    return null;
  }

  return (
    <Reveal keyframes={fadeIn} delay={300} duration={1200} triggerOnce>
      <section className="pt-10 mt-7">
        <div className="container">
          <h2 className="title title-center mb-5">Browse Our Categories</h2>

          <div className="row">
            {categoriesWithImage.map((category) => (
              <div className="col-xs-6 col-lg-3 mb-4" key={category.id}>
                <div className="category category-default1 category-absolute banner-radius overlay-zoom">
                  <ALink href={`/collections/${category.category.slug}/${category.slug}`}>
                    <figure className="category-media">
                      <OptimizedImage
                        optimizedData={category.image}
                        alt={category.name}
                        loading="lazy"
                      />
                    </figure>

                    <div className="category-content">
                      <h3 className="category-name font-weight-bold ls-l">
                        {category.name}
                      </h3>
                    </div>
                  </ALink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

export default React.memo(CategorySection);
