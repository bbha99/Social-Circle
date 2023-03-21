import './Home.css';
import Leftbar from "../components/Leftbar";
import PostList from "../components/PostList";
import Rightbar from "../components/Rightbar";
import Navbar from "../components/Navbar";
import { Box, createTheme, CssBaseline, Stack } from "@mui/material";
import users from "../user.json";
import posts from "../post.json";
import { ThemeProvider } from '@emotion/react';
import { Link } from "react-router-dom";
import axios from 'axios';

const Home = () => {

  const savePost = (newPostDetails) => {
    return axios.post('http://localhost:3001/posts', null, { params: { newPostDetails: newPostDetails } })
    .then((newPost) => {
      return newPost;
    })
    .catch((response) => {
      throw new Error(response.status);
    });
  };

  const theme = createTheme({
    palette: {
      // mode: "dark",
      customColor: {
        main: "red"
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="App">
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Leftbar />
          <PostList users={users} posts={posts} savePost={savePost} />
          <Rightbar />
        </Stack>
      </Box>

    </ThemeProvider>

  );
};

export default Home;
