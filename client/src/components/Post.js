import { FavoriteBorder, MoreHoriz, ChatBubbleOutline, Favorite } from '@mui/icons-material';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, Fade, IconButton, Menu, MenuItem, TextField, Typography } from '@mui/material';
import React from 'react';
import { useContext } from "react";
import { authContext } from '../providers/AuthProvider';
import moment from 'moment';
import Comment from './Comment';
import { Box } from '@mui/system';
import axios from "axios";

// Individual post component
const Post = (props) => {
  const [newComment, setNewComment] = React.useState("");
  const [commentVisibility, setCommentVisibility] = React.useState(false);

  // Current user
  const { user } = useContext(authContext);

  // Delete post action
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Deletes logged in users post
  const handleDeletePost = () => {
    if (user) {
      return axios.post(`http://localhost:3001/post/delete`, null, { params: { id: user.id, post_id: props.post.id } })
        .then((result) => {
          props.setPosts((prev) => {
            const newPost = [...prev];
            newPost.forEach((post) => {
              if (props.post.id === post.postsDetails.id) {
                post.postsDetails.deleted = true;
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

  // Allow user to like or unlike a post
  function changeLikedPostState(liked) {
    if (liked) {
      props.likePost(props.post.id, props.totalLikes)
        .then((postLiked) => {
        })
        .catch(error => console.log(error));
    } else {
      props.unlikePost(props.post.id, props.totalLikes)
        .then((postNotLiked) => {
        })
        .catch(error => console.log(error));
    }
  }

  // Allows user to create a new comment for a post
  const handleCommentSubmit = (event) => {
    event.preventDefault();

    if (user) {
      const newCommentDetails = {
        "description": newComment,
        "post_id": props.post.id,
        "user_id": user.id,
        "deleted": false,
        "parent_comment_id": null
      };
      axios.post('http://localhost:3001/comments', null, { params: { newCommentDetails: newCommentDetails } })
        .then((newCommentData) => {
          props.setPosts((prev) => {
            const newPost = [...prev];
            newPost.forEach((post) => {
              if (props.post.id === post.postsDetails.id) {
                post.postComments.push(newCommentData.data.userCommentOnPost);
              }
            });
            return newPost;
          });
        })
        .catch((response) => {
          throw new Error(response.status);
        });
    }
    setNewComment("");
  };

  // Toggle comment display
  const handleCommentVisibility = () => {
    setCommentVisibility(!commentVisibility);
  };

  const postId = props.post.id;
  // Checks whether post has been liked during user session or defaults to state onload
  let likeButton;
  if (props.userLikedPost) {
    likeButton = <Button
      fullWidth={true}
      onClick={() => { changeLikedPostState(false); }}>
      <Favorite sx={{ color: "red" }} />
      {props.totalLikes} Likes
    </Button>;
  } else {
    likeButton = <Button
      fullWidth={true}
      disabled={!user ? true : false}
      onClick={() => { changeLikedPostState(true); }}>
      <FavoriteBorder />
      {props.totalLikes} Likes
    </Button>;
  }

  // Sort comments by date
  function sortByDate(commentArr) {
    // sort by post date
    return commentArr.sort(function (a, b) {
      const firstDate = new Date(b.created_at);
      const secondDate = new Date(a.created_at);
      return firstDate - secondDate;
    });
  }

  // Create nested comments
  function buildChildCommentTree(commentArr, parentId, marginLeft) {
    const list = [];
    for (const comment in commentArr) {
      if (parentId === commentArr[comment].parent_comment_id) {
        list.push([<Comment
          key={commentArr[comment].id}
          commentDetails={commentArr[comment]}
          setPosts={props.setPosts}
          marginLeft={marginLeft}
        />,
        buildChildCommentTree(commentArr, commentArr[comment].id, marginLeft + 3)]
        );
      }
    }
    return list;
  }

  let commentArr = [...props.postComments];
  commentArr = sortByDate(commentArr);

  let commentList = [];
  for (const comment in commentArr) {
    // if top level parent comment
    if (commentArr[comment].parent_comment_id === null) {
      commentList.push(<Comment
        key={commentArr[comment].id}
        commentDetails={commentArr[comment]}
        setPosts={props.setPosts}
        marginLeft={0}
      />);
      commentList.push(buildChildCommentTree(commentArr, commentArr[comment].id, 3));
    }
  }

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ width: 50, height: 50 }} src={props.userDetails.image} />
        }
        action={user && user.id === props.userDetails.id &&
          <div>
            <IconButton onClick={handleClick}>
              <MoreHoriz />
            </IconButton>
            <Menu
              id="fade-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleDeletePost} sx={{ color: "red", fontWeight: 500 }}>Delete</MenuItem>
            </Menu>
          </div>
        }

        title={props.post.title}
        subheader={props.userDetails.username + " " + moment(props.post.created_at).fromNow()}
      />

      <CardContent>
        <Typography component="p">
          {props.post.description}
        </Typography>
      </CardContent>

      {props.post.image &&
        <CardMedia
          component="img"
          height="400"
          image={props.post.image}
          alt="alternate"
          sx={{ objectFit: "contain" }}
        />
      }

      <Divider variant="middle" sx={{ marginTop: 0.5 }} />

      <CardActions>
        {likeButton}
        <Button
          variant="text"
          fullWidth={true}
          onClick={() => { handleCommentVisibility(); }}
          type="submit">
          <ChatBubbleOutline />
          {props.postComments.length} Comments
        </Button>
      </CardActions>

      <Divider />
      {commentVisibility === true && <CardContent>
        {user && <form onSubmit={handleCommentSubmit}>
          <Box sx={{ display: 'flex', marginBottom: 2 }}>
            <TextField
              id="outlined-textarea"
              placeholder={`Write a comment...`}
              rows={1}
              fullWidth={true}
              value={newComment}
              onChange={(event) => { setNewComment(event.target.value); }}
            />
            <Button type='submit' variant="contained" sx={{ marginRight: 2, marginLeft: 2 }}>
              Comment
            </Button>
          </Box>
        </form>}
        {/* {commentList} */}
        {commentList}
      </CardContent>}
    </Card>
  );
};

export default Post;