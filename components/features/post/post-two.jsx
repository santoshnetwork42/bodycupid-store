import Image from "~/components/image";
import ALink from "~/components/features/custom-link";

function PostTwo(props) {
  const { post, adClass = "", priority } = props;

  return (
    <div className={`post post-list-sm ${adClass}`}>
      <figure className="post-media">
        <ALink href={`/blog/${post.slug}`}>
          <div className="relative">
            <Image
              src={post?.featuredImage?.node?.mediaItemUrl}
              alt={post.title}
              effect="opacity"
              layout="fill"
              objectFit="cover"
              style={{ backgroundColor: "#DEE6E8" }}
              onError={(e) => {
                e.target.src = "/images/wow-logo.webp";
              }}
              loader="wp"
              priority={priority}
            />
          </div>
        </ALink>
      </figure>

      <div className="post-details">
        <div className="post-meta">
          <ALink href="#" className="post-date p-0">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
              timeZone: "UTC",
            })}
          </ALink>
        </div>
        <h4 className="post-title">
          <ALink
            href={`/blog/${post.slug}`}
            style={{
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              padding: 0,
              marginTop: "0.5rem",
              lineClamp: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: "black",
              display: "-webkit-box",
              maxHeight: "5rem",
            }}
          >
            {post.title}
          </ALink>
        </h4>
      </div>
    </div>
  );
}

export default PostTwo;
