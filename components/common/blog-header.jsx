import { useRouter } from "next/router";
import { memo } from "react";

import BlogMobileMenu from "~/components/common/blog-mobile-menu";
import ALink from "~/components/features/custom-link";
import PostTwo from "~/components/features/post/post-two";
import { DownAngle, Hamburger } from "~/components/icons";
import Image from "~/components/image";
import { useSource } from "~/utils/contexts/navbar";

function BlogHeader({ menuItems }) {
  const router = useRouter();
  const source = useSource();
  const pathname = router.asPath;

  const showMobileMenu = () => {
    document.querySelector("body").classList.add("mmenu-active");
  };

  return (
    <div>
      <header className="header header-border blog">
        <div className="header-bottom fix-top sticky-content">
          <div className="header-middle header-middle-blog">
            <div className="container d-flex justify-content-between align-items-center">
              <div>
                <ALink
                  href="#"
                  className="mobile-menu-toggle"
                  onClick={showMobileMenu}
                >
                  <Hamburger />
                </ALink>
              </div>

              <ALink
                href={source === "app" ? "/blog" : "/"}
                className="logo"
                style={{
                  marginRight: "0",
                }}
              >
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  width={120}
                  height={80}
                  quality={80}
                  priority
                  objectFit="contain"
                  loader="local"
                />
              </ALink>

              <div style={{ width: "28px", height: "28px" }} />
            </div>
          </div>

          <div className="header-left justify-content-center">
            <nav className="main-nav">
              <ul className="menu">
                {menuItems
                  .filter((m) => m.path !== "/web-stories")
                  .map((menu, index) => (
                    <li
                      key={index}
                      className={`
                    ${
                      menu.categoryBlogs && menu.categoryBlogs.length
                        ? "submenu"
                        : ""
                    }
                    `}
                      style={{
                        color:
                          pathname ===
                            `/blog${menu.path === "/" ? "" : menu.path}` &&
                          "#eeb63d",
                      }}
                    >
                      <ALink
                        className="text-uppercase"
                        href={`/blog${menu.path}`}
                      >
                        {menu.label}
                        {!!menu?.categoryBlogs?.length && (
                          <i>
                            <DownAngle color="currentColor" size={12} />
                          </i>
                        )}
                      </ALink>

                      {!!menu.categoryBlogs?.length && (
                        <div className="megamenu" style={{ width: "320px" }}>
                          <ul>
                            {menu.categoryBlogs.map((subItem) => (
                              <li key={`sub-categories-${subItem.node.slug}`}>
                                <ALink
                                  href={`/blog/${subItem.node.slug}`}
                                  className="w-100"
                                >
                                  <PostTwo
                                    post={subItem.node}
                                    adClass="mt-0 mb-0 pr-2"
                                  />
                                </ALink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <BlogMobileMenu menuItems={menuItems} />
    </div>
  );
}

export default memo(BlogHeader);
