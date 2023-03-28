import React, { useState } from "react";
import axios from "axios";
import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";

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
        // position: "relative",
        backgroundColor: "#FFFFFF",
        marginBottom: "10px"
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
          // display: "inline",
          position: "absolute",
          width: "80%",
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
            <Link to={`/users/${result.id}`}>{result.username}</Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SearchBar;
