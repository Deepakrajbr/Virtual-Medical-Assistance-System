import { useEffect, useState } from "react";
import { getUserAppointments } from "../../../api/api";

export default function InfoBanner() {

  const token = localStorage.getItem("token");
  const [next, setNext] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getUserAppointments(token);
  
    const now = new Date();
  
    // filter only future approved appointments
    const upcoming = data.find(a => {
      if (a.status !== "approved") return false;
  
      
      const appointmentDateTime = new Date(`${a.date} ${a.time}`);
  
      return appointmentDateTime > now;
    });
  
    setNext(upcoming);
  };

  if (!next) return null;

  return (
    <div className="info-banner">
      <span>
        📅 Appointment with {next.doctorName} on {next.date} at {next.time}
      </span>

      <button>View Details</button>
    </div>
  );
}