import React from "react";
import Image from "next/image";

import ALink from "~/components/features/custom-link";
import OwlCarousel from "~/components/features/owl-carousel";
import { introSlider } from "~/utils/data/carousel";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";

function IntroSection({ banners = [] }) {
  return (
    <div className="banner banner-fixed">
      <OwlCarousel
        adClass="owl-theme owl-dot-inner owl-dot-white intro-slider animation-slider intro-slider-container"
        options={introSlider}
      >
        {banners.map((banner) => {
          const { webKey, mobileKey } = banner;
          return (
            <div className="intro-slide2" key={webKey}>
              <ALink
                href="/collections/all"
                className={`d-sm-none intro-slider-link`} //for desktop size
              >
                <Image
                  src={getPublicImageURL(webKey)}
                  alt="WOW"
                  priority
                  loading="eager"
                  quality={95}
                  width={1920}
                  height={800}
                  objectFit="cover"
                />
              </ALink>
              <ALink
                href="/collections/all"
                className="d-none d-sm-show intro-slider-link" //for mobile size
              >
                <Image
                  src={getPublicImageURL(mobileKey)}
                  alt="WOW"
                  priority
                  loading="eager"
                  quality={95}
                  width={575}
                  height={320}
                  objectFit="cover"
                />
              </ALink>
            </div>
          );
        })}
      </OwlCarousel>
    </div>
  );
}

export default React.memo(IntroSection);
