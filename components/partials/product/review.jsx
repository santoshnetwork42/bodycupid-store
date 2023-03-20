import React, { useEffect, useMemo, useRef, useState } from "react";
import ALink from "~/components/features/custom-link";
import { formateDate, toDecimal } from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";

export default function Review({ review }) {
  const [read, setRead] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);
  const pref = useRef(null);
  useEffect(() => {
    if (pref.current?.clientHeight > 60) {
      pref.current.className = "review-read";
      setIsShowMore(true);
    } else {
      setIsShowMore(false);
    }
  }, []);
  const onChange = () => {
    if (!pref.current) return;
    setRead(!read);
    if (read) {
      pref.current.className = "review-read";
    } else {
      pref.current.className = "";
    }
  };
  return (
    <li key={review.id}>
      <div className="comment">
        <div className="comment-body">
          <div className="comment-rating ratings-container mb-0">
            <div className="ratings-full">
              <span
                className="ratings"
                style={{ width: review.rating * 20 + "%" }}
              ></span>
              <span className="tooltiptext tooltip-top">
                {toDecimal(review.rating)}
              </span>
            </div>
          </div>
          <div className="comment-user">
            <span className="comment-date text-body">
              {formateDate(review.createdAt)}
            </span>
            <h4>
              <ALink href="#">{review.reviewer.name}</ALink>
            </h4>
          </div>

          <div className="comment-content">
            <p ref={pref}>{review.comment}</p>
            <span
              className={` read-more cursor-pointer ${
                !isShowMore ? "d-none" : ""
              }`}
              onClick={onChange}
            >
              Read {!read ? "more" : "less"}
            </span>
          </div>
        </div>
      </div>
      {review?.images && (
        <div className="comment-media d-flex flex-wrap ">
          {review.images.map((img) => {
            return (
              <ALink href="#">
                <img
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
