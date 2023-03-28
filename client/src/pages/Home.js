import './Home.css';
import Leftbar from "../components/Leftbar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import Navbar from "../components/Navbar";
import { Box, createTheme, CssBaseline, Stack } from "@mui/material";
import { ThemeProvider } from '@emotion/react';
import axios from "axios";
import { authContext } from '../providers/AuthProvider';
import { topicContext } from '../providers/TopicProvider';
import React from 'react';
import { useEffect, useContext } from "react";

const Home = () => {
  const [posts, setPosts] = React.useState([]);
  const [changeMiddleView, setChangeMiddleView] = React.useState("feed");

  const { user } = useContext(authContext);
  const { getTopics } = useContext(topicContext);

  let user_session_id = -1;
  if (user) {
    user_session_id = user.id;
  }
  
  // Retrieve all the posts onload
  useEffect(() => {
    if (changeMiddleView === "feed") {
      axios.get('http://localhost:3001/posts', { params: { id: user_session_id } })
      .then((response) => {
        setPosts(response.data.postDetails);
      });
    getTopics();
    }

  }, [changeMiddleView]);

  const theme = createTheme({
    palette: {
      // mode: "dark",
      customColor: {
        main: "red"
      }
    },
    typography: {
      fontSize: 18
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="App" sx={{bgcolor: "#DAE0E6"}}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Leftbar />
          {changeMiddleView === "feed" && <Feed posts={posts} setPosts={setPosts} />}
          {/* {changeMiddleView === "feed" ? <Feed posts={posts} setPosts={setPosts} /> : <Weather />} */}
          <Rightbar />
        </Stack>
      </Box>

    </ThemeProvider>

  );
};

export default Home;
