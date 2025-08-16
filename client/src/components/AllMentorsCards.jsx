import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import MentorCard from "./MentorCard";

function AllMentorsCards() {
  //use state to get all mentors from the api
  const [allMentors, setAllMentors] = useState([]);

  //fetch all mentors into allMentors list
  //it couse only one call by using useEffect with deppendance -[]
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch("/api/mentors");
        const data = await response.json();

        if (data.success) {
          setAllMentors(data.data);
          console.log('Mentors users count = ',data.count)
        } else {
          console.error("Failed to load mentors:", data.error);
        }
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();

  }, []);

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
