import React from "react";
import { Routes, Route } from "react-router-dom";

import MenteeHome from "../../pages/MenteeHome/MenteeHome"; 
import MentorHome from "../../pages/MentorHome/MentorHome";
import MentorEdit from '../../pages/MentorEdit/MentorEdit';

const ProtectedRoutes = ({ user }) => {
  return (
    <Routes> 
      <Route path="/" element={
        user.userType === 'mentor' 
          ? <MentorHome user={user} />
          : <MenteeHome user={user} />
      } />
      <Route path="/mentor/edit" element={<MentorEdit />} />
      
      
    </Routes> 
  );
};

export default ProtectedRoutes;