import React, { useEffect, useState } from "react";
import "../styles/BlogPage.css";
import HomeButton from "./HomeButton";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <div>
      <HomeButton />

      <div className="blog-container">
        <h1 className="blog-title">Health & Wellness Blogs</h1>

        <div className="blog-grid">
          {blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              
              <img
                src={blog.image || "/default-blog.jpg"}
                className="blog-img"
              />

              <h3>{blog.title}</h3>

              <p>
                {blog.content.length > 100
                  ? blog.content.slice(0, 100) + "..."
                  : blog.content}
              </p>

              <p style={{ fontSize: 12, margin: "0 15px" }}>
                By Dr. {blog.doctorName}
              </p>

              <button className="read-btn">Read More →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogPage;