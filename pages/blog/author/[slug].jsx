import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import BlogHeader from "~/components/common/blog-header";
import BlogBreadcrumbs from "~/components/common/partials/blog-breadcrumbs";
import Loader from "~/components/common/partials/loader";
import BlogSidebar from "~/components/common/partials/post/blog-sidebar";
import PostThree from "~/components/features/post/post-three";
import {
  Facebook,
  House,
  Instagram,
  LinkedIn,
  Twitter,
} from "~/components/icons";
import { WORDPRESS_AUTH, WORDPRESS_URL } from "~/config";
import { getAuthor, getAuthors, getBlogs, getTopMenu } from "~/graphql/api";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";

export default function BlogTagsPage({
  author,
  featuredBlogs,
  fetchedBlogs,
  fetchedBlogsPageInfo,
  menuItems,
}) {
  const [blogs, setBlogs] = useState(fetchedBlogs);
  const [pageInfo, setPageInfo] = useState(fetchedBlogsPageInfo);

  async function fetchMore(loadMore = false, after = "") {
    try {
      const blogRes = await fetch("/api/blogs", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          query: getBlogs,
          variables: { first: 9, after, author: author?.slug },
        }),
      });

      const blogData = await blogRes.json();

      if (blogData?.data && blogData?.data?.posts?.edges) {
        if (loadMore) {
          setBlogs([...blogs, ...blogData?.data?.posts?.edges]);
          setPageInfo(blogData?.data?.posts?.pageInfo);
        }
      }
    } catch (err) {}
  }

  useEffect(() => {
    setBlogs(fetchedBlogs);
    setPageInfo(fetchedBlogsPageInfo);
  }, [fetchedBlogs, fetchedBlogsPageInfo]);

  return (
    <main className="main blog" style={{ background: "#fff" }}>
      <BlogHeader menuItems={menuItems} />
      <div
        className="page-content with-sidebar pb-10 pt-5"
        style={{ maxWidth: "1280px", margin: "0 auto" }}
      >
        <div className="container">
          <div className="row gutter-lg">
            {/* Content */}
            <div className="col-lg-9 skeleton-body">
              <div className="mb-4">
                <BlogBreadcrumbs
                  link={{ name: author.name, slug: `/author/${author.slug}` }}
                />
              </div>
              <h4 class="archive-heading">
                Author: <span>{author?.name}</span>{" "}
              </h4>
              <div
                style={{
                  color: "black",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "3rem",
                  borderBottom: " 1px solid #e8e8e8",
                  paddingBottom: "42px",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "84px",
                    height: "84px",
                  }}
                >
                  {/* <Image
                    layout="fill"
                    objectFit="cover"
                    src={getPublicImageURL("/images/wow-logo.webp")}
                    loader="local"
                    className="rounded-circle"
                    alt={blog?.author?.node?.name || "d"}
                    style={{ borderRadius: "50%" }}
                  /> */}
                </div>

                <div>
                  <div className="d-flex">
                    <h5 className="author-name mt-2 grow-1">{author.name}</h5>
                    <ul class="d-flex gap-x-4 list-style-none pr-2">
                      <li className="pl-2">
                        <a
                          href="https://www.bodycupid.com/blog"
                          class=""
                          title="Website"
                        >
                          <House size={15}>Website</House>
                        </a>
                      </li>
                      {author?.seo?.social?.facebook && (
                        <li className="pl-2">
                          <a
                            href={`${author?.seo?.social?.facebook}`}
                            class=""
                            title="facebook"
                          >
                            <Facebook size={15}>Facebook</Facebook>
                          </a>
                        </li>
                      )}
                      {author?.seo?.social?.instagram && (
                        <li className="pl-2">
                          <a
                            href={`${author?.seo?.social?.instagram}`}
                            class=""
                            title="instagram"
                          >
                            <Instagram size={15}>Instagram</Instagram>
                          </a>
                        </li>
                      )}

                      {author?.seo?.social?.linkedIn && (
                        <li className="pl-2">
                          <a
                            href={`${author?.seo?.social?.linkedIn}`}
                            class=""
                            title="LinkedIn"
                          >
                            <LinkedIn size={15}>LinkedIn</LinkedIn>
                          </a>
                        </li>
                      )}

                      {author?.seo?.social?.twitter && (
                        <li className="pl-2">
                          <a
                            href={`${author?.seo?.social?.twitter}`}
                            class=""
                            title="twitter"
                          >
                            <Twitter size={15}>Twitter</Twitter>
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                  <p className="author-bio">{author.description}</p>
                </div>
              </div>

              <InfiniteScroll
                dataLength={blogs.length || 0}
                next={() => fetchMore(true, pageInfo?.endCursor)}
                hasMore={pageInfo?.hasNextPage}
                loader={
                  <div className="d-flex justify-content-center items-center">
                    <Loader loading small />
                  </div>
                }
                style={{
                  overflow: "visible",
                  marginTop: "32px",
                }}
              >
                <div className="posts">
                  {!!blogs?.length ? (
                    blogs
                      .slice(0, blogs.length)
                      .map((blog, index) => (
                        <PostThree
                          post={blog.node}
                          key={blog.node.slug}
                          priority={index < 3}
                        />
                      ))
                  ) : (
                    <div className="info-box with-icon">
                      <p className="mt-4">
                        No blogs were found matching your selection.
                      </p>
                    </div>
                  )}
                </div>
              </InfiniteScroll>
            </div>

            <BlogSidebar featuredBlogs={featuredBlogs} />
          </div>
        </div>
      </div>
    </main>
  );
}

export const getStaticProps = async ({ params }) => {
  const authorName = params?.slug || "";

  const authorRes = await fetch(WORDPRESS_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: WORDPRESS_AUTH,
    },
    method: "POST",
    body: JSON.stringify({
      query: getAuthor,
      variables: {
        id: params.slug,
        idType: "SLUG",
      },
    }),
  });

  const authorData = await authorRes.json();

  const blogRes = await fetch(WORDPRESS_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: WORDPRESS_AUTH,
    },
    method: "POST",
    body: JSON.stringify({
      query: getBlogs,
      variables: {
        first: 10,
        author: authorName,
      },
    }),
  });

  const blogData = await blogRes.json();

  const featuredBlogRes = await fetch(WORDPRESS_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: WORDPRESS_AUTH,
    },
    method: "POST",
    body: JSON.stringify({
      query: getBlogs,
      variables: {
        first: 5,
        tag: ["english"],
      },
    }),
  });

  const featuredBlogData = await featuredBlogRes.json();

  const featuredBlogs = await featuredBlogData?.data?.posts?.edges;

  const menuRes = await fetch(WORDPRESS_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: WORDPRESS_AUTH,
    },
    method: "POST",
    body: JSON.stringify({
      query: getTopMenu,
    }),
  });

  const menuData = await menuRes.json();

  let menuItems = menuData?.data?.menu?.menuItems?.nodes || [];

  for (let i = 0; i < menuItems?.length; i++) {
    if (menuItems[i].path.includes("/category/")) {
      const categorySlug = menuItems[i].path.split("/").pop();

      const categoryBlogRes = await fetch(WORDPRESS_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: WORDPRESS_AUTH,
        },
        method: "POST",
        body: JSON.stringify({
          query: getBlogs,
          variables: {
            first: 4,
            category: categorySlug,
            tag: ["english"],
          },
        }),
      });

      const categoryBlogData = await categoryBlogRes.json();

      menuItems[i].categoryBlogs = categoryBlogData.data.posts.edges;
    }
  }

  return {
    props: {
      featuredBlogs,
      author: authorData?.data?.user,
      fetchedBlogs: blogData?.data?.posts?.edges,
      fetchedBlogsPageInfo: blogData?.data?.posts?.pageInfo,
      menuItems,
      pageMeta: {
        siteName: "Wow Skin Science",
        title: authorData?.data?.user?.name,
        description:
          "Discover the ultimate destination for expert skin & hair care tips, along with a curated selection of products for you. Explore our blog",
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/author/${authorData.data?.user?.slug}`,
        image: getPublicImageURL("/images/wow-logo.webp"),
      },
    },
    revalidate: 60 * 60 * 24,
  };
};

export const getStaticPaths = async () => {
  const authorsRes = await fetch(WORDPRESS_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: WORDPRESS_AUTH,
    },
    method: "POST",
    body: JSON.stringify({
      query: getAuthors,
    }),
  });

  const authorsData = await authorsRes.json();

  const authors = authorsData?.data?.users?.edges;

  const paths = authors?.map((author) => ({
    params: { slug: author?.node?.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
