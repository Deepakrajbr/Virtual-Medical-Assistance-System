import { useEffect, useState } from "react";
import "../styles/DoctorConsultation.css";
import { useNavigate } from "react-router-dom";
import HomeButton from "./HomeButton";

function DoctorConsultation() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/doctors");
      const data = await res.json();
      setDoctors(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <HomeButton />

      <div className="consult-container">
        <h1>Book Consultation</h1>

        <div className="doctor-list">
          {doctors.map((doc) => (
            <div className="doctor-card" key={doc._id}>
              
              {/* optional image */}
              <img src="/default-doctor.jpg" alt="" />

              <h2>{doc.name}</h2>
              <p>{doc.specialization}</p>

              <button
                onClick={() =>
                  navigate("/bookingpage", { state: { doctor: doc } })
                }
              >
                Book Appointment
              </button>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DoctorConsultation;