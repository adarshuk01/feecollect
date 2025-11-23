import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";

// 🔹 Admin imports
import Layout from "./layout/Admin/Layout";
import AdminDashboard from "./pages/Admin/Dashboard";
import Login from "./pages/Admin/Login";
import Client from "./pages/Admin/Client";

// 🔹 Client imports
import ClientLayout from "./layout/Client/Layout";
import ClientDashboard from "./pages/Client/Dashboard";
import Groups from "./pages/Client/Groups";
import GroupDetails from "./pages/Client/GroupDetails";
import AddMembers from "./pages/Client/AddMembers";
import Users from "./pages/Client/Users";
import UserDetails from "./pages/Client/UserDetails";
import Subscription from "./pages/Client/Subscription";
import PaymentPage from "./pages/Client/Payment";
import ClientProfilePage from "./pages/Admin/ClientProfilePage";
import AddClient from "./components/Admin/AddClient";
import ClientLogin from "./pages/Client/ClientLogin";
import ForgotPass from "./components/Client/ForgotPass";
import SettingsPage from "./pages/Client/SettingsPage";
import UpdatePass from "./components/Client/settings/UpdatePass";
import Reports from "./pages/Client/Reports";
import ProfileCard from "./components/Client/settings/ProfileCard";
import UserReportPage from "./components/Client/reports/UserReportPage";
import ReceiptCustomization from "./components/Client/settings/ReceiptPreview";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Toaster reverseOrder={false} />

      <Routes>
        {/* 🔹 Admin routes */}
        <Route path="/admin" element={<Layout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="client" element={<Client />} />
          <Route path="client/:id" element={<ClientProfilePage />} />
          <Route path="client/edit/:id" element={<AddClient />} />

        </Route>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/client/login" element={<ClientLogin />} />
         <Route path="/client/forgot-password" element={<ForgotPass />} />

        {/* 🔹 Client routes */}
        <Route path="/client" element={<ClientLayout />}>
          <Route index element={<ClientDashboard />} />
          <Route path="customers" element={<Users />} />
          <Route path="customers/:id" element={<UserDetails />} />
          <Route path="groups/users/:id" element={<UserDetails />} />
          <Route path="settings" element={<SettingsPage/>} />
          <Route path="settings/update-password" element={<UpdatePass/>} />
          <Route path="settings/profile" element={<ProfileCard/>} />
          <Route path="settings/recieptpreview" element={<ReceiptCustomization/>} />

          <Route path="subscription" element={<Subscription />} />
          <Route path="reports" element={<Reports/>} />
          <Route path="reports/:id" element={<UserReportPage/>} />

          <Route path="groups" element={<Groups />} />
          <Route path="payment" element={<PaymentPage />} />

          <Route path="groups/:id" element={<GroupDetails />} />
          <Route path="customers/add" element={<AddMembers />} />



        </Route>
      </Routes>
    </>
  );
}

export default App;
