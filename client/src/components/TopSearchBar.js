import React, { useState, useContext } from "react";
import axios from "axios";
import { Box, TextField, Button } from "@mui/material";
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

  return (
    <Box
      sx={{
        backgroundColor: "white"
      }}
    >
      <TextField
        placeholder="Search for posts here..."
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
          width: "312px",
          overflowY: "scroll",
          overflow: "hidden",
          backgroundColor: "#add8e6",
          borderRadius: "4px",
          color: "#FFFFFF",
          cursor: "pointer",
          "&:hover": {
            borderRadius: "4px",
          },
        }}
      >
        {searchResults.map((result) => (
          <>
            <Link to={`/search/${result.postsDetails.title}`}>
              <Box key={result.id} p={2}>
                {result.postsDetails.title}
              </Box>
            </Link>
          </>
        ))}
      </Box>
      <Button variant="contained" onClick={handleSearchClick}>
        Search
      </Button>
    </Box>
  );
};

export default TopSearchBar;
