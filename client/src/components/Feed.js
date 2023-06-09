import { Avatar, Box, Card, Tab, Tabs, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { useContext, useEffect } from "react";
import React from 'react';
import Post from './Post';
import PostForm from './PostForm';
import axios from "axios";
import { authContext } from '../providers/AuthProvider';
import { topicContext } from '../providers/TopicProvider';
import ImageGallery from './ImageGallery';

const Div = styled(Box)({
  backgroundColor: "#DAE0E6",
  flex: "3"
});

// List of posts
const Feed = (props) => {
  const [open, setOpen] = React.useState(false);
  const [sortValue, setSortValue] = React.useState(0);
  const [gallery, setGallery] = React.useState([]);
  // const [newCommentList, setNewCommentList] = React.useState({});

  // Current user
  const { user } = useContext(authContext);
  const { topicList, selectedTopicId } = useContext(topicContext);

  let user_session_id = -1;
  if (user) {
    user_session_id = user.id;
  }

  useEffect(() => {
    if (user) {
      axios.get('http://localhost:3001/images_gallery')
        .then((response) => {
          setGallery(response.data.imageGallery);
        });
    }
  }, []);

  // Sort filtering
  const handleSort = (event, newValue) => {
    setSortValue(newValue);
  };

  // Handle dialog open and close event
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // console.log("gallery", gallery)

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
        .then((newPostData) => {
          props.setPosts((prev) => {
            const newPost = [...prev, newPostData.data];
            return newPost;
          });
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
  function likePost(post_id, totalLikes) {
    if (user) {
      return axios.post('http://localhost:3001/post_likes', null, { params: { id: user_session_id, post_id: post_id } })
        .then((postLiked) => {
          // Add to list of liked post in current session
          props.setPosts((prev) => {
            const newPost = [...prev];
            newPost.forEach((post) => {
              if (post_id === post.postsDetails.id) {
                post.totalLikes += 1;
                post.userLikedPost = true;
              }
            });
            return newPost;
          });
        })
        .catch((response) => {
          throw new Error(response.status);
        });
    }
  }

  // Destroys a liked post row in the database
  function unlikePost(post_id, totalLikes) {
    if (user) {
      return axios.post(`http://localhost:3001/post_likes/delete`, null, { params: { id: user_session_id, post_id: post_id } })
        .then((postUnliked) => {
          props.setPosts((prev) => {
            const newPost = [...prev];
            newPost.forEach((post) => {
              if (post_id === post.postsDetails.id) {
                post.totalLikes -= 1;
                post.userLikedPost = false;
              }
            });
            return newPost;
          });
        })
        .catch((response) => {
          throw new Error(response.status);
        });
    }
  }

  // Sort by category
  function filterSort(arr, sortValue) {
    // sort by post date
    if (sortValue === 0) {
      return arr.sort(function (a, b) {
        const firstDate = new Date(b.postsDetails.created_at);
        const secondDate = new Date(a.postsDetails.created_at);
        return firstDate - secondDate;
      });
    }
    if (sortValue === 1) {
      return arr.sort(function (a, b) {
        return b.totalLikes - a.totalLikes;
      });
    }

    if (sortValue === 2) {
      return arr.sort(function (a, b) {
        return b.postCommentLength - a.postCommentLength;
      });
    }
  }

  function filterTopic(arr, selectedTopicId) {
    if (selectedTopicId === 0) return arr;
    return arr.filter((item) => {
      return item.postsDetails.topic_id === selectedTopicId;
    });
  }

  let arr = [...props.posts];

  let postList = [];
  arr = filterSort(arr, sortValue);
  arr = filterTopic(arr, selectedTopicId);

  postList = arr.map(post => {
    if (post.postsDetails.deleted === null || post.postsDetails.deleted === false) {
      let topicName = "";
      for (const topic in topicList) {
        if (post.postsDetails.topic_id === topicList[topic].id) {
          topicName = topicList[topic].name;
          break;
        }
      }

      return (
        <Post
          key={post.postsDetails.id}
          totalLikes={post.totalLikes}
          post={post.postsDetails}
          userLikedPost={post.userLikedPost}
          likePost={likePost}
          unlikePost={unlikePost}
          userDetails={post.postsDetails.user}
          postComments={post.postComments}
          setPosts={props.setPosts}
          topicName={topicName}
        />);

    }
  });

  return (
    <Div p={2}>
      {user && <ImageGallery gallery={gallery} setGallery={setGallery} />}
      {user && <Card sx={{ display: 'flex', alignItems: "center", marginBottom: 2, padding: 2, marginTop: 6 }}>
        <Avatar sx={{ width: 50, height: 50, marginRight: 1 }} src={user.image} />
        <Box sx={{ cursor: 'pointer', width: "100%" }} >
          <TextField
            id="outlined-textarea"
            placeholder={`What's on your mind, ${user.username}?`}
            rows={1}
            sx={{ input: { cursor: 'pointer' } }}
            disabled
            fullWidth={true}
            onClick={handleClickOpen}
          />

        </Box>
      </Card>}
      <Card sx={{ display: 'flex', alignItems: "center", marginBottom: 2, padding: 2 }}>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs value={sortValue} onChange={handleSort} centered>
            <Tab label="Latest Post" />
            <Tab label="Most Liked" />
            <Tab label="Most Commented" />
          </Tabs>
        </Box>
      </Card>
      {user && <PostForm open={open} handleClose={handleClose} onSave={save} topics={topicList} />}
      {postList}
    </Div>


  );
};

export default Feed;

