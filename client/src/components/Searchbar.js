import React, { useState } from "react";
import axios from "axios";
import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);

    if (searchTerm === "") {
      setSearchResults([]);
      return;
    }
    axios
      .get(`http://localhost:3001/users`)
      .then((response) => {
        const filteredData = response.data.users.filter((user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredData.slice(0, 5));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const clearClick = () => {
    setSearch("");
    setSearchResults([]);
  };

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "#FFFFFF",
      }}
    >
      <TextField
        placeholder="Search for users here..."
        value={search}
        onChange={handleChange}
        InputProps={{
          endAdornment: search ? (
            <ClearIcon onClick={clearClick} />
          ) : (
            <SearchIcon />
          ),
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          overflowY: "scroll",
          overflow: "hidden",
          backgroundColor: "#A020F0",
          borderRadius: "4px",
          color: "#FFFFFF",
          cursor: "pointer",
          "&:hover": {
            borderRadius: "4px",
          },
        }}
      >
        {searchResults.map((result) => (
          <Box key={result.id} p={2}>
            <div>{result.username}</div>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SearchBar;
