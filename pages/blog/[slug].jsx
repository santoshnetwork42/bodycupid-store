// pages/blogs/[slug].jsx
import Link from "next/link";
import React from "react";
import { ArrowLeft } from "~/components/icons";

const BlogPost = ({ blog, error }) => {
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{error}</h1>
          <Link href="/blog">
            <a className="text-blue-500 hover:underline">
              Return to blog listing
            </a>
          </Link>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
          <Link href="/blog">
            <a className="text-blue-500 hover:underline">
              Return to blog listing
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="seo-blog-post seo-global-css min-h-screen bg-white"
    >
      <div className="seo-blog-post max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Link href="/blog">
          <a className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-7">
            <div className="mb-4 flex items-top">
              <span className="mr-2">
                {" "}
                <ArrowLeft className="w-2 h-2 mr-2" size={18} />
              </span>
              Back to blogs
            </div>
          </a>
        </Link>

        <article className="article">
          <div className="aspect-w-16 aspect-h-9 mb-8">
            <img
              src={blog.image || "/default-image.jpg"}
              alt={blog.metaDescription || "Blog Image"}
              className="rounded-lg object-cover w-full h-[400px]"
            />
          </div>

          <header className="mb-8 header">
            <div className="flex flex-col-reverse flex-wrap gap-4 mb-4 tags ">
              {blog.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag.title}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="blogTitle">
              {blog.metaDescription || "No title"}
            </div>
            <div className="category">
              {blog.category.title || "No category"}
            </div>
            <time className="text-gray-600">
              CreatedAt - &nbsp;
              {new Date(blog.createdAt).toLocaleDateString() || "Unknown date"}
            </time>
          </header>

          {blog.html ? (
            <div
              className="prose prose-lg max-w-full"
              dangerouslySetInnerHTML={{ __html: blog.html }}
            />
          ) : (
            <p>No article content available.</p>
          )}
        </article>
      </div>
    </div>
  );
};

// Add getServerSideProps for server-side data fetching
export async function getServerSideProps({ params }) {
  const { slug } = params;

  if (!slug) {
    return {
      props: {
        error: "Blog ID not found",
      },
    };
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_SEOBOT_API_KEY;
    const key = `https://cdn.seobotai.com/${apiUrl}/blog/${slug}.json`;

    const response = await fetch(key);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blog = await response.json();

    return {
      props: {
        blog,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.message,
      },
    };
  }
}
// 6.5.1
export default BlogPost;
