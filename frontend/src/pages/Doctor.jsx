import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Doctor.css"

function Doctor() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    const res = await fetch("http://localhost:5000/api/doctors");
    const data = await res.json();
    setDoctors(data);
  };

  return (
    <div className="doctor-container">
      <h2 className="doctor-title">Our Doctors</h2>

      <div className="doctor-grid">
        {doctors
        .filter((doc) => doc.status === "approved")
        .map((doc) => (
          <div className="doctor-card" key={doc._id}>
            
            <img src={doc.image || "/default-doctor.png"} className="doctor-img" />
            <h3>{doc.name}</h3>
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
  );
}

export default Doctor;