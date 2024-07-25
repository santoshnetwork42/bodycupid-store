import React from "react";

import ALink from "~/components/features/custom-link";
import Image from "next/image";

function PostThree(props) {
  const {
    post,
    adClass = "mb-4",
    btnText = "Read more",
    btnAdClass = "",
    priority,
  } = props;

  return (
    <div className={`post post-list ${adClass}`}>
      <figure className="post-media">
        <ALink href={`/blog/${post.slug}`}>
          <div
            className="relative"
            style={{
              width: "100%",
              aspectRatio: "16/9",
            }}
          >
            <Image
              src={post?.featuredImage?.node?.mediaItemUrl}
              alt="post image"
              effect="opacity"
              layout="fill"
              objectFit="cover"
              style={{ backgroundColor: "#DEE6E8" }}
              onError={(e) => {
                e.target.src = "/images/wow-logo.webp";
              }}
              priority={priority}
            />
          </div>
        </ALink>
      </figure>

      <div className="post-details">
        <div className="post-meta">
          <ALink href="#" className="post-date">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
              timeZone: "UTC",
            })}
          </ALink>
        </div>

        <h6 className="post-title" style={{ color: "black" }}>
          <ALink href={`/blog/${post.slug}`}>{post.title}</ALink>
        </h6>

        <div
          dangerouslySetInnerHTML={{
            __html: post.excerpt,
          }}
          className="post-content"
        />
        <ALink
          href={`/blog/${post.slug}`}
          className={`btn btn-link btn-underline btn-primary ${btnAdClass}`}
          style={{ color: "#eeb63d" }}
        >
          {btnText}
        </ALink>
      </div>
    </div>
  );
}

export default PostThree;
