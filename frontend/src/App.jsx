import Aicard from "./cards/Aicard";
import Featurecard from "./cards/Featurecard";
import Doctor from "./pages/Doctor";
import Footer from "./pages/Footer";
import Header from "./pages/Header";
import Home from "./pages/Home";
import "./styles/App.css"

function App() {
  return(
    <div>
      
      <Header />
      <Home />
      <Featurecard />
      <Aicard />
      <Doctor />
      <Footer />
    </div>
  );
}

export default App