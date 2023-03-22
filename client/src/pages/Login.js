import { useState, useContext } from 'react';
import { authContext } from '../providers/AuthProvider';
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { ThemeProvider } from '@emotion/react';
import { createTheme, Container, CssBaseline, Box, Typography, Grid, TextField, Button, Link } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(authContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const onSubmit = (event) => {
    event.preventDefault();

    setErrors([]);

    login(email, password)
      .then((e) => {
        if (e) {
          setErrors(e);
        } else {
          navigate('/');
        }
      });
  };

  const errorComponent = errors.map(e => {
    return (
      <Typography
        variant="body1"
        style={{ color: "red", marginTop: 10 }}
      >
        {e}
      </Typography>
    );
  });

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Button variant="text" component={RouterLink} to='/'>Back to home page</Button>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  autoComplete="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
            {errorComponent}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2" component={RouterLink} to='/register'>
                  New to Discussit? Register
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider >
  );
};

export default Login;