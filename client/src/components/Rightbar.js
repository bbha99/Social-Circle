import { Box } from '@mui/material';
import { styled } from '@mui/system';
import React, { useEffect, useState, useContext } from 'react';
import { authContext } from '../providers/AuthProvider';
import SuggestedUser from './SuggestedUser';
import SearchBar from './Searchbar';
import ConversationProfile from './ConversationProfile';

const Div = styled(Box)(({ theme }) => ({
  flex: "2",
  [theme.breakpoints.down("sm")]: {
    display: "none"
  },
  [theme.breakpoints.up("sm")]: {
    display: "block"
  }
}));

const Rightbar = () => {
  const { auth } = useContext(authContext);
  return (
    <Div sx={{ bgcolor: "DAE0E6" }}>
      <Box position="fixed" sx={{ bgcolor: "white", width: "20%", top: 0, right: 0, height: "100%", p: 5 }}>
        {auth && <ConversationProfile />}
        {<SuggestedUser />}
      </Box>
    </Div>
  );
};

export default Rightbar;