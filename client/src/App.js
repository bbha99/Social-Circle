import './App.css';
import Leftbar from "./components/Leftbar";
import PostList from "./components/PostList";
import Rightbar from "./components/Rightbar";
import Navbar from "./components/Navbar";
import { Box, createTheme, CssBaseline, Stack } from "@mui/material";
import users from "./user.json";
import { ThemeProvider } from '@emotion/react';

const App = () => {

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
          <PostList users={users} />
          <Rightbar />
        </Stack>
      </Box>

    </ThemeProvider>

  );
};

export default App;
