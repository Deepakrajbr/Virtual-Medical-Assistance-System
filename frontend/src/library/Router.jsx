import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import App from "../App";
import DoctorConsultation from "../pages/Doctoronsultation";
import AiConsultation from "../pages/Aiconsultation";
import BookingPage from "../pages/BookingPage";
import BlogPage from "../pages/BlogPage";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ProtectedRoute from "../pages/ProtectedRoute";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import UserDashboard from "../pages/user/UserDashboard";
import MedicalHistoryReport from "../pages/MedicalHistoryReport";
import AdminDashboard from "../pages/admin/AdminDashboard";
import RoleRedirect from "../pages/RoleRedirect";
import MyAppointments from "../pages/user/components/MyAppointments";
import EntryGate from "../pages/EntryGate";
import Doctor from "../pages/Doctor";
import AppointmentTable from "../pages/doctor/components/AppointmentTable";
import DoctorChatPage from "../pages/doctor/components/DoctorChatPage";
import UserChat from "../pages/user/components/userchat";
import Pending from "../pages/Pending";
import AdminDoctors from "../pages/admin/components/AdminDoctors";
import AdminUsers from "../pages/admin/components/AdminUsers";
import AdminAppointments from "../pages/admin/components/AdminAppointments";
import WriteBlog from "../pages/doctor/components/WriteBlog";
import WriteReport from "../pages/doctor/components/WriteReport";
import UserReports from "../pages/user/components/UserReports";
import UploadKnowledge from "../pages/doctor/components/UploadKnowledge";
import AdminReports from "../pages/admin/components/AdminReports";



const router = createBrowserRouter([
    {
      path: "/home",
      element: <App />
    },
    {
      path: "/",
      element: < EntryGate />
    },
    {
      path: "doctorconsultation",
      element: <ProtectedRoute><DoctorConsultation /></ProtectedRoute>
    },
    {
      path: "login",
      element:<Login />
    },
    {
      path: "register",
      element: <Register />
    },
    {
        path: "bookingpage",
        element:<BookingPage />
    },
    {
      path: "aiconsultation",
      element: <ProtectedRoute><AiConsultation /></ProtectedRoute>
    },
    {
      path: "blogpage",
      element: <BlogPage/>
    },
    {
      path: "about",
      element: <About/>
    },
    {
      path: "contact",
      element: <Contact/>
    },
    {
      path: "doctordashboard",
      element: <ProtectedRoute allowedRoles={["doctor"]}><DoctorDashboard/></ProtectedRoute>
    },
    {
      path: "userdashboard",
      element: <ProtectedRoute allowedRoles={["user"]}><UserDashboard/></ProtectedRoute>
    },
    {
      path: "smartreport",
      element: <ProtectedRoute><MedicalHistoryReport userId="me" /></ProtectedRoute>
    },
    {
      path: "admindashboard",
      element: <ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>
    },
    {
      path: "roleredirect",
      element: <RoleRedirect />
    },
    {
      path: "myappointments",
      element: <MyAppointments />
    },
    {
      path: "doctor",
      element: <Doctor />
    },
    {
      path: "AppointmentTable",
      element: <AppointmentTable />
    },
    {
      path: "doctorchatpage",
      element: < DoctorChatPage />
    },
    {
      path: "userchat",
      element: < UserChat />
    },
    {
      path: "pending",
      element: <Pending />
    },
    {
      path: "admindoctors",
      element: <AdminDoctors />
    },
    ,
    {
      path: "adminusers",
      element: <AdminUsers />
    },
    {
      path: "adminappointments",
      element: <AdminAppointments />
    },
    {
      path: "writeblog",
      element: <WriteBlog />
    },
    {
      path: "writereport",
      element: <WriteReport />
    },
    {
      path: "userreport",
      element: <UserReports />
    },
    {
      path: "uploadknowledge",
      element: <UploadKnowledge />
    },
    {
      path: "adminreport",
      element: <AdminReports />
    },
   
  
    


    
]);

export default router
