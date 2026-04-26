
import "../styles/Home.css";


function Home() {
  const isLoggedIn = !!localStorage.getItem("token");
  const name = localStorage.getItem("name");
    return (
    <div>
      
      <div className="home-section">
        
        {/* LEFT: Quote */}
        <div className="left-quote">
          <h1>
            “Your Health, Our Priority — Healthcare Medical Assistance at your service.”
          </h1>
          {/* If NOT logged in → show Get Started */}
        {!isLoggedIn && (
          <button
            className="cta-btn"
            onClick={() => (window.location.href = "/login")}
          >
            Get Started
          </button>
        )}

        {/* If logged in → show Welcome + Dashboard button */}
        {isLoggedIn && (
          <>
            <h2>Welcome, {name} 👋</h2>
            <button
              className="cta-btn"
              onClick={() => (window.location.href = "/userdashboard")}
            >
              Go to Dashboard
            </button>
          </>
        )}

        </div>

        {/* RIGHT: Image */}
        <div className="right-image">
          <img 
            src="/image/homeimage.jpg" 
            alt="Medical Assistance" 
          />
        </div>

      </div>
      
    </div>
    )
  }
  
  export default Home;
  