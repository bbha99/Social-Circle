import { Avatar, Box, Card, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { useContext } from "react";
import React from 'react';
import Post from './Post';
import PostForm from './PostForm';
import axios from "axios";
import { authContext } from '../providers/AuthProvider';
import { topicContext } from '../providers/TopicProvider';
// List of posts
const Feed = (props) => {
  const [open, setOpen] = React.useState(false);
  const [newPost, setNewPost] = React.useState({});

  // Current user
  const { user } = useContext(authContext);
  const { topicList } = useContext(topicContext);

  let user_session_id = -1;
  if (user) {
    user_session_id = user.id;
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
    if (user) {
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
  }

  const savePost = (newPostDetails) => {
    if (user) {
      return axios.post('http://localhost:3001/posts', null, { params: { newPostDetails: newPostDetails } })
        .then((newPost) => {
          return newPost;
        })
        .catch((response) => {
          throw new Error(response.status);
        });
    }
  };

  // Creates a liked post row in the database
  function likePost(post_id) {
    if (user) {
      return axios.post('http://localhost:3001/post_likes', null, { params: { id: user_session_id, post_id: post_id } })
        .then((postLiked) => {
          return 1;
        })
        .catch((response) => {
          throw new Error(response.status);
        });
    }
  }

  // Destroys a liked post row in the database
  function unlikePost(post_id) {
    if (user) {
      return axios.post(`http://localhost:3001/post_likes/delete`, null, { params: { id: user_session_id, post_id: post_id } })
        .then((postUnliked) => {
          return -1;
        })
        .catch((response) => {
          throw new Error(response.status);
        });
    }
  }

  const Div = styled(Box)({
    backgroundColor: "#DAE0E6",
    flex: "3"
  });


  let arr = []
  if (Object.keys(newPost).length !== 0) {
    arr = [...props.posts, newPost];
  } else {
    arr = [...props.posts]
  }

  let postList = [];
  if (arr.length !== 0) {
    postList = arr.map(post => {
      return (
        <Post
          key={post.postsDetails.id}
          totalLikes={post.totalLikes}
          post={post.postsDetails}
          userLikedPost={post.userLikedPost}
          likePost={likePost}
          unlikePost={unlikePost}
          userDetails={post.postsDetails.user}
        />);
    });
  }

  return (

    <Div p={2}>
      {user && <Card sx={{ display: 'flex', alignItems: "center", marginBottom: 2, padding: 2 }}>
        <Avatar sx={{ width: 50, height: 50, marginRight: 1 }} src={user.image} />
        <TextField
          id="outlined-textarea"
          placeholder={`What's on your mind, ${user.username}?`}
          rows={1}
          fullWidth={true}
          onClick={handleClickOpen}
        />
      </Card>}
      {user && <PostForm open={open} handleClose={handleClose} onSave={save} topics={topicList} />}
      {postList}
    </Div>

  );
};

export default Feed;

