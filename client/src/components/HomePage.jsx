import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

import SearchBar from "./SearchBar";
import AllMentorsCards from "./AllMentorsCards";

function HomePage() {
  //use state to get all mentors from the api
  const [mentorList, setMentorList] = useState([]);
  const [fillteredMentorsList, setfillteredMentorsList] = useState([]);

  //fetch all mentors into allMentors list
  //runs only once because of the empty dependency array in useEffect -[]
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch("/api/mentors");
        const data = await response.json();

        if (data.success) {
          setMentorList(data.data);
          setfillteredMentorsList(data.data);
          console.log("Mentors users count = ", data.count);
        } else {
          console.error("Failed to load mentors:", data.error);
        }
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };
    fetchMentors();
  }, []);

  // state for the currently filltered list of mentors that display 
  const handelSearchClick = (searchData) => {
    if (!mentorList || mentorList.length === 0) return;
    if (searchData.category === "" && searchData.text === "") {
      setfillteredMentorsList(mentorList);
      return;
    }
    const searchValue = searchData.text.trim().toLowerCase();

    const filltered = mentorList.filter((mentor) => {
      if (searchData.category === "technologies") {
        return mentor.technologies.some((tech) =>
          tech.toLowerCase().includes(searchValue)
        );
      } else if (searchData.category === "fullName") {
        const fullName = `${mentor.firstName} ${mentor.lastName}`.toLowerCase();
        return fullName.includes(searchValue);
      } else if (searchData.category === "yearsOfExperience") {
        return String(mentor.yearsOfExperience) === searchValue;
      }
      return;
    });

    if (filltered.length === 0) {
      alert("No mentors found for your search");
      setfillteredMentorsList(mentorList);
      return;
    }

    setfillteredMentorsList(filltered);
  };

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

      <SearchBar handelSearchClick={handelSearchClick} />

      <AllMentorsCards allMentors={fillteredMentorsList} />
    </Box>
  );
}

export default HomePage;
