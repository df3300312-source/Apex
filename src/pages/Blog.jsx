import React from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import "../css/blog.css";

const Blog = () => {
  return (
    <div className="blog-page py-5">
      <div className="container">
        <h1 className="text-center mt-5 text-white">ApexMarkets Blog</h1>
        <p className="text-center text-white-50 mb-5">
          Insights, tips, and news from the world of crypto investing.
        </p>

        <div className="row g-4">
          {blogPosts.map((post) => (
            <div className="col-md-6 col-lg-4" key={post.id}>
              <div className="blog-card">
                <div className="blog-card-img">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="img-fluid"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x200?text=Blog+Image";
                    }}
                  />
                </div>
                <div className="blog-card-body">
                  <span className="blog-category">{post.category}</span>
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <div className="blog-meta">
                    <span>{post.date}</span>
                    <span>By {post.author}</span>
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="btn btn-outline-info btn-sm mt-3"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
