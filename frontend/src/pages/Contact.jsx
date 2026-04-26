import React, { useState } from "react";
import HomeButton from "./HomeButton";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent Successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (<div><HomeButton />
    <div style={styles.container}>
      <h1 style={styles.title}>Contact Us</h1>

      <div style={styles.grid}>
        {/* Left: Contact Info */}
        <div style={styles.infoBox}>
          <h2 style={styles.subtitle}>Get in Touch</h2>
          <p>📍 Location: Kerala</p>
          <p>📞 Phone: +91 9876543210</p>
          <p>📧 Email: support@healthcare.com</p>
          <p>🕑 Working Hours: 24 X 7</p>
        </div>

        {/* Right: Contact Form */}
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            style={styles.input}
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            style={styles.input}
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            style={styles.textarea}
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>

          <button style={styles.button}>Send Message</button>
        </form>
      </div>
    </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: "1100px", margin: "auto", padding: "40px 20px" },
  title: { fontSize: "36px", color: "#1e3a8a", marginBottom: "30px", textAlign: "center" },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
  },
  infoBox: {
    fontSize: "18px",
    lineHeight: "1.8",
    padding: "20px",
    background: "#f0f4ff",
    borderRadius: "12px",
  },
  subtitle: { color: "#1e3a8a", fontSize: "24px", marginBottom: "15px" },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    background: "#1e3a8a",
    color: "#fff",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
    border: "none",
  },
};

export default Contact;
