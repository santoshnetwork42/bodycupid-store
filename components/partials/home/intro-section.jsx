import React from "react";

import ALink from "~/components/features/custom-link";
import OptimizedImage from "~/components/features/optimized-image";
import OwlCarousel from "~/components/features/owl-carousel";
import { introSlider } from "~/utils/data/carousel";

function IntroSection({ banners }) {
  return (
    <OwlCarousel
      adClass="owl-theme owl-dot-inner owl-dot-white intro-slider animation-slider intro-slider-container"
      options={introSlider}
    >
      {banners.map((banner) => {
        return (
          <div className="banner banner-fixed intro-slide2 ">
            {banner?.webImage && (
              <ALink
                href="/collections/all"
                className="banner d-sm-none banner-fixed intro-slide2 intro-slider-link" //for desktop size
              >
                <figure className="intro-slider-figure">
                  <OptimizedImage
                    optimizedData={banner?.webImage}
                    resizeMobile={false}
                    loading="eager"
                    alt="Intro Slider"
                  />
                </figure>
              </ALink>
            )}
            {banner?.mobileImage && (
              <ALink
                href="/collections/all"
                className="banner d-none d-sm-show banner-fixed intro-slide2 intro-slider-link" //for mobile size
              >
                <figure className="intro-slider-figure">
                  <OptimizedImage
                    optimizedData={banner?.mobileImage}
                    resizeMobile={false}
                    loading="eager"
                    alt="Intro Slider"
                  />
                </figure>
              </ALink>
            )}
          </div>
        );
      })}
    </OwlCarousel>
  );
}

export default React.memo(IntroSection);
