import React from "react";
import HomeButton from "./HomeButton";

const About = () => {
  return (<div><HomeButton />
    <div style={styles.container}>
      <h1 style={styles.title}>About Us</h1>

      <p style={styles.text}>
        We are a virtual medical assistance platform designed to make healthcare
        easy, fast, and accessible for everyone. Our goal is to connect patients
        with certified doctors, offer AI-powered symptom checking, and simplify
        appointment booking.
      </p>

      <p style={styles.text}>
        Using modern technologies and secure cloud systems, we ensure every user
        receives accurate information and safe access to medical services from the
        comfort of their home.
      </p>

      <h2 style={styles.subtitle}>Our Mission</h2>
      <ul style={styles.list}>
        <li>✔ Provide easy healthcare access</li>
        <li>✔ Use AI to improve medical support</li>
        <li>✔ Connect patients with trusted doctors</li>
        <li>✔ Offer real-time chat and consultations</li>
      </ul>
    </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: "900px", margin: "auto", padding: "40px 20px" },
  title: { fontSize: "36px", color: "#1e3a8a", marginBottom: "20px" },
  subtitle: { fontSize: "26px", color: "#1e3a8a", marginTop: "30px" },
  text: { fontSize: "16px", lineHeight: "1.7", marginTop: "12px" },
  list: { marginTop: "15px", lineHeight: "1.8", fontSize: "16px" },
};

export default About;
