import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import MentorCard from "./MentorCard";

function AllMentorsCards( {allMentors}) {


  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 2,
        width: "80%",
      }}
    >
      {/* create by map to each Mentor her MentorCard  */}

      {allMentors.map((mentor) => (
        <MentorCard key={mentor._id} mentor={mentor} />
      ))}
    </Box>
  );
}

export default AllMentorsCards;
