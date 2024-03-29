import React from "react";

import OwlCarousel from "~/components/features/owl-carousel";
import { mainSlider4 } from "~/utils/data/carousel";
import RatingStar from "~/components/partials/product/rating-star";
import Image from "~/components/image";

const TESTIMONIAL = [
  {
    name: "Himani",
    says: "I have been using Body Cupid's Rose Oud Perfume for the past few months, The scent is feminine and romantic, but not overpowering. I've received so many compliments on it since I started wearing it. It's also long-lasting.",
    userImage: "/images/agents/Himani.jpg",
  },
  {
    name: "Nisha",
    says: "Body Cupid body mist is my new go-to fragrance for everyday wear. It has a light and refreshing scent that's perfect for a quick spritz before heading out the door. I love how affordable it is, too!",
    userImage: "/images/agents/Nisha.jpg",
  },
  {
    name: "Anamika",
    says: "Body Cupid Scandal perfume is simply amazing! The scent is seductive and mysterious. I also love the gorgeous bottle it comes in, which looks beautiful on my dresser.",
    userImage: "/images/agents/Anamika.jpg",
  },
  {
    name: "Anusha",
    says: "I have tried many skincare brands in the past, but nothing compares to Body Cupid's shower gel. I love how the product makes It lathers up nicely and leaves my skin feeling clean and refreshed.",
    userImage: "/images/agents/Anusha.jpg",
  },
];
export default function ReviewSection() {
  return (
    <section className="parallax pb-3">
      <div className="container ">
        <OwlCarousel adClass="owl-theme" options={mainSlider4}>
          {TESTIMONIAL.map((testimonial, index) => (
            <div
              className="testimonial testimonial-centered testimonial-bg"
              key={`${testimonial.name} + ${index}`}
            >
              <div className="testimonial-info">
                <figure className="testimonial-author-thumbnail">
                  <Image
                    src={testimonial.userImage}
                    alt={testimonial.name}
                    width={70}
                    height={70}
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
