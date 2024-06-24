import StickyBox from "react-sticky-box";

import Card from "~/components/features/accordion/card";
import ALink from "~/components/features/custom-link";
import PostTwo from "~/components/features/post/post-two";
import { LeftArrow, RightArrow } from "~/components/icons";

function BlogSidebar({ featuredBlogs, tags, singleBlog }) {
  const toggleSidebarHandler = (e) => {
    document.querySelector("body").classList.toggle("right-sidebar-active");
  };

  const hideSidebarhandler = (e) => {
    document.querySelector("body").classList.remove("right-sidebar-active");
  };

  return (
    <div className="col-lg-3 blog right-sidebar sidebar-fixed sticky-sidebar-wrapper">
      <div className="sidebar-overlay" onClick={hideSidebarhandler}>
        <ALink className="sidebar-close" href="#">
          <RightArrow color="white" />
        </ALink>
      </div>

      <div className="sidebar-toggle" onClick={toggleSidebarHandler}>
        <LeftArrow color="white" />
      </div>

      <StickyBox offsetTop={20} className="blog-sidebar-wrapper">
        <div className="sidebar-content">
          {!!featuredBlogs?.length && (
            <div className="widget widget-collapsible">
              <Card
                title={<span style={{ color: "black" }}>TOP BLOGS</span>}
                expanded={true}
                iconColor="black"
              >
                <ul className="widget-body">
                  {featuredBlogs.map((post) => (
                    <div className="post-col" key={post.node.slug}>
                      <PostTwo post={post.node} priority />
                    </div>
                  ))}
                </ul>
              </Card>
            </div>
          )}

          {!!tags?.length && (
            <div className="widget widget-collapsible border-no">
              <Card
                title={<span style={{ color: "black" }}>TAGS</span>}
                expanded={true}
                iconColor="black"
              >
                <ul className="widget-body">
                  {tags.map((tag) => (
                    <ALink
                      style={{ color: "black" }}
                      key={tag.slug}
                      href={`/blog/tag/${tag.slug}`}
                      className="tag"
                    >
                      {tag.name}
                    </ALink>
                  ))}
                </ul>
              </Card>
            </div>
          )}
        </div>
      </StickyBox>
    </div>
  );
}

export default BlogSidebar;
