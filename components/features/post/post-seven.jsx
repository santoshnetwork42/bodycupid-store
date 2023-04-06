import React from "react";

import ALink from "~/components/features/custom-link";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import OptimizedImage from "../optimized-image";

function PostSeven(props) {
  const {
    post,
    adClass = "mb-7",
    btnText = "Read more",
    btnAdClass = "",
  } = props;

  const { featuredImage, title, createdAt } = post;

  return (
    <div className={`post post-mask gradient ${adClass}`}>
      <figure className="post-media">
        {
          <ALink href={`/blog/${post?.id}`}>
            {
              <OptimizedImage
                src={getPublicImageURL(featuredImage)}
                alt={title}
                loading="lazy"
              />
            }
          </ALink>
        }
      </figure>

      <div className="post-details">
        <div className="post-meta">
          on{" "}
          <ALink href="#" className="post-date">
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
              timeZone: "UTC",
            })}
          </ALink>{" "}
        </div>
        <h4 className="post-title">
          <ALink href={`/blog/${post?.id}`}>{title}</ALink>
        </h4>
        <ALink
          href={`/blog/${post?.id}`}
          className={`btn btn-link btn-underline btn-white ${btnAdClass}`}
        >
          {btnText}
          <i className="d-icon-arrow-right"></i>
        </ALink>
      </div>
    </div>
  );
}

export default PostSeven;
