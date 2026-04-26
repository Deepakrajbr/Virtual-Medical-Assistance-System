import { useState } from "react";
import "./UploadKnowledge.css";

export default function UploadKnowledge() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file); // 👈 MUST MATCH backend

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/pdf/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ PDF uploaded successfully");
        setFile(null);
      } else {
        alert(data.message);
      }

    } catch (err) {
      alert("Upload failed");
    }

    setLoading(false);
  };

  return (
    <div className="upload-container">

      <h2>📁 Upload Medical Knowledge</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload PDF"}
      </button>

      {file && <p>Selected: {file.name}</p>}

    </div>
  );
}