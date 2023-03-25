import { Box } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const Div = styled(Box)(({ theme }) => ({
  backgroundColor: "#1A1A1B",
  flex: "2",
  [theme.breakpoints.down("sm")]: {
    display: "none"
  },
  [theme.breakpoints.up("sm")]: {
    display: "block"
  }
}));

const Rightbar = () => {

  return (
    <Div p={2}></Div>
  );
};

export default Rightbar;