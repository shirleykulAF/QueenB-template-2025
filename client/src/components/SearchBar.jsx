import React from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  InputLabel,
} from "@mui/material";

function SearchBar() {
  return (
    <Box>
      <InputLabel id="select-label">Select Search Category</InputLabel>
      <Select labelId="select-label" sx={{width:200}}>
        <MenuItem value="" disabled>
          Search By
        </MenuItem>
        <MenuItem value="technologies">Technologies</MenuItem>
        <MenuItem value="fullName">Full Name</MenuItem>
        <MenuItem value="years-of-experince">Years of experience</MenuItem>
      </Select>

      <TextField
        className="search"
        variant="outlined"
        placeholder="Search..."
        sx={{ width: 700 }}
      />
      <Button sx={{backgroundColor: "white"}}>Search</Button>
    </Box>
  );
}

export default SearchBar;
