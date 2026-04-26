import React, { useState } from "react";
import "../styles/BookingPage.css";
import { useLocation , useNavigate} from "react-router-dom";
import HomeButton from "./HomeButton";
import { useEffect } from "react";

function BookingPage() {
  const location = useLocation();
  const { doctor } = location.state || {};
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  if (!doctor) {
    return <h2>No doctor selected.</h2>;
  }

  // ✅ SAFE DATA (no crash)
  const workingDays = doctor?.workingDays || [];
  const blockedDates = doctor?.blockedDates || [];

  // Convert working days → numbers
  const dayToNumber = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const workingDayNumbers = workingDays.map(
    (d) => dayToNumber[d]
  );

  const today = new Date().toISOString().split("T")[0];

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ];

  // ✅ DATE VALIDATION
  const isValidDate = (dateStr) => {
    const date = new Date(dateStr);

    // past date
    if (new Date(dateStr) < new Date(today)) {
      alert("Past dates cannot be booked.");
      return false;
    }

    const weekdayNumber = date.getDay();
    const weekdayName = date.toLocaleDateString("en-US", {
      weekday: "long",
    });

    // not working day
    if (
      workingDayNumbers.length > 0 &&
      !workingDayNumbers.includes(weekdayNumber)
    ) {
      alert(`Doctor is not available on ${weekdayName}.`);
      return false;
    }
  
    // ✅ FIXED
    if (
      blockedDates.length > 0 &&
      blockedDates.includes(dateStr)
    ) {
      alert("Doctor has blocked this date.");
      return false;
    }
  

    return true;
  };

  // ✅ BOOKING (BACKEND)
  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time!");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
  
      const res = await fetch(
        "http://localhost:5000/api/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            doctorId: doctor._id,
            doctorName: doctor.name,
            date: selectedDate,
            time: selectedTime,
            description: description,
          }),
        }
      );
  
      const newAppointment = await res.json();
  
      if (res.ok) {
        alert("Appointment booked!");

        navigate("/userdashboard");
  
        // ✅ STORE in localStorage (temporary UI sync)
        const existing =
          JSON.parse(localStorage.getItem("appointments")) || [];
  
        existing.push(newAppointment);
  
        localStorage.setItem(
          "appointments",
          JSON.stringify(existing)
        );
  
      } else {
        alert(newAppointment.msg || "Booking failed");
      }
  
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  useEffect(() => {
    fetchBookedSlots();
  }, []);
  const fetchBookedSlots = async () => {
    try {
      const token = localStorage.getItem("token");
  
      const res = await fetch(
        "http://localhost:5000/api/appointments/doctor",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const data = await res.json();
  
      setBookedSlots(Array.isArray(data) ? data : []);
  
    } catch (err) {
      console.error(err);
    }
  };
  const bookedTimes = bookedSlots
  .filter((a) => a.date === selectedDate)
  .map((a) => a.time);

  return (
    <div>
      <HomeButton />

      <div className="booking-page">
        <h2 className="booking-title">Book Your Appointment</h2>

        {/* DOCTOR CARD */}
        <div className="doctor-info">
          <img
            src={doctor.img || "/default-doctor.jpg"}
            alt={doctor.name}
            className="doc-img"
          />

          <div>
            <h3>{doctor.name}</h3>
            <p>{doctor.specialization}</p>

            <p className="workdays">
              <strong>Working Days:</strong>{" "}
              {workingDays.length > 0
                ? workingDays.join(", ")
                : "Not specified"}
            </p>

            <p className="workdays">
              <strong>Blocked Dates:</strong>{" "}
              {blockedDates.length > 0
                ? blockedDates.join(", ")
                : "None"}
            </p>
          </div>
        </div>

        {/* DATE PICKER */}
        <div className="section">
          <label>Select Date:</label>

          <input
            type="date"
            min={today}
            className="date-input"
            onChange={(e) => {
              const d = e.target.value;

              if (isValidDate(d)) {
                setSelectedDate(d);
              } else {
                e.target.value = "";
                setSelectedDate("");
              }
            }}
          />
        </div>

        {/* TIME SLOTS */}
        <div className="section">
          <label>Select Time Slot:</label>

          <div className="slots">
  {timeSlots.map((slot, i) => {
    const isBooked = bookedTimes.includes(slot);

    return (
      <button
        key={i}
        disabled={isBooked}
        className={`slot-btn 
          ${selectedTime === slot ? "selected" : ""} 
          ${isBooked ? "disabled" : ""}`}
        onClick={() => !isBooked && setSelectedTime(slot)}
      >
        {slot} {isBooked ? "(Booked)" : ""}
      </button>
    );
  })}
</div>
        </div>
        <div className="section">
  <label>Describe your symptoms:</label>

  <textarea
    className="desc-input"
    placeholder="Eg: headache, fever, chest pain..."
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />
</div>
<div className="section">
  <label>Upload Medical Document:</label>

  <input
    type="file"
    onChange={(e) => setFile(e.target.files[0])}
  />
</div>

        {/* CONFIRM BUTTON */}
        <button className="confirm-btn" onClick={handleBooking}>
          Confirm Appointment
        </button>
      </div>
    </div>
  );
}

export default BookingPage;