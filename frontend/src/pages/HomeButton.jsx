import { Link } from "react-router-dom";

const HomeButton = () => {
  return (
    <Link to="/" style={styles.btn}>
      ⬅ Home
    </Link>
  );
};

const styles = {
  btn: {
    position: "fixed",
    top: "15px",
    left: "15px",
    background: "#1e3a8a",
    color: "white",
    padding: "10px 18px",
    borderRadius: "8px",
    fontSize: "16px",
    textDecoration: "none",
    zIndex: 1000,
    boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
  },
};

export default HomeButton;
