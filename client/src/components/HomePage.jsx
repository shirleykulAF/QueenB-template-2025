import React from 'react';
import SearchBar from './SearchBar';
import { Box,Typography } from "@mui/material";


function HomePage() {
  return (
    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: 4, gap:5}}>
      <Typography variant="h2">Find Your Mentor</Typography>
         <SearchBar/>

    </Box>
    
  );
}

export default HomePage;
