import { useEffect, useState } from "react";
import "./WriteReport.css";

export default function WriteReport() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [notes, setNotes] = useState("");

  const token = localStorage.getItem("token");

  // 🔥 LOAD PATIENTS
  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/appointments/doctor",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      console.log("PATIENT DATA:", data);

      setPatients(data.patients || []);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔑 HELPER → get correct ID (supports both _id and patientId)
  const getId = (p) => p.patientId || p._id;

  // 🚀 SEND REPORT
  const sendReport = async () => {
    if (!selectedPatient) {
      alert("Please select a patient");
      return;
    }
  
    if (!diagnosis || !prescription) {
      alert("Fill required fields");
      return;
    }
  
    console.log("FINAL SELECTED:", selectedPatient);
  
    try {
      const res = await fetch("http://localhost:5000/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          patientId: selectedPatient.patientId, // ✅ FIXED
          patientName: selectedPatient.patientName,
          diagnosis,
          prescription,
          notes,
        }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert(`Report sent to ${selectedPatient.patientName} ✅`);
  
        setDiagnosis("");
        setPrescription("");
        setNotes("");
        setSelectedPatient(null);
      } else {
        alert(data.msg);
      }
    } catch (err) {
      alert("Error sending report");
    }
  };

  return (
    <div className="prescription">

      {/* HEADER */}
      <div className="pres-header">
        <h2>🩺 Medical Prescription</h2>
        <p>Doctor Panel</p>

        {selectedPatient && (
          <p className="patient-name">
            Patient: {selectedPatient.patientName}
          </p>
        )}
      </div>

      {/* SELECT PATIENT */}
      <div className="pres-row">
        <label>Select Patient:</label>

        <select
  className="report-select"
  value={selectedPatient?.index ?? ""}
  onChange={(e) => {
    const index = e.target.value;

    if (index === "") {
      setSelectedPatient(null);
      return;
    }

    const selected = patients[index];

    console.log("SELECTED:", selected);

    setSelectedPatient({ ...selected, index });
  }}
>
  <option value="">-- Select Patient --</option>

  {patients.map((p, i) => (
    <option key={i} value={i}>
      {p.patientName}
    </option>
  ))}
</select>
      </div>

      {/* DIAGNOSIS */}
      <div className="pres-section">
        <h4>Diagnosis</h4>
        <textarea
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
        />
      </div>

      {/* PRESCRIPTION */}
      <div className="pres-section">
        <h4>Prescription</h4>
        <textarea
          value={prescription}
          onChange={(e) => setPrescription(e.target.value)}
        />
      </div>

      {/* NOTES */}
      <div className="pres-section">
        <h4>Notes</h4>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* BUTTON */}
      <button className="pres-btn" onClick={sendReport}>
        Send Prescription 🚀
      </button>

    </div>
  );
}