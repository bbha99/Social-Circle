import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { ImageOutlined } from '@mui/icons-material';

// Creating a new post
const PostForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState({
    titleMessage: ""
  });

  // Handles the user input on submission
  const handleSubmit = (event) => {
    const titleMessage = !title ? "title cannot be blank" : "";
    event.preventDefault();

    if (!title) {
      return (
        setError((prev) => ({
          ...prev,
          titleMessage
        }))
      );
    } else {
      props.handleClose();
      setError("");
      props.onSave(title, description, image);
    }
  };

  // Resets the input to its default value
  const reset = function () {
    setTitle("");
    setDescription("");
    setImage("");
  };

  const cancel = function () {
    reset();
    props.handleClose();
  };

  return (
    <Dialog open={props.open} onClose={cancel} component="form" onSubmit={handleSubmit}>
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
          autoFocus
          margin="dense"
          id="title"
          placeholder='Title'
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          fullWidth
          rows={1}
          helperText={error.titleMessage && `${error.titleMessage}`}
          multiline
        />
        
        <TextField
          margin="dense"
          id="description"
          placeholder='Text (optional)'
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          fullWidth
          rows={4}
          multiline
        />
        <Box sx={{ display: 'flex', alignItems: "center" }}>
          <ImageOutlined fontSize='large' sx={{ marginRight: 0.5 }} />
          <TextField
            margin="dense"
            id="description"
            placeholder='Image Url'
            type="text"
            value={image}
            onChange={(event) => setImage(event.target.value)}
            fullWidth
            multiline
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

