import { Box } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import NewsList from './NewsList';
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
    <Div sx={{bgcolor: "#DAE0E6"}}>
      <Box position="fixed" sx={{width: "20%", bgcolor: "white", height: "100%", p: 5}}>
        <TopicList />
        <NewsList />
      </Box>
    </Div>
  );
};

export default Leftbar;
