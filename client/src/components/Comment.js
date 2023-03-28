import { ChatBubbleOutline, MoreHoriz } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Fade, IconButton, Menu, MenuItem, TextField, Typography } from '@mui/material';
import React from 'react';
import axios from 'axios';
import { useContext } from "react";
import { authContext } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const Comment = (props) => {
  const [newNestedComment, setNewNestedComment] = React.useState("");
  const [nestedCommentVisibility, setNestedCommentVisibility] = React.useState(false);
  const navigate = useNavigate();

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

  // Toggle comment display
  const handleCommentVisibility = () => {
    setNestedCommentVisibility(!nestedCommentVisibility);
  };

  // Allows user to create a new comment for a post
  const handleCommentSubmit = (event) => {
    event.preventDefault();

    if (user) {
      const newCommentDetails = {
        "description": newNestedComment,
        "post_id": props.commentDetails.post_id,
        "user_id": user.id,
        "deleted": null,
        "parent_comment_id": props.commentDetails.id
      };
      axios.post('http://localhost:3001/comments', null, { params: { newCommentDetails: newCommentDetails } })
        .then((newCommentData) => {
          props.setPosts((prev) => {
            const newPost = [...prev];
            newPost.forEach((post) => {
              if (props.commentDetails.post_id === post.postsDetails.id) {
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
    setNewNestedComment("");
    setNestedCommentVisibility(!nestedCommentVisibility);
  };

  return (
    <Card sx={{ marginBottom: 2, borderLeft: 3, marginLeft: props.marginLeft, paddingLeft: 2, paddingRight: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ width: 30, height: 30 }} src={props.commentDetails.user.image} sx={{ cursor: 'pointer' }} onClick={() => navigate(`/users/${props.commentDetails.user.id}`)}/>
        }
        subheader={
          <Box>
            <Box component="span" sx={{ cursor: 'pointer' }} onClick={() => navigate(`/users/${props.commentDetails.user.id}`)}>{props.commentDetails.user.username}</Box> {moment(props.commentDetails.created_at).fromNow()}
          </Box>
        }
      />
      <CardContent>
        <Typography component="p">
          {props.commentDetails.description}
        </Typography>
      </CardContent>
      {user && <CardActions>
        <Button
          variant="text"
          onClick={() => { handleCommentVisibility(); }}
          type="submit">
          <ChatBubbleOutline />
          Reply
        </Button>
      </CardActions>}
      {nestedCommentVisibility === true && <CardContent>
        {user && <form onSubmit={handleCommentSubmit}>
          <Box sx={{ display: 'flex', marginBottom: 2 }}>
            <TextField
              id="outlined-textarea"
              placeholder={`Reply to comment`}
              rows={1}
              fullWidth={true}
              value={newNestedComment}
              onChange={(event) => { setNewNestedComment(event.target.value); }}
            />
            <Button type='submit' variant="contained" sx={{ marginLeft: 2 }}>
              Comment
            </Button>
          </Box>
        </form>}
      </CardContent>}
    </Card>
  );
};

export default Comment;