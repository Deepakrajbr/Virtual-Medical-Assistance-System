import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Welcome from "./components/Welcome";
import InfoBanner from "./components/InfoBanner";
import CardGrid from "./components/CardGrid";
import "./UserDashboard.css";

export default function UserDashboard() {
  return (
    <div className="ud-layout">

      <Sidebar />

      <div className="ud-main">
        <Topbar />

        <div className="ud-content">
          <Welcome />
          <InfoBanner />
          <CardGrid />
        </div>
      </div>

    </div>
  );
}