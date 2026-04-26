export default function Welcome() {
    const name = localStorage.getItem("name") || "User";
  
    return (
      <div className="welcome">
        <h1>Welcome, {name}!</h1>
        <p>Manage your health services with ease</p>
      </div>
    );
  }