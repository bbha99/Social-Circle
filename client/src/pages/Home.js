import './Home.css';
import Leftbar from "../components/Leftbar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import Navbar from "../components/Navbar";
import { Box, createTheme, CssBaseline, Stack } from "@mui/material";
import { ThemeProvider } from '@emotion/react';
import axios from "axios";
import { authContext } from '../providers/AuthProvider';
import React from 'react';
import { useEffect, useContext } from "react";

const Home = () => {
  const [posts, setPosts] = React.useState([]);
  const [topics, setTopics] = React.useState([]);

  const { user } = useContext(authContext);
  let user_session_id;
  if (user) {
    // console.log("user session used: ", user.id)
    user_session_id = user.id;
  } else {
    user_session_id = 2
  }

  // Retrieve all the posts onload
  useEffect(() => {
    axios.get('http://localhost:3001/posts', { params: { id: user_session_id } })
      .then((response) => {
        setPosts(response.data.postDetails);
      });

    axios.get('http://localhost:3001/admin/topics')
      .then((response) => {
        setTopics(response.data);
      });

  }, []);

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
          <Leftbar topics={topics} />
          <Feed posts={posts} topics={topics}/>
          <Rightbar />
        </Stack>
      </Box>

    </ThemeProvider>

  );
};

export default Home;
