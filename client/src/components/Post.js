import { FavoriteBorder, MoreHoriz, ChatBubbleOutline, Favorite } from '@mui/icons-material';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, Fade, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import React from 'react';

// Individual post component
const Post = (props) => {

  const [likeIncrement, setLikeIncrement] = React.useState(0);
  const [likeIdExist, setLikeIdExist] = React.useState({});

  // Delete post action
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Allow user to like a post
  function heartPost(event) {
    // console.log("hearting post...")
    props.likePost(props.post.id)
    .then((postLiked) => {
      console.log("thisabfoiebofiew: ", postLiked.postLikeId)
      const likeId = {post_id: postLiked.postLikeId.post_id, user_id: postLiked.postLikeId.user_id}
      setLikeIdExist(likeId)
      setLikeIncrement(1)
    })
    .catch(error => console.log(error));

  }

  // Allow user to unlike a liked post
  function unheartPost(event) {
    // console.log("unhearting post...")
    // props.unlikePost(props.post.id)
    // .then((postUnliked) => {
    //   setLikeIncrement(-1)
    // })
    // .catch(error => console.log(error));
  }

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardHeader
        // avatar={
        //   <Avatar sx={{ width: 50, height: 50 }} src={props.user.image} />
        // }
        action={
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
        // subheader={props.user.name + " March 14, 2023"}
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
        <Button
          variant="text"
          fullWidth={true}
          type="submit">
          { (props.userLikedId.length || Object.keys(likeIdExist).length !== 0 ) > 0 && <Favorite onClick={unheartPost} sx={{ color: "red" }} />}
          {(props.userLikedId.length === 0 && Object.keys(likeIdExist).length === 0 ) && <FavoriteBorder onClick={heartPost}/>}
          {props.totalLikes + likeIncrement} Likes
        </Button>
        <Button
          variant="text"
          fullWidth={true}
          type="submit">
          <ChatBubbleOutline />
          1 Comments
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;