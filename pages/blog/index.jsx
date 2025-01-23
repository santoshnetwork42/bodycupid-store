// pages/blogs/index.jsx
import { SEOBOT_API_KEY } from "~/config";

import Link from "next/link";

async function getPosts() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const url = `https://cdn.seobotai.com/${SEOBOT_API_KEY}/system/base.json`;
    const resp = await fetch(url, requestOptions);

    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    return await resp.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

function BlogListing({ articles }) {
  return (
    <div className="seo-blog">
      <div className="max-w-7xl mx-auto">
        <h1 className="py-20">Our Blog</h1>
        <div className="grid">
          {articles.length > 0 ? (
            articles.map((blog) => (
              <div
                key={blog.s}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="blog-item animate"
              >
                <Link href={`/blog/${blog.id}`}>
                  <a className="link">
                    <div className="card">
                      <div className="aspect-ratio">
                        <img src={blog.i} alt={blog.d || "Blog Image"} />
                      </div>

                      <div className="content">
                        {blog.tg && blog.tg.length > 0 && (
                          <div className="tags">
                            {blog.tg.map((tag, index) => (
                              <span key={index} className="tag">
                                {tag.t}
                              </span>
                            ))}
                          </div>
                        )}

                        <h2>{blog.h || "Untitled"}</h2>

                        <div className="date">
                          {blog.cr
                            ? new Date(blog.cr).toLocaleDateString()
                            : "Unknown date"}
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            ))
          ) : (
            <p className="no-posts">No blog posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const articles = await getPosts();

  return {
    props: {
      articles,
    },
    revalidate: 3600, // Revalidate every hour
  };
}

export default BlogListing;
