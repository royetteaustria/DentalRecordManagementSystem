import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import UpdateClient from "views/admin/Clients/EditClient";
import Page404 from "components/page404/Page404";
import EmailVerfied from "views/auth/EmailVerified";
import Verified from "views/auth/Verified";
import ProtectedRoute from "context/ProtectedRoutes/ProtectedRoutes";
import NewPassword from "views/auth/NewPassword";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />} />
      <Route path="/admin/UpdateClient" element={<UpdateClient />} />
      <Route path="admin/*" element={<ProtectedRoute element={AdminLayout} />} />
      <Route path="*" element={<Page404 />} />
      <Route path='/NewPassword/:id/:token' element={<NewPassword />} />
      <Route path="/emailVerified" element={<EmailVerfied />} />
      <Route path="/verified" element={<Verified />} />
      
      {/* <Route path="/" element={<Navigate to="/" replace />} /> */}
    </Routes>
  );
};

export default App;
