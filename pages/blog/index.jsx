import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import BlogHeader from "~/components/common/blog-header";
import Loader from "~/components/common/partials/loader";
import BlogSidebar from "~/components/common/partials/post/blog-sidebar";
import PostNine from "~/components/features/post/post-nine";
import { WORDPRESS_AUTH, WORDPRESS_URL } from "~/config";
import { getBlogs, getTopMenu } from "~/graphql/api";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";

export default function BlogPage({
  fetchedBlogs,
  fetchedBlogsPageInfo,
  menuItems = [],
  featuredBlogs,
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
          variables: { first: 9, after },
        }),
      });

      const blogData = await blogRes.json();

      if (blogData?.data && blogData?.data?.posts?.edges) {
        if (loadMore) {
          setBlogs([...blogs, ...blogData.data.posts.edges]);
          setPageInfo(blogData.data.posts.pageInfo);
        }
      }
    } catch (err) {}
  }

  return (
    <main className="main skeleton-body bg-white blog">
      <h1 className="d-none">Blog</h1>

      <BlogHeader menuItems={menuItems} />

      <div
        className="page-content pt-5 pb-10"
        style={{ maxWidth: "1280px", margin: "0 auto" }}
      >
        <div className="container">
          <div className="row gutter-lg">
            <div className="col-lg-9">
              <InfiniteScroll
                dataLength={blogs?.length}
                next={() => fetchMore(true, pageInfo?.endCursor)}
                hasMore={pageInfo?.hasNextPage}
                loader={
                  <div className="d-flex justify-content-center items-center">
                    <Loader loading small />
                  </div>
                }
                style={{
                  overflow: "visible",
                }}
              >
                <div className="posts grid row grid grid-3cols">
                  {!!blogs?.length ? (
                    blogs.map((blog, index) => (
                      <PostNine
                        key={blog.node.slug}
                        post={blog.node}
                        priority={index < 6}
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

export async function getStaticProps() {
  const blogRes = await fetch(WORDPRESS_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: WORDPRESS_AUTH,
    },
    method: "POST",
    body: JSON.stringify({
      query: getBlogs,
      variables: {
        first: 49,
        // tag: ["english"],
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
      fetchedBlogs: blogData?.data?.posts?.edges,
      fetchedBlogsPageInfo: blogData?.data?.posts?.pageInfo,
      menuItems,
      featuredBlogs: featuredBlogData?.data?.posts?.edges,
      pageMeta: {
        siteName: "Wow Skin Science",
        title:
          "Best blogs for skin & hair care tips, products for all skin & hair Type",
        description:
          "Discover the ultimate destination for expert skin & hair care tips, along with a curated selection of products for you. Explore our blog",
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
        image:
          (blogData?.data?.posts?.edges?.length &&
            blogData?.data?.posts?.edges?.[0]) ??
          getPublicImageURL("/images/wow-logo.webp"),
      },
    },
    revalidate: 60 * 60 * 24,
  };
}
