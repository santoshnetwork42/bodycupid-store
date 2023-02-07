import React from "react";
import Reveal from "react-awesome-reveal";
// import { LazyLoadImage } from "react-lazy-load-image-component";

// import Custom Components
import ALink from "~/components/features/custom-link";
import OptimizedImage from "~/components/features/optimized-image";
import OwlCarousel from "~/components/features/owl-carousel";

import { introSlider } from "~/utils/data/carousel";
import {
  fadeInUpShorter,
  fadeInRightShorter,
  fadeIn,
  fadeInUp,
  fadeInRight,
} from "~/utils/data/keyframes";

function IntroSection({ data }) {
  const { banner } = data;

  return (
    // <OwlCarousel
    //   adClass="owl-theme owl-dot-inner owl-dot-white intro-slider animation-slider"
    //   options={introSlider}
    // >
    <ALink
      href="/shop"
      className="banner banner-fixed intro-slide2"
      style={{ backgroundColor: "#dddee0" }}
    >
      <figure>
        <OptimizedImage optimizedData={banner} alt="Intro Slider" />
      </figure>

      {/* <div className="container">
          <div className="banner-content y-50 ml-auto text-right">
            <Reveal keyframes={fadeInUpShorter} delay={1000} duration={1200}>
              <p className="font-primary ls-s text-dark mb-4">
                Stir in the power of <br />
                vitamin B7 for healthier
                <br />
                skin and stronger hair.
              </p>
            </Reveal>

            <Reveal keyframes={fadeInUpShorter} delay={1600} duration={1000}>
              <ALink href="/shop" className="btn btn-dark btn-rounded">
                Shop Now<i className="d-icon-arrow-right"></i>
              </ALink>
            </Reveal>
          </div>
        </div> */}
    </ALink>

    //   {/* <div
    //     className="banner banner-fixed intro-slide1"
    //     style={{ backgroundColor: "#46b2e8" }}
    //   >
    //     <figure>
    //       <LazyLoadImage
    //         src="/images/home/slides/slide1.jpg"
    //         alt="Intro Slider"
    //         effect="opacity"
    //         width="auto"
    //         height={630}
    //       />
    //     </figure>

    //     <div className="container">
    //       <div className="banner-content y-50 ml-auto">
    //         <Reveal keyframes={fadeInUpShorter} delay={1000} duration={1200}>
    //           <h4 className="banner-subtitle font-weight-bold ls-l d-flex align-items-center">
    //                             <Reveal keyframes={fadeInRightShorter} delay={200} duration={1000} className="ml-auto">
    //                                 <span className="font-weight-bold d-inline-block">Be Wow, Naturally</span>
    //                             </Reveal>
    //                         </h4>

    //           <h3 className="font-weight-normal">
    //             Manage weight with the goodness of 100% organic Himalayan
    //             apples.
    //           </h3>
    //         </Reveal>

    //         <Reveal
    //           keyframes={fadeInUpShorter}
    //           delay={1800}
    //           duration={1000}
    //           className="text-right"
    //         >
    //           <ALink href="/shop" className="btn btn-dark btn-rounded">
    //             Shop Now<i className="d-icon-arrow-right"></i>
    //           </ALink>
    //         </Reveal>
    //       </div>
    //     </div>
    //   </div>

    //   <div
    //     className="banner banner-fixed video-banner intro-slide3"
    //     style={{ backgroundColor: "#dddee0" }}
    //   >
    //     <figure>
    //       <LazyLoadImage
    //         src="/images/home/slides/slide3.jpg"
    //         alt="Intro Slider"
    //         effect="opacity"
    //         width="auto"
    //         height={630}
    //       />
    //     </figure>

    //     <div className="container">
    //       <div className="banner-content x-50 y-50 text-center">
    //         <Reveal keyframes={fadeInUp} delay={800} duration={1000}>
    //           <p className="mb-7 ls-s font-primary">
    //             Your mega source of good fats.
    //             <br />
    //             For a healthy heart.
    //           </p>
    //         </Reveal>

    //         <Reveal keyframes={fadeInRightShorter} delay={1500} duration={1000}>
    //           <ALink href="/shop" className="btn btn-dark btn-rounded mb-1">
    //             Shop Now<i className="d-icon-arrow-right"></i>
    //           </ALink>
    //         </Reveal>
    //       </div>
    //     </div>
    //   </div> */}
    // </OwlCarousel>
  );
}

export default React.memo(IntroSection);
