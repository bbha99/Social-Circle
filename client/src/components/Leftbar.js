import { Box } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import TopicList from './TopicList';

const Leftbar = (props) => {

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

  return (
    <Div p={2}>
      <Box position="fixed"></Box>
      
      <TopicList topics={props.topics} />
    </Div>
  );
};

export default Leftbar;
