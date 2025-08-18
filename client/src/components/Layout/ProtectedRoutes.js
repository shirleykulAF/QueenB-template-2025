import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MenteeHome from "../../pages/MenteeHome/MenteeHome"; 
import MentorHome from "../../pages/MentorHome/MentorHome";
import MenteeIndex from "../../pages/MenteeIndex/MenteesIndex";

const ProtectedRoutes = ({ user }) => {
  return (
    <Routes> 
      <Route path="/" element={
        user.userType === 'mentor' 
          ? <MentorHome user={user} />
          : <MenteeHome user={user} />
      } />
      <Route path="/mentee-index" element={
        user.userType === 'mentor' 
          ? <MenteeIndex user={user} />
          : <Navigate  to='/' replace/>
      } />
    </Routes> 
  );
};

export default ProtectedRoutes;