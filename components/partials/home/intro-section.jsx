import React, { useEffect } from "react";
import Image from "next/image";

import ALink from "~/components/features/custom-link";
import OwlCarousel from "~/components/features/owl-carousel";
import { introSlider } from "~/utils/data/carousel";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { connect } from "react-redux";
import { eventActions } from "~/store/events";
import { getSource } from "~/utils/helper";

function IntroSection({ banners = [], bannerClicked, homeViewed }) {
  useEffect(() => {
    homeViewed();
  }, []);
  const source = getSource();

  const filteredBanners = banners.filter((banner) => !banner.isArchive);
  filteredBanners.sort((a, b) => a.priority - b.priority);

  return (
    <div className="banner banner-fixed">
      <OwlCarousel
        adClass="owl-theme owl-dot-inner owl-dot-white intro-slider animation-slider intro-slider-container"
        options={introSlider}
      >
        {filteredBanners.map((banner, index) => {
          const { webKey, mobileKey, link, name } = banner;
          return (
            <div className="intro-slide2" key={webKey}>
              <ALink
                href={link || "/collections/all"}
                onClick={() => {
                  bannerClicked({
                    Source: source,
                    item_id: index,
                    banner_name: name,
                  });
                }}
                className={`d-sm-none intro-slider-link`} //for desktop size
              >
                <Image
                  src={getPublicImageURL(webKey)}
                  alt="WOW"
                  priority={!index}
                  quality={90}
                  width={1920}
                  height={800}
                  objectFit="cover"
                />
              </ALink>
              <ALink
                href={link || "/collections/all"}
                onClick={() => {
                  bannerClicked({
                    Source: source,
                    item_id: index,
                    banner_name: name,
                  });
                }}
                className="d-none d-sm-show intro-slider-link" //for mobile size
              >
                <Image
                  src={getPublicImageURL(mobileKey)}
                  alt="WOW"
                  priority={!index}
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

export default connect(null, {
  bannerClicked: eventActions.bannerClicked,
  homeViewed: eventActions.homeViewed,
})(React.memo(IntroSection));
