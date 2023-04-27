import React from "react";
import Reveal from "react-awesome-reveal";

import OwlCarousel from "~/components/features/owl-carousel";

import { fadeIn } from "~/utils/data/keyframes";
import { mainSlider6 } from "~/utils/data/carousel";
import PostSeven from "~/components/features/post/post-seven";

function BlogSection(props) {
  const { posts } = props;

  if (!posts.length) {
    return <></>;
  }
  return (
    <section className="blog-post-wrapper mt-6 mt-md-10 pt-7">
      <Reveal keyframes={fadeIn} duration={1000} triggerOnce>
        <div className="container">
          <h2 className="title title-center">Featured Articles</h2>

          <OwlCarousel adClass="owl-theme post-slider" options={mainSlider6}>
            {posts &&
              posts.length &&
              posts.map((post) => (
                <React.Fragment key={"post-eight" + post.id}>
                  <div className="blog-post mb-4">
                    <PostSeven post={post} adClass="overlay-zoom" />
                  </div>
                </React.Fragment>
              ))}
          </OwlCarousel>
        </div>
      </Reveal>
    </section>
  );
}

export default React.memo(BlogSection);
