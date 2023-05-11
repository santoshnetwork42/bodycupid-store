import React from "react";
import ALink from "~/components/features/custom-link";
import OptimizedImage from "~/components/features/optimized-image";
import { formateDate, toDecimal } from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { Star } from "~/components/icons";
import ReadMore from "~/components/layouts/read-more";

export default function Review({ review = {} }) {
  return (
    <li key={review.id}>
      <div className="comment">
        <div className="comment-body">
          <div className="comment-rating ratings-container mb-0"></div>
          <div className="comment-user">
            <h4>
              <ALink href="#">{review?.reviewer?.name}</ALink>
            </h4>
          </div>
          <div className="ratings-full d-flex align-items-center ">
            <div className="d-flex align-items-center">
              {Array.from({ length: 5 }).map((_, index) => {
                const isFilled = index + 1 <= review.rating;

                return (
                  <Star
                    size={16}
                    key={`${review.id}-${index}`}
                    color={isFilled ? "#FAB73B" : "#D9D9D9"}
                  />
                );
              })}
            </div>
            <div className="mt-1 ml-2">{formateDate(review.createdAt)}</div>{" "}
          </div>

          <div className="comment-content">
            <ReadMore>
              <p>{review.comment}</p>
            </ReadMore>
          </div>
        </div>
      </div>
      {review?.images && (
        <div className="comment-media d-flex flex-wrap ">
          {review.images.map((img) => {
            return (
              <ALink href="#" key={img}>
                <OptimizedImage
                  src={getPublicImageURL(img)}
                  alt="avatar"
                  width="100"
                  height="100"
                />
              </ALink>
            );
          })}
        </div>
      )}
    </li>
  );
}
