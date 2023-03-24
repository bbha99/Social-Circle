import { Box } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import TopicList from './TopicList';

const Div = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  flex: "2",
  [theme.breakpoints.down("md")]: {
    display: "none"
  },
  [theme.breakpoints.up("md")]: {
    display: "block"
  }
}));

const Leftbar = (props) => {

  return (
    <Div p={2}>
      <Box position="fixed" sx={{width: "25%"}}>
        <TopicList />
      </Box>
    </Div>
  );
};

export default Leftbar;
