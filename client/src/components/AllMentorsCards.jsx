import React from "react";
import {Box} from "@mui/material"
import MentorCard from "./MentorCard";

function AllMentorsCards() {
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
        {/* need to switch with real api*/}
      <MentorCard />
      <MentorCard />
      <MentorCard />
      <MentorCard />
      <MentorCard />
      <MentorCard />
      <MentorCard />
      <MentorCard />
      <MentorCard />
      <MentorCard />
      <MentorCard />
      <MentorCard />
      <MentorCard />
      <MentorCard />
      <MentorCard />
      <MentorCard />
      <MentorCard />
      <MentorCard />
      <MentorCard />
      <MentorCard />
      <MentorCard />
      <MentorCard />
      <MentorCard />
      <MentorCard />
    </Box>
  );
}

export default AllMentorsCards;
