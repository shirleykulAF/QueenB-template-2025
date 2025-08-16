import React from "react";
import { Box, Typography } from "@mui/material";

import SearchBar from "./SearchBar";
import AllMentorsCards from "./AllMentorsCards";

function HomePage() {
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

      <SearchBar />

      <AllMentorsCards />
      
    </Box>
  );
}

export default HomePage;
