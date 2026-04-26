import Appointment from "../models/Appointment.js";

// CREATE
export const createAppointment = async (req, res) => {
  
  try {
    const {doctorId, doctorName, date, time, description } = req.body;

    const meetingLink = `https://meet.jit.si/${doctorName}-${Date.now()}`;

    // ✅ CHECK if slot already exists
    const exists = await Appointment.findOne({
      doctorId,
      date,
      time,
      
    });

    if (exists) {
      return res.status(400).json({
        msg: "This slot is already booked",
      });
    }

    // ✅ Create appointment
    const startTime = new Date(`${date} ${time}`);
    const endTime = new Date(startTime.getTime() + 30 * 60 * 1000);

    // unique room
    const meetingId = `appt-${doctorId}-${Date.now()}`;
    const newAppointment = new Appointment({
      patientName: req.user.name,
      doctorId,
      doctorName,
      date,
      time,
      status: "pending",
      meetingLink,
      meetingId,
      startTime,
      endTime,
      description,

    });

    await newAppointment.save();

    res.json(newAppointment);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET USER
export const getUserAppointments = async (req, res) => {
  try {
    const data = await Appointment.find({
      patientName: req.user.name,
    });

    res.json(data);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET DOCTOR
export const getDoctorAppointments = async (req, res) => {
  try {
    const data = await Appointment.find({
      doctorId: req.user.id,
    });

    const now = new Date();

    // ✅ AUTO UPDATE STATUS
    for (let appt of data) {
      const appointmentTime = new Date(`${appt.date} ${appt.time}`);
      const endTime = new Date(appointmentTime.getTime() + 30 * 60000);

      if (now > endTime && appt.status === "approved") {
        appt.status = "completed";
        await appt.save();
      }
    }

    // ✅ UNIQUE PATIENTS 
    const uniquePatients = Object.values(
      data.reduce((acc, curr) => {
        acc[curr.patientId] = {
          patientId: curr.patientId,
          patientName: curr.patientName,
          doctorId: curr.doctorId,
          date: curr.date,
        };
        return acc;
      }, {})
    );

    res.json({
      appointments: data,
      patients: uniquePatients, // 👈 ADD THIS
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// UPDATE
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const joinAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ msg: "Not found" });
    }

    const now = new Date();

    const joinStart = new Date(appointment.startTime.getTime() - 5 * 60000);
    const joinEnd = new Date(appointment.startTime.getTime() + 30 * 60000);

    //  Not approved
    if (appointment.status !== "approved") {
      return res.status(403).json({ msg: "Not approved yet" });
    }

    //  Too early
    if (now < joinStart) {
      return res.status(403).json({ msg: "Too early to join" });
    }

    //  Too late
    if (now > joinEnd) {
      return res.status(403).json({ msg: "Call closed" });
    }

    // ✅ generate secure meeting link
    const meetingLink = `https://meet.jit.si/${appointment.meetingId}`;

    res.json({ meetingLink });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
//cancel appointment
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appt = await Appointment.findById(id);

    if (!appt) {
      return res.status(404).json({ msg: "Not found" });
    }

    // ❌ Already finished cases
    if (["completed", "missed", "cancelled"].includes(appt.status)) {
      return res.status(400).json({
        msg: "Cannot cancel this appointment",
      });
    }

    // ⏰ Optional: block last-minute cancel (5 min rule)
    const now = new Date();
    const start = new Date(`${appt.date} ${appt.time}`);

    if (start - now < 5 * 60000) {
      return res.status(400).json({
        msg: "Too late to cancel",
      });
    }

    // ✅ cancel
    appt.status = "cancelled";
    await appt.save();

    res.json({ msg: "Appointment cancelled successfully" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};