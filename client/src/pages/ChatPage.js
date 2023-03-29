import { Grid, Paper } from '@mui/material';
import ChatList from '../components/chat/ChatList';
import Navbar from '../components/Navbar';

import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from '@emotion/react';
const ChatPage = ({ cable }) => {
  const theme = createTheme({
    typography: {
      fontSize: 18
    }
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Grid container component={Paper} sx={{ height: "calc( 100vh - 110px )", }}>
          <ChatList cable={cable} />
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default ChatPage;