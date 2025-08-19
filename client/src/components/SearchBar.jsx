import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  InputLabel,
} from "@mui/material";

function SearchBar({ handelSearchClick}) {
  const [searchData, setSearchData] = useState({
    category: "",
    text: "",
  });

  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setSearchData((prevData) => {
      return {
        ...prevData,
        [fieldName]: fieldValue,
      };
    });
    console.log("Changed field name:", fieldName, ", New value:", fieldValue);
  };

  const handleSearch = () => {
    if (!searchData.category || !searchData.text) {
      alert("Please fill bouth search category and search text");
      return;
    }
    console.log("[handleSearch] Ready to search with:", searchData);
    if (
      searchData.category === "technologies" ||
      searchData.category === "fullName"
    ) {
      console.log("category = ", searchData.category);
      if (!isNaN(searchData.text)) {
        alert("Please enter valid text - without numbers");
        return;
      }
    } else if (searchData.category === "yearsOfExperience") {
      if(isNaN(searchData.text)){
      alert("Please enter a number for years of experience")
      return;
      }
    }
    handelSearchClick(searchData);
  };

  const handleReset = () => {
    const resetData = {category: "", text: ""}
    setSearchData(resetData);
    handelSearchClick(resetData);
  }

  return (
    <Box>
      <InputLabel id="select-label">Select Search Category</InputLabel>
      <Select
        labelId="select-label"
        sx={{ width: 200 }}
        name="category"
        value={searchData.category}
        onChange={handleChange}
      >
        <MenuItem value="" disabled>
          Search By
        </MenuItem>
        <MenuItem value="fullName">Name</MenuItem>
        <MenuItem value="technologies">Technology</MenuItem>
        <MenuItem value="yearsOfExperience">Years of experience</MenuItem>
      </Select>

      <TextField
        className="search"
        variant="outlined"
        placeholder="Search..."
        sx={{ width: 700 }}
        name="text"
        value={searchData.text}
        onChange={handleChange}
      />

        <Button sx={{ backgroundColor: "white" }} onClick={handleSearch}>
          Search
        </Button>
        <Button sx={{ backgroundColor: "white" }} onClick={handleReset}>
          Reset
        </Button>
      
    </Box>
  );
}

export default SearchBar;
