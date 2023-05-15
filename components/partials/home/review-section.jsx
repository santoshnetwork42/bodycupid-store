import React from "react";
import OwlCarousel from "~/components/features/owl-carousel";
import { mainSlider4 } from "~/utils/data/carousel";
import RatingStar from "../product/rating-star";
import { TESTIMONIAL } from "~/constant";

export default function ReviewSection() {
  return (
    <section className="parallax pb-3">
      <div className="container ">
        <OwlCarousel adClass="owl-theme" options={mainSlider4}>
          {TESTIMONIAL.map((testimonial) => (
            <div
              className="testimonial testimonial-centered testimonial-bg"
              key={testimonial.says.substring(0, 10)}
            >
              <div className="testimonial-info">
                <figure className="testimonial-author-thumbnail">
                  <img
                    src={testimonial.userImage}
                    alt="user"
                    width="50"
                    height="50"
                  />
                </figure>
                <div className="d-flex align-item-center mb-2 justify-content-center">
                  <RatingStar key="rating-star" value={5} />
                </div>
                <blockquote>{testimonial.says}</blockquote>
                <cite>
                  {testimonial.name} <span>Customer</span>
                </cite>
              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>
    </section>
  );
}
