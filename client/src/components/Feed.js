import { Avatar, Box, Card, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useContext } from "react";
import React from 'react';
import Post from './Post';
import PostForm from './PostForm';
import axios from "axios";
import { authContext } from '../providers/AuthProvider';

// List of posts
const PostList = (props) => {
  const [open, setOpen] = React.useState(false);
  const [newPost, setNewPost] = React.useState({});

  // Current user
  const { user } = useContext(authContext);
  let user_session_id;
  if (user) {
    console.log("user session inuse", user.id)
    user_session_id = user.id;
  } else {
    user_session_id = 2
  }

  // Handle dialog open and close event
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Adds the created post to the list of posts
  function save(title, topicId, description, image) {
    const newPostDetails = {
      title,
      description,
      image,
      "topic_id": topicId,
      "user_id": user_session_id
    };
    savePost(newPostDetails)
      .then((newPost) => {
        setNewPost(newPost.data);
      });
  }

  const savePost = (newPostDetails) => {
    return axios.post('http://localhost:3001/posts', null, { params: { newPostDetails: newPostDetails } })
    .then((newPost) => {
      return newPost;
    })
    .catch((response) => {
      throw new Error(response.status);
    });
  };

  // Creates a liked post row in the database
  function likePost(post_id) {

    return axios.post('http://localhost:3001/post_likes', null, { params: { id: user_session_id, post_id: post_id } })
      .then((postLiked) => {
        return 1;
      })
      .catch((response) => {
        throw new Error(response.status);
      });
  }

  // Destroys a liked post row in the database
  function unlikePost(post_id) {

    return axios.post(`http://localhost:3001/post_likes/delete`, null, { params: { id: user_session_id, post_id: post_id } })
      .then((postUnliked) => {
        return -1;
      })
      .catch((response) => {
        throw new Error(response.status);
      });
  }

  const Div = styled(Box)({
    backgroundColor: "#DAE0E6",
    flex: "3"
  });

  let postList = [];
  if (props.posts.length !== 0) {
    postList = props.posts.map(post => {
      return (
        <Post
          key={post.postsDetails.id}
          totalLikes={post.totalLikes}
          post={post.postsDetails}
          userLikedPost={post.userLikedPost}
          likePost={likePost}
          unlikePost={unlikePost}
        // user={props.users[post.user_id]}
        />);
    });
  }

  return (

    <Div p={2}>
      <Card sx={{ display: 'flex', alignItems: "center", marginBottom: 2, padding: 2 }}>
        <Avatar sx={{ width: 50, height: 50, marginRight: 1 }} src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" />
        <TextField
          id="outlined-textarea"
          placeholder="What's on your mind, User?"
          rows={1}
          fullWidth={true}
          onClick={handleClickOpen}
        />

      </Card>
      <PostForm open={open} handleClose={handleClose} onSave={save} topics={props.topics} />
      {Object.keys(newPost).length !== 0 && <Post
        key={newPost.id}
        totalLikes={0}
        post={newPost}
        userLikedPost={false}
        likePost={likePost}
        unlikePost={unlikePost}
      // user={props.users[post.user_id]}
      />}
      {postList}
    </Div>

  );
};

export default PostList;

