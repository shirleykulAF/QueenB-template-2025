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
      <Select labelId="select-label" sx={{width:180}}>
        <MenuItem value="" disabled>
          Search By
        </MenuItem>
        <MenuItem value="technologies">Technologies</MenuItem>
        <MenuItem value="firstName">First Name</MenuItem>
        <MenuItem value="lastName">Last Name</MenuItem>
      </Select>

      <TextField
        className="search"
        variant="outlined"
        placeholder="Search..."
        sx={{ width: 700 }}
      />
      <Button>Search</Button>
    </Box>
  );
}

export default SearchBar;
