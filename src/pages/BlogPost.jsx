import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import "../css/blog.css";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="blog-post-page py-5">
      <div className="container">
        <Link to="/blog" className="btn btn-outline-info mt-5">
          ← Back to Blog
        </Link>
        <div className="blog-post-card">
          <div className="blog-post-header">
            <span className="blog-category">{post.category}</span>
            <h1 className="blog-post-title">{post.title}</h1>
            <div className="blog-post-meta">
              <span>{post.date}</span>
              <span>By {post.author}</span>
            </div>
          </div>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
