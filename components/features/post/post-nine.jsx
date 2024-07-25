import Image from "~/components/image";
import ALink from "~/components/features/custom-link";

function PostNine(props) {
  const {
    post,
    adClass = "",
    btnText = "Read more",
    btnAdClass = "",
    priority,
  } = props;

  return (
    <div className="grid-item">
      <div
        className={`post post-grid ${adClass}`}
        style={{
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          padding: "1rem",
          borderRadius: "1.5rem",
        }}
      >
        <ALink href={`/blog/${post.slug}`} className="post-media">
          <div
            style={{
              width: "100%",
              aspectRatio: "16/9",
              position: "relative",
            }}
          >
            <Image
              src={post.featuredImage?.node?.mediaItemUrl}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              priority={!!priority}
              className="border-2"
              onError={(e) => {
                e.target.src = "/images/logo.webp";
              }}
              style={{ backgroundColor: "#DEE6E8" }}
              loader="wp"
            />
          </div>
        </ALink>

        <div className="post-details pb-2">
          <div
            className="post-meta"
            style={{
              lineClamp: 1,
              WebkitLineClamp: 1,
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              display: "-webkit-box",
              color: "black",
            }}
          >
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
              timeZone: "UTC",
            })}{" "}
            | {post.author.node.name} | {post?.seo?.readingTime} min read
          </div>

          <h6 className="post-title" style={{ color: "black" }}>
            <ALink href={`/blog/${post.slug}`}>{post.title}</ALink>
          </h6>

          <div
            className="post-content"
            dangerouslySetInnerHTML={{
              __html: post.excerpt,
            }}
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
    </div>
  );
}

export default PostNine;
