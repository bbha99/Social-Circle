import { AppBar, Toolbar, styled, Typography, Box, InputBase, Avatar, Menu, MenuItem, Button, Stack } from '@mui/material';
import React, { useState, useContext } from 'react';
import { Api } from '@mui/icons-material/';
import { Link as RouterLink } from "react-router-dom";
import { authContext } from '../providers/AuthProvider';

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between"
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%"
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex"
  }
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "none"
  }
}));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { auth, logout } = useContext(authContext);

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography
          variant='h6'
          component={RouterLink}
          to='/'
          sx={{ display: { xs: "none", sm: "block" }, textDecoration: 'none' }}
          color="common.white"
        >
          Discussit
        </Typography>
        <Api sx={{ display: { xs: "block", sm: "none" } }} />
        <Search><InputBase placeholder='search' /></Search>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {!auth && <Button color="inherit" component={RouterLink} to='/register'>Register</Button>}
          {!auth && <Button color="inherit" component={RouterLink} to='/login'>Login</Button>}

          <Icons>
            <Avatar sx={{ width: 30, height: 30 }} src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
              onClick={e => setOpen(true)}
            />
          </Icons>

          <UserBox onClick={e => setOpen(true)}>
            <Avatar sx={{ width: 30, height: 30 }} src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' />
          </UserBox>
        </Stack>

      </StyledToolbar>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={e => setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;