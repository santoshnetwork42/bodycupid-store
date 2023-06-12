import React from "react";
import Image from "next/image";

import ALink from "~/components/features/custom-link";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";

export default function StorySection({ categories }) {
  return (
    <section className="ellipse-section d-sm-show story-section">
      <div className="container">
        <div className="d-flex story-wrapper pt-3 pb-3 m-0">
          {categories.map((category, index) => {
            return (
              <div
                key={category.id}
                className="category story-category d-flex align-items-center flex-column"
              >
                <ALink
                  href={`/collections/${category.slug}`}
                  className="category-img"
                >
                  <Image
                    src={
                      category.staticImage ||
                      getPublicImageURL(category.imageUrl)
                    }
                    alt={category.name}
                    height={60}
                    width={60}
                    priority={index < 5}
                    objectFit="contain"
                    className="category-media"
                  />
                </ALink>
                <h4 className="category-name">
                  <ALink href={`/collections/${category.slug}`}>
                    {category.name}
                  </ALink>
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
