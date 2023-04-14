import React from "react";
import OwlCarousel from "~/components/features/owl-carousel";
import { mainSlider4 } from "~/utils/data/carousel";
import RatingStar from "../product/rating-star";

export default function ReviewSection() {
  return (
    <section className="pt-10 parallax">
      <div className="container pb-10">
        <OwlCarousel adClass="owl-theme owl-dot-white" options={mainSlider4}>
          <div className="testimonial testimonial-centered testimonial-bg">
            <div className="testimonial-info">
              <figure className="testimonial-author-thumbnail">
                <img
                  src="/images/agents/4.jpg"
                  alt="user"
                  width="50"
                  height="50"
                />
              </figure>
              <div className="d-flex align-item-center justify-content-center">
                <RatingStar value={3} />
              </div>
              <blockquote>
                “This is the best plant store I have ever ordered from! My
                plants were shipped/delivered so fast. When I had a question,
                Bloomscape got back to me right away, and they were so
                friendly!”
              </blockquote>
              <cite>
                Dilshad Khan <span>Customer</span>
              </cite>
            </div>
          </div>
          <div className="testimonial testimonial-centered testimonial-bg">
            <div className="testimonial-info">
              <figure className="testimonial-author-thumbnail">
                <img
                  src="/images/agents/5.jpg"
                  alt="user"
                  width="50"
                  height="50"
                />
              </figure>
              <blockquote>
                “ Donec nec justo eget felis facilisis fermentum. Aliquam
                porttitor mauris sit amet orci. Aenean dignissim pellentesque
                felis. Morbi in sem quis dui placerat ornare. Pellentesque odio
                nisi, euismod in, pharetra ”
              </blockquote>
              <cite>
                Herman Beck
                <span>Investor</span>
              </cite>
            </div>
          </div>
          <div className="testimonial testimonial-centered testimonial-bg">
            <div className="testimonial-info">
              <figure className="testimonial-author-thumbnail">
                <img
                  src="/images/agents/2.jpg"
                  alt="user"
                  width="50"
                  height="50"
                />
              </figure>
              <blockquote>
                “ Donec nec justo eget felis facilisis fermentum. Aliquam
                porttitor mauris sit amet orci. Aenean dignissim pellentesque
                felis. Morbi in sem quis dui placerat ornare. Pellentesque odio
                nisi, euismod in, pharetra ”
              </blockquote>
              <cite>
                Herman Beck
                <span>Investor</span>
              </cite>
            </div>
          </div>
        </OwlCarousel>
      </div>
    </section>
  );
}
