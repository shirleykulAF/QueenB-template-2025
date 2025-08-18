import React, { useState,useEffect } from "react";
import { Box, Typography } from "@mui/material";

import SearchBar from "./SearchBar";
import AllMentorsCards from "./AllMentorsCards";

function HomePage() {
  //use state to get all mentors from the api
  const [mentorList, setMentorList] = useState([]);

  //fetch all mentors into allMentors list
  //it couse only one call by using useEffect with deppendance -[]
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch("/api/mentors");
        const data = await response.json();

        if (data.success) {
          setMentorList(data.data);
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

  const handelSearchClick = (searchData) =>{
    if(!mentorList){
      return;
    }

  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 4,
        gap: 5,
      }}
    >
      <Typography variant="h2">Find Your Mentor</Typography>

      <SearchBar handelSearchClick={handelSearchClick}  />

      <AllMentorsCards allMentors={mentorList}/>
      
    </Box>
  );
}

export default HomePage;
