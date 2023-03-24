import { FavoriteBorder, MoreHoriz, ChatBubbleOutline, Favorite } from '@mui/icons-material';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, Fade, IconButton, Menu, MenuItem, TextField, Typography } from '@mui/material';
import React from 'react';
import { useContext } from "react";
import { authContext } from '../providers/AuthProvider';
import moment from 'moment';
import Comment from './Comment';
import { Box } from '@mui/system';

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
    // newComment
    setNewComment("");
  };

  // Toggle comment display
  const handleCommentVisibility = () => {
    setCommentVisibility(!commentVisibility)
    // props.changeCommentVisibility(props.post.id);
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


  let commentArr = [];
  // if (Object.keys(props.newCommentList).length !== 0) {
  //   commentArr = [...props.postComments, props.newCommentList];
  // } else {
  commentArr = [...props.postComments];
  // }

  // console.log("props.postComments", props.postComments)
  let commentList = [];
  if (commentArr.length !== 0) {
    commentArr = sortByDate(commentArr);
    commentList = commentArr.map(comment => {
      return (
        <Comment
          key={comment.id}
          description={comment.description}
          commentOwner={comment.user}
          created_at={comment.created_at}
        />);
    });
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
              <MenuItem onClick={handleClose} sx={{ color: "blue", fontWeight: 500 }}>Edit</MenuItem>
              <MenuItem onClick={handleClose} sx={{ color: "red", fontWeight: 500 }}>Delete</MenuItem>
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
      {/* {props.displayComment[props.post.id] === true && <CardContent> */}
      {commentVisibility === true && <CardContent>
        {user && <form onSubmit={handleCommentSubmit}>
          <Box sx={{ display: 'flex', marginBottom: 2 }}>
            <TextField
              id="outlined-textarea"
              placeholder={`Write a comment...`}
              rows={1}
              fullWidth={true}
              // value={props.newComment ? props.newComment : ""}
              // onChange={(event) => props.setNewComment((prev) => {
              //   const newCommentObj = {};
              //   newCommentObj[props.post.id] = event.target.value;
              //   return { ...prev, ...newCommentObj };
              // })}
                // value={props.post.id in props.newComment ? props.newComment[props.post.id] : ""}
                // onChange={(event) => props.setNewComment(props.post.id, event.target.value)}
                value={newComment}
                onChange={(event)=> {setNewComment(event.target.value)}}
                />
                <Button type='submit' variant="contained" sx={{ marginRight: 2, marginLeft: 2 }}>
                  Comment
                </Button>
          </Box>
        </form>}
        {commentList}
      </CardContent>}
    </Card>
  );
};

export default Post;