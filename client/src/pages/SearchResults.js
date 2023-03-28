import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { authContext } from "../providers/AuthProvider";
import Navbar from "../components/Navbar";
import moment from "moment";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from '@emotion/react';

const SearchResults = () => {
  const { searchInput } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  const { user } = useContext(authContext);

  let user_session_id = -1;
  if (user) {
    user_session_id = user.id;
  }
  useEffect(() => {
    axios
      .get("http://localhost:3001/posts", {
        params: { id: user_session_id, search: searchInput },
      })
      .then((response) => {
        const postData = response.data.postDetails;

        const filteredPosts = postData.filter((post) => {
          const title = post.postsDetails.title.toLowerCase();
          const description = post.postsDetails.description.toLowerCase();
          const term = searchInput.toLowerCase();
          return title.includes(term) || description.includes(term);
        });

        setSearchResults(filteredPosts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [searchInput]);

  const theme = createTheme({
    typography: {
      fontSize: 18
    }
  });

  console.log("se", searchResults);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Box sx={{ maxWidth: "800px", mx: "auto", p: 2 }}>
          {searchResults.map((result) => {
            {
              if (result.postsDetails.deleted !== true) {
                return (
                  <Box
                    key={result.id}
                    sx={{
                      my: 2,
                      p: 2,
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  >
                    <Typography variant="h4">{result.postsDetails.title} </Typography>
                    <Typography variant="h6">Posted By {result.postsDetails.user.username} {moment(result.postsDetails.user.created_at).fromNow()}</Typography>
                    <Typography>{result.postsDetails.description}</Typography>
                  </Box>
                );
              }
            }
          })}
        </Box>
      </ThemeProvider>
    </>
  );
};

export default SearchResults;
