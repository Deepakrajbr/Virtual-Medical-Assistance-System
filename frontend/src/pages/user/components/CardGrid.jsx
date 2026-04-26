import { useEffect, useState } from "react";
import { getUserAppointments } from "../../../api/api";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import "./cardgrid.css"

export default function CardGrid() {

  const token = localStorage.getItem("token");
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  
    const interval = setInterval(() => {
      load();
    }, 3000); 
  
    return () => clearInterval(interval);
  
  }, []);
  const load = async () => {
    try {
      const token = localStorage.getItem("token");
  
      const res = await fetch(
        "http://localhost:5000/api/appointments/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const data = await res.json();
  
      setAppointments(Array.isArray(data) ? data : []);
  
    } catch (err) {
      console.error(err);
    }
  };

  const upcoming = appointments.filter(a => a.status === "approved").length;
  

  return (
    <div className="card-grid">
      <Card title="Book Appointment" sub="Next available" onClick={() => navigate("/doctor")} />
      <Card title="My Appointments" sub={`${upcoming} Upcoming`} onClick={() => navigate("/myappointments")} />
      <Card title="Find Doctors" sub="Explore specialists" onClick={() => navigate("/doctor")}/>
      <Card title="AI Medical Chat" sub="Open" onClick={() => navigate("/aiconsultation")}/>
      <Card title="View Reports" sub="Last recently"onClick={() => navigate("/userreport")} />
      <Card title="Chat Doctor" sub="Last uploaded recently" onClick={() => navigate("/userchat")} />

    </div>
  );
}