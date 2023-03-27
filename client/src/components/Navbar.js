import { AppBar, Toolbar, styled, Typography, InputBase, Avatar, Menu, MenuItem, Stack, IconButton } from '@mui/material';
import React, { useState, useContext } from 'react';
import { Api } from '@mui/icons-material/';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { authContext } from '../providers/AuthProvider';
import PostSearchBar from './TopSearchBar';

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

const Navbar = () => {
  const { auth, user, logout } = useContext(authContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const testUser = {
    "id": 2,
    "username": "Mrs. Jeremy Klein",
    "image": "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3\u0026ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8\u0026auto=format\u0026fit=crop\u0026w=1180\u0026q=80"
  };

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
        <PostSearchBar />

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {!auth && <Avatar sx={{ width: 32, height: 32 }} />}
            {auth && <Avatar sx={{ width: 32, height: 32 }} src={user.image} />}
          </IconButton>
        </Stack>

      </StyledToolbar>

      {!auth && <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        open={open}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

        <MenuItem onClick={() => navigate('/login')}>Login</MenuItem>
        <MenuItem onClick={() => navigate('/register')}>Register</MenuItem>

      </Menu>}

      {auth && <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        open={open}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

        <MenuItem onClick={() => navigate(`/users/${user.id}`)}>Profile</MenuItem>
        <MenuItem onClick={() => navigate('/chats', { state: testUser })}>Chats</MenuItem>
        <MenuItem onClick={async () => {
          await logout();
          navigate('/');
        }}>Logout</MenuItem>

      </Menu>}

    </AppBar >
  );
};

export default Navbar;