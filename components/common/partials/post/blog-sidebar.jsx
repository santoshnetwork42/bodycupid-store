import StickyBox from "react-sticky-box";

import Card from "~/components/features/accordion/card";
import ALink from "~/components/features/custom-link";
import PostTwo from "~/components/features/post/post-two";
import {
  Facebook,
  Instagram,
  LeftArrow,
  RightArrow,
  Twitter,
  Youtube,
} from "~/components/icons";

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
          {/* <div id="bunyad-social-1" className="text-black">
            <div class="">
              <h5 class="archive-heading">Stay In Touch</h5>
            </div>
            <div class="">
              <ul
                class="services grid list-style-none"
                itemscope=""
                itemtype="http://schema.org/Organization"
              >
                <link itemprop="url" href="https://blog.buywow.in/" />
                <li class="service-wrap">
                  <a
                    href="https://www.facebook.com/bodycupid/"
                    className="d-flex"
                    target="_blank"
                    itemprop="sameAs"
                    rel="noopener"
                  >
                    <div className="pr-1">
                      {" "}
                      <Facebook size={20} />{" "}
                    </div>
                    <span className="">Facebook</span>
                  </a>
                </li>
                <li class="service-wrap">
                  <a
                    href="https://www.youtube.com/@BodyCupid/"
                    class="service service-link s-youtube"
                    target="_blank"
                    itemprop="sameAs"
                    rel="noopener"
                  >
                    <Youtube size={20} />
                    <span class="label">YouTube</span>
                  </a>
                </li>
                <li class="service-wrap">
                  <a
                    href="https://x.com/i/flow/login?redirect_after_login=%2Fbodycupid/"
                    class="service service-link s-twitter"
                    target="_blank"
                    itemprop="sameAs"
                    rel="noopener"
                  >
                    <Twitter size={20} />
                    <span class="label">X</span>
                  </a>
                </li>
                <li class="service-wrap">
                  <a
                    href="https://www.instagram.com/bodycupid/"
                    class="service service-link s-instagram"
                    target="_blank"
                    itemprop="sameAs"
                    rel="noopener"
                  >
                    <Instagram size={20} />
                    <span class="label">Instagram</span>
                  </a>
                </li>
              </ul>
            </div>
          </div> */}
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
