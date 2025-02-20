import React from "react";
import ALink from "~/components/features/custom-link";
import EmblaCarousel from "~/components/features/react-embla";
import useWindowDimensions from "~/utils/getWindowDimension";
import Image from "~/components/image";
import { eventActions } from "~/store/events";
import { connect } from "react-redux";

function ExploreBlogSection({ blogs, blogClicked }) {
  const { isSmallSize: isMobile } = useWindowDimensions();

  if (!blogs) return null;
  else if (blogs.length === 0) return null;

  return (
    <div className="container pt-6 pb-6">
      <div className="d-flex justify-content-between mb-5">
        <h2 className="capitalize-title m-0">EXPLORE BLOGS</h2>

        <ALink href="/blog">
          <p className="view-all text-underline m-0">VIEW ALL</p>
        </ALink>
      </div>

      <div className="mt-4 position-relative">
        {isMobile ? (
          <EmblaCarousel options={{ loop: true }}>
            {blogs.slice(0, 3).map((blog) => (
              <ALink
                key={`explore-blog-${blog?.s}`}
                href={`/blog/${blog?.id}`}
                style={{
                  flex: "0 0 100%",
                  padding: "0 0.5rem",
                }}
                onClick={() => {
                  blogClicked({
                    item_name: blog?.h,
                    item_id: blog?.id,
                    item_slug: blog?.s,
                    item_parent_category: "Explore Blogs",
                  });
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "280px",
                    position: "relative",
                  }}
                  className="product-card"
                >
                  <Image
                    src={blog?.i}
                    alt={blog?.h}
                    layout="fill"
                    quality={50}
                    objectFit="cover"
                    priority={false}
                    loader={"wp"}
                  />
                </div>

                <h5 className="mt-4 mb-2 font-weight-bolder">{blog?.h}</h5>
                <div>{blog?.d}</div>
                {/* <div
                  dangerouslySetInnerHTML={{
                    __html: blog?.d,
                  }}
                  className="lh-111"
                /> */}
              </ALink>
            ))}
          </EmblaCarousel>
        ) : (
          <div className="rowss">
            {blogs.slice(0, 3).map((blog) => (
              <React.Fragment key={"post-nine" + blog?.s}>
                <ALink
                  href={`/blog/${blog?.s}`}
                  className="col-lg-4"
                  onClick={() => {
                    blogClicked({
                      item_name: blog?.h,
                      item_id: blog?.id,
                      item_slug: blog?.s,
                      item_parent_category: "Explore Blogs",
                    });
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "280px",
                      position: "relative",
                    }}
                    className="product-card"
                    priority={false}
                  >
                    <Image
                      src={blog?.i}
                      alt={blog?.h}
                      layout="fill"
                      quality={75}
                      objectFit="cover"
                      loader={"wp"}
                    />
                  </div>
                  <div
                    className="d-flex justify-content-between flex-column"
                    style={{ height: "calc(100% - 280px)" }}
                  >
                    <h5
                      className="mt-4 mb-2 font-weight-bolder"
                      style={{
                        lineClamp: 2,
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        display: "-webkit-box",
                      }}
                    >
                      {blog.h}
                    </h5>
                    <div className="mb-3">{blog?.d}</div>
                    {/* <div
                      dangerouslySetInnerHTML={{
                        __html: blog?.,
                      }}
                      className="lh-111"
                    /> */}
                  </div>
                </ALink>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  blogClicked: eventActions.blogClicked,
})(ExploreBlogSection);
