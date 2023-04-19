import React from "react";
import ALink from "~/components/features/custom-link";
import OptimizedImage from "~/components/features/optimized-image";
export default function StorySection({ categories }) {
  return (
    <section className="ellipse-section d-sm-show mt-4">
      <div className="container">
        <div className=" elements">
          <div className="d-flex story-wrapper">
            {categories.map((category) => {
              return (
                <div key={category.id} className=" category">
                  <div className=" category-spacing category-ellipse">
                    <ALink
                      href={`/collections/${category.category.slug}/${category.slug}`}
                    >
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
      </div>
    </section>
  );
}
