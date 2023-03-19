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

const Home = () => {

  const savePost = (newPost) => {
    console.log("length: ", posts.length + 1);
    posts.unshift({ ...newPost, id: posts.length + 1 });
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
