import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { ImageOutlined } from '@mui/icons-material';

// Creating a new post
const PostForm = (props) => {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState({
    titleMessage: "",
    topicMessage: ""
  });

  // Handles the user input on submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const titleMessage = !title ? "Title cannot be blank" : "";
    const topicMessage = !topic ? "Topic cannot be blank" : "";

    if (!title || !topic) {
      return (
        setError((prev) => ({
          ...prev,
          titleMessage,
          topicMessage
        }))
      );
    }
    props.handleClose();
    setError("");
    props.onSave(title, topic, description, image);
  };

  // Resets the input to its default value
  const reset = function () {
    setTitle("");
    setDescription("");
    setImage("");
    setTopic("");
  };

  const cancel = function () {
    reset();
    props.handleClose();
  };

  return (
    <Dialog open={props.open} onClose={cancel} component="form" onSubmit={handleSubmit} disableScrollLock={true}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        Create post
        <IconButton onClick={cancel} sx={{
          position: 'absolute',
          right: 16,
          top: 16,
          color: (theme) => theme.palette.grey[500],
        }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ paddingBottom: 0.5 }}>
        <TextField
          error={error.titleMessage ? true : false}
          autoFocus
          margin="dense"
          id="title"
          type="text"
          label="Title*"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          helperText={error.titleMessage && `${error.titleMessage}`}
          variant= "filled"
          fullWidth
          rows={1}
          multiline
        />

        <TextField
          select
          margin="dense"
          label="Topic"
          error={error.topicMessage ? true : false}
          helperText={error.topicMessage ? `${error.topicMessage}` : "Please select a Topic*"}
          variant="filled"
          fullWidth
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
        >
          
          {props.topics.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          margin="dense"
          id="description"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          fullWidth
          rows={4}
          multiline
          label='Text (optional)'
          variant= "filled"
        />
        <Box sx={{ display: 'flex', alignItems: "center" }}>
          <ImageOutlined fontSize='large' sx={{ marginRight: 0.5 }} />
          <TextField
            margin="dense"
            id="description"
            type="text"
            value={image}
            onChange={(event) => setImage(event.target.value)}
            fullWidth
            multiline
            label='Image Url'
            variant= "filled"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button type='submit' variant="contained" sx={{ marginRight: 2, marginBottom: 1 }}>
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostForm;

