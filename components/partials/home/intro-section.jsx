import React from "react";

import ALink from "~/components/features/custom-link";
import OptimizedImage from "~/components/features/optimized-image";

function IntroSection({ banners }) {
  const [{ webImage, mobileImage } = {}] = banners || [];
  return (
    <>
      {webImage && (
        <ALink
          href="/collections/all"
          className="banner d-sm-none banner-fixed intro-slide2" //for desktop size
          style={{ backgroundColor: "#dddee0" }}
        >
          <figure>
            <OptimizedImage
              optimizedData={webImage}
              resize="WIDTH"
              loading="eager"
              alt="Intro Slider"
              resizeMobile={false}
            />
          </figure>
        </ALink>
      )}
      {mobileImage && (
        <ALink
          href="/collections/all"
          className="banner d-none d-sm-show banner-fixed intro-slide2" //for mobile size
          style={{ backgroundColor: "#dddee0" }}
        >
          <figure>
            <OptimizedImage
              optimizedData={mobileImage}
              resize="WIDTH"
              loading="eager"
              alt="Intro Slider"
              resizeMobile={false}
            />
          </figure>
        </ALink>
      )}
    </>
  );
}

export default React.memo(IntroSection);
