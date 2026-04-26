import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WriteBlog.css";

export default function WriteBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    // ✅ validation
    if (!title.trim() || !content.trim()) {
      alert("Please fill all required fields!");
      return;
    }
  
    const token = localStorage.getItem("token");
  
    try {
      const res = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          image,
        }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert("Blog posted successfully! 🎉");
  
        // ✅ CLEAR FORM
        setTitle("");
        setContent("");
        setImage("");
  
        // optional navigation
        // navigate("/blog");
      } else {
        alert(data.msg || "Error posting blog");
      }
  
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="wb-container">
      <div className="wb-card">

        <h2 className="wb-title">✍️ Write a Blog</h2>

        <input
          className="wb-input"
          placeholder="Enter blog title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="wb-input"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <textarea
          className="wb-textarea"
          placeholder="Write your blog content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

<button
  className="wb-btn"
  onClick={handleSubmit}
  disabled={!title || !content}
>
  Publish Blog 🚀
</button>

      </div>
    </div>
  );
}