import "@wordpress/block-library/build-style/common.css";
import "@wordpress/block-library/build-style/style.css";
import "@wordpress/block-library/build-style/theme.css";

import BlogHeader from "~/components/common/blog-header";
import BlogBreadcrumbs from "~/components/common/partials/blog-breadcrumbs";
import BlogSidebar from "~/components/common/partials/post/blog-sidebar";
import ALink from "~/components/features/custom-link";
import Image from "~/components/image";
import {
  STORE_ID,
  WORDPRESS_AUTH,
  WORDPRESS_IP,
  WORDPRESS_URL,
} from "~/config";
import { getBlog, getBlogs, getStore, getTopMenu } from "~/graphql/api";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import fetchData from "~/utils/fetchData";

export default function BlogDetailsPage({ blog, featuredBlogs, menuItems }) {
  const replaceLinks = (content) => {
    const domain = `${process.env.NEXT_PUBLIC_SITE_URL}/blog`;
    const ip = WORDPRESS_IP;
    const regEx = new RegExp(ip, "g");
    const newContent = content.replace(regEx, domain);

    const externalLink = new RegExp(
      `<a href="http|https://(?!${domain}).*?"`,
      "g"
    );

    newContent.replace(externalLink, (match) => {
      newContent.replace(
        match,
        `${match} target="_blank" rel="noopener noreferrer"`
      );
    });

    return newContent;
  };

  return (
    <main className="main" style={{ background: "#fff" }}>
      <BlogHeader menuItems={menuItems} />
      <div
        className="page-content with-sidebar pb-10 pt-5"
        style={{ maxWidth: "1280px", margin: "0 auto" }}
      >
        <div className="container">
          <div className="row gutter-lg">
            <div className="col-lg-9 blog">
              <div className="mb-2">
                <BlogBreadcrumbs link={{ name: blog.title, slug: blog.slug }} />
              </div>

              <div className="pt-2">
                <p>
                  {blog.categories.nodes.map((category, index) => (
                    <ALink
                      href={`/blog/category/${category.slug}`}
                      key={`category: ${index}`}
                      className="mr-2"
                      style={{
                        background: "#eeb63d",
                        padding: "0.5rem 1rem",
                        borderRadius: "0.5rem",
                        color: "white",
                      }}
                    >
                      {category.name}
                    </ALink>
                  ))}
                </p>

                <h2 className="mb-3" style={{ color: "black" }}>
                  {blog.title}
                </h2>

                <div className="post-meta mb-4">
                  <ALink href="#" className="post-author">
                    {blog.author.node.name}
                  </ALink>{" "}
                  |{" "}
                  <ALink href="#" className="post-date">
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                      timeZone: "UTC",
                    })}
                  </ALink>{" "}
                  |{" "}
                  <ALink href="#" className="post-date">
                    {blog.readingTime} min read
                  </ALink>
                </div>

                <div
                  className="w-100 mb-4"
                  style={{
                    position: "relative",
                    aspectRatio: "16/9",
                  }}
                >
                  <Image
                    src={blog?.featuredImage?.node?.mediaItemUrl}
                    layout="fill"
                    objectFit="cover"
                    priority
                    style={{
                      borderRadius: "0.5rem",
                      backgroundColor: "#DEE6E8",
                    }}
                    onError={(e) => {
                      e.target.src = "/images/wow-logo.webp";
                    }}
                    loader="wp"
                  />
                </div>
              </div>

              <div
                style={{ color: "black" }}
                className="blog-content"
                dangerouslySetInnerHTML={{
                  __html: replaceLinks(blog.content),
                }}
              />

              <hr
                style={{
                  marginTop: "4rem",
                  marginBottom: "4rem",
                  border: "none",
                  borderTop: "2px solid #e5e5e5",
                }}
              />

              <div
                style={{
                  color: "black",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "3rem",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "84px",
                    height: "84px",
                  }}
                >
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={
                      blog.author.node.avatar.url ??
                      getPublicImageURL("/images/avatar.png")
                    }
                    loader="local"
                    className="rounded-circle"
                    alt={blog.author.node.name}
                    style={{ borderRadius: "50%" }}
                  />
                </div>

                <div>
                  <h4 className="author-name mb-2">{blog.author.node.name}</h4>
                  <p className="author-bio">{blog.author.node.description}</p>
                </div>
              </div>
            </div>

            <BlogSidebar
              featuredBlogs={featuredBlogs}
              tags={blog.tags.nodes}
              singleBlog
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export const getStaticProps = async ({ params }) => {
  const { getStore: store } = await fetchData(getStore, {
    id: STORE_ID,
    deviceType: "WEB",
  });

  const { webUrl } = store;

  const blogRes = await fetch(WORDPRESS_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: WORDPRESS_AUTH,
    },
    method: "POST",
    body: JSON.stringify({
      query: getBlog,
      variables: {
        id: params?.slug,
        idType: "SLUG",
      },
    }),
  });

  const blogData = await blogRes.json();

  const blog = await blogData.data.post;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog?.title,
    image: blog?.featuredImage.node.mediaItemUrl
      ? [blog?.featuredImage?.node?.mediaItemUrl]
      : [],
    datePublished: blog?.date,
    dateModified: blog?.date,
    author: [
      {
        "@type": "Person",
        name: blog.author?.node?.name,
        url: blog.author?.node?.avatar?.url || "",
      },
    ],
  };

  const breadcrumbListJsonLd = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${webUrl}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${webUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: blog?.title,
        item: `${webUrl}/blog/${blog?.slug}`,
      },
    ],
  };

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

  if (!blog) {
    return { notFound: true };
  }

  return {
    props: {
      blog,
      store,
      featuredBlogs,
      menuItems,
      pageMeta: {
        siteName: "Wow Skin Science",
        title: blog.title,
        description: blog?.seo?.metaDesc,
        image:
          blog?.featuredImage?.node?.mediaItemUrl ??
          getPublicImageURL("/images/wow-logo.webp"),
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blog.slug}`,
        type: "article",
        authorName: blog.author?.node?.name,
        twitterLabels: ["Written by", "Est. reading time"],
        twitterDatas: [blog.author?.node?.name, `${blog.readingTime} minutes`],
        articleJsonLd,
        breadcrumbListJsonLd,
      },
    },
    revalidate: 60 * 60 * 24,
  };
};

export const getStaticPaths = async () => {
  const blogRes = await fetch(WORDPRESS_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: WORDPRESS_AUTH,
    },
    method: "POST",
    body: JSON.stringify({
      query: getBlogs,
    }),
  });

  const blogData = await blogRes.json();
  const blogs = blogData.data.posts.edges;

  const paths = blogs.map((blog) => ({
    params: {
      slug: blog.node.slug,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
