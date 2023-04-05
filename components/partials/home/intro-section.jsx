import React from "react";

import ALink from "~/components/features/custom-link";
import OptimizedImage from "~/components/features/optimized-image";

function IntroSection({ data: { banners } }) {
  const [{ webImage, mobileImage }] = banners || [];

  return (
    <>
      <ALink
        href="/collections/all"
        className="banner d-sm-none banner-fixed intro-slide2" //for desktop size
        style={{ backgroundColor: "#dddee0" }}
      >
        <figure>
          <OptimizedImage
            optimizedData={webImage}
            loading="eager"
            alt="Intro Slider"
          />
        </figure>
      </ALink>
      <ALink
        href="/collections/all"
        className="banner d-none d-sm-show banner-fixed intro-slide2" //for mobile size
        style={{ backgroundColor: "#dddee0" }}
      >
        <figure>
          <OptimizedImage
            optimizedData={mobileImage}
            loading="eager"
            alt="Intro Slider"
          />
        </figure>
      </ALink>
    </>
  );
}

export default React.memo(IntroSection);
