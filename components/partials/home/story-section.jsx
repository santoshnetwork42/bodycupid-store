import React from "react";
import Image from "next/image";

import ALink from "~/components/features/custom-link";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";

export default function StorySection({ categories }) {
  return (
    <section className="ellipse-section d-sm-show story-section">
      <div className="container">
        <div className=" elements">
          <div className="d-flex story-wrapper pt-3 pb-3 m-0">
            {categories.map((category) => {
              return (
                <div key={category.id} className=" category">
                  <div className=" category-spacing category-ellipse">
                    <ALink href={`/collections/${category.slug}`}>
                      <Image
                        src={getPublicImageURL(category.imageUrl)}
                        alt={category.name}
                        height={70}
                        width={70}
                        priority
                        loading="eager"
                        objectFit="contain"
                        className="category-media"
                      />
                    </ALink>
                    <div className="category-content">
                      <h4 className="category-name">
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
      </div>
    </section>
  );
}
