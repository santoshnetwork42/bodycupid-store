import ALink from "~/components/features/custom-link";
import { Star } from "~/components/icons";
import NextImage from "~/components/image";
import ReadMore from "~/components/layouts/read-more";
import { formateDate } from "~/utils";

export default function Review({ review = {}, onUpdate }) {
  return (
    <li key={review.id}>
      <div className="comment align-items-center">
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
            <div className="mt-1 ml-2">{formateDate(review.updatedAt)}</div>{" "}
          </div>

          <div className="d-flex justify-content-between">
            <ReadMore content={review.comment} />
          </div>
        </div>
        {!!onUpdate && (
          <button
            className="btn-primary btn-rounded btn btn-sm btn-primary btn-rounded d-flex justify-content-center align-items-center review-edit"
            onClick={() => {
              onUpdate({
                comment: review.comment,
                rating: review.rating,
                name: review.reviewer.name,
                email: review.reviewer.email,
                images: review.images,
                reviewId: review.id,
              });
            }}
          >
            Edit
          </button>
        )}
      </div>
      {review?.images && (
        <div className="comment-media d-flex flex-wrap ">
          {review.images.map((img) => {
            return (
              <ALink href="#" key={img}>
                <NextImage src={img} alt="avatar" width={100} height={100} />
              </ALink>
            );
          })}
        </div>
      )}
    </li>
  );
}
