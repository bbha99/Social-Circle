import { ThemeProvider } from '@emotion/react';
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box, createTheme, CssBaseline, Stack } from "@mui/material";
import { useEffect } from 'react';
import axios from 'axios';

const Admin = () => {

  useEffect(() => {
    axios.get('http://localhost:3001/admin', { params: { id: 1 } })
    .then((response) => {
      console.log(response)
    })
  })
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
          <div> ADMIN DASHBOARD</div>
        </Stack>
      </Box>

    </ThemeProvider>

  );
};

export default Admin;
