import { Box } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const Leftbar = () => {

  const Div = styled(Box)(({ theme }) => ({
    backgroundColor: "#1A1A1B",
    flex: "2",
    [theme.breakpoints.down("md")]: {
      display: "none"
    },
    [theme.breakpoints.up("md")]: {
      display: "block"
    }
  }));

  return (
    <Div p={2}>
      <Box position="fixed"></Box>
    </Div>
  );
};

export default Leftbar;
