import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import ALink from "~/components/features/custom-link";

function IntroSection() {
  return (
    <ALink href="/collections/all" className="banner banner-fixed intro-slide2">
      <figure>
        <LazyLoadImage
          src="/images/home/slides/wow.jpg"
          alt="Intro Slider"
          effect="opacity"
          width="auto"
          height={630}
        />
      </figure>
    </ALink>
  );
}

export default React.memo(IntroSection);
