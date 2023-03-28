import { Link } from "react-router-dom";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from '@emotion/react';

const NotFound = () => {
  const theme = createTheme({
    typography: {
      fontSize: 18
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <h1>Oops! You seem to be lost.</h1>
        <p>Here are some helpful links:</p>
        <Link to='/'>Home</Link>
      </div>
    </ThemeProvider>
  );
};

export default NotFound;