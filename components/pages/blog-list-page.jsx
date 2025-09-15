"use client";

import Link from "next/link";

export default function BlogListing({ articles }) {
  return (
    <div className="seo-blog">
      <div className="max-w-7xl mx-auto">
        <h1 className="py-20">Our Blogs</h1>
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
                <Link href={`/blog/${blog.id}`} legacyBehavior>
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

