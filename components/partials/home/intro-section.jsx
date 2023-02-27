import React from "react";

import ALink from "~/components/features/custom-link";
import OptimizedImage from "~/components/features/optimized-image";

function IntroSection({ data }) {
  const { banner } = data;

  return (
    <ALink
      href="/collections/all"
      className="banner banner-fixed intro-slide2"
      style={{ backgroundColor: "#dddee0" }}
    >
      <figure>
        <OptimizedImage
          optimizedData={banner}
          loading="eager"
          alt="Intro Slider"
        />
      </figure>
    </ALink>
  );
}

export default React.memo(IntroSection);
