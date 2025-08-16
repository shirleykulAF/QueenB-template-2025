import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import NavBar from "./NavBar";
import ProtectedRoutes from "./ProtectedRoutes";

const AppLayout = ({ user, onLogout }) => {
  return (
    <Router>
      {/* Navigation Bar */}
      <NavBar user={user} onLogout={onLogout} />

      {/* Main Content */}
      <ProtectedRoutes user={user} />
    </Router>
  );
};

export default AppLayout;