import React, { useState, useContext } from "react";
import axios from "axios";
import { Grid, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";
import { authContext } from "../providers/AuthProvider";

const TopSearchBar = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { user } = useContext(authContext);

  let user_session_id = -1;
  if (user) {
    user_session_id = user.id;
  }

  const handleChange = (event) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);

    if (searchTerm === "") {
      setSearchResults([]);
      return;
    }

    axios
      .get("http://localhost:3001/posts", { params: { id: user_session_id } })
      .then((response) => {
        const postData = response.data.postDetails;
        console.log("res", postData);
        const filteredPosts = postData.filter((post) => {
          const title = post.postsDetails.title.toLowerCase();
          const term = searchTerm.toLowerCase();
          return title.includes(term);
        });
        console.log("filtered posts:", filteredPosts);
        setSearchResults(filteredPosts);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const clearClick = () => {
    setSearch("");
    setSearchResults([]);
  };

  const handleSearchClick = () => {
    window.location.href = `/search/${search}`;
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSearchClick();
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: "white",
        width: "25%",
        height: "50",
      }}
    >
      <TextField
        fullWidth
        placeholder="Search for posts here..."
        value={search}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        InputProps={{
          endAdornment: search ? (
            <ClearIcon
              sx={{ ":hover": { cursor: "pointer", color: "#007bff" } }}
              onClick={clearClick}
            />
          ) : (
            <SearchIcon />
          ),
        }}
      />
    </Grid>
  );
};

export default TopSearchBar;
