import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import BlogHeader from "~/components/common/blog-header";
import BlogBreadcrumbs from "~/components/common/partials/blog-breadcrumbs";
import Loader from "~/components/common/partials/loader";
import BlogSidebar from "~/components/common/partials/post/blog-sidebar";
import PostThree from "~/components/features/post/post-three";
import { WORDPRESS_AUTH, WORDPRESS_URL } from "~/config";
import {
  getBlogs,
  getCategories,
  getCategory,
  getTopMenu,
} from "~/graphql/api";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";

export default function BlogCategoryPage({
  category,
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
          variables: {
            first: 9,
            after,
            category: category.slug ? category.slug : "",
          },
        }),
      });

      const blogData = await blogRes.json();

      if (blogData.data && blogData.data.posts.edges) {
        if (loadMore) {
          setBlogs([...blogs, ...blogData.data.posts.edges]);
          setPageInfo(blogData.data.posts.pageInfo);
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
                  link={{ slug: category.slug, name: category.name }}
                />
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
                }}
              >
                <div className="posts">
                  {!!blogs?.length ? (
                    blogs
                      .slice(0, blogs.length)
                      .map((blog, index) => (
                        <PostThree
                          post={blog.node}
                          key={`blog-${blog.node.slug}`}
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
  const categoryRes = await fetch(WORDPRESS_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: WORDPRESS_AUTH,
    },
    method: "POST",
    body: JSON.stringify({
      query: getCategory,
      variables: {
        id: params.slug,
      },
    }),
  });

  const categoryData = await categoryRes.json();

  if (!categoryData.data.category) {
    return {
      notFound: true,
    };
  }

  const blogRes = await fetch(WORDPRESS_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: WORDPRESS_AUTH,
    },
    method: "POST",
    body: JSON.stringify({
      query: getBlogs,
      variables: {
        first: 9,
        category: categoryData.data.category.slug,
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

  const featuredBlogs = await featuredBlogData.data.posts.edges;

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

  let menuItems = menuData.data.menu.menuItems.nodes;

  for (let i = 0; i < menuItems.length; i++) {
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
      fetchedBlogs: blogData.data.posts.edges,
      fetchedBlogsPageInfo: blogData.data.posts.pageInfo,
      category: categoryData.data.category,
      menuItems,
      pageMeta: {
        siteName: "Wow Skin Science",
        title: categoryData.data.category.name,
        description:
          "Discover the ultimate destination for expert skin & hair care tips, along with a curated selection of products for you. Explore our blog",
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/category/${categoryData.data.category.slug}`,

        image: getPublicImageURL("/images/wow-logo.webp"),
      },
    },
    revalidate: 60 * 60 * 24,
  };
};

export const getStaticPaths = async () => {
  const categoryRes = await fetch(WORDPRESS_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: WORDPRESS_AUTH,
    },
    method: "POST",
    body: JSON.stringify({
      query: getCategories,
    }),
  });

  const categoryData = await categoryRes.json();

  const categories = categoryData.data.categories.edges;

  const paths = categories.map((category) => ({
    params: { slug: category.node.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
