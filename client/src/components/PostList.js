import { Box } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import Post from './Post';
import posts from "../post.json";

const PostList = (props) => {

  const Div = styled(Box)({
    backgroundColor: "#DAE0E6",
    flex: "3"
  });

  const postList = posts.map(post => {
    return (
      <Post
        key={post.id}
        post={post}
        user={props.users}
      />);
  });
  return (
    <Div p={2}>
      {postList}
    </Div>
  );
};

export default PostList;

