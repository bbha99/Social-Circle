import { Button, Card, CardMedia, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { createContext, useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PublishIcon from '@mui/icons-material/Publish';
import axios from "axios";
export const AppContext = createContext(null);

const ImageGallery = (props) => {
  const dataItems = props.gallery.slice(0, 4);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/latest')
      .then((response) => {
        setStories(response.data);
      });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();
    data.append("gallery[image]", event.target.image.files[0]);
    submitToAPI(data);
  }

  function submitToAPI(data) {
    axios.post('http://localhost:3001/galleries', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    })
      .then((response) => {
        setStories((prev) => {
          return [response.data, ...prev];
        });
      })
      .catch((response) => {
        throw new Error(response.status);
      });
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

  const handleFileChange = () => {
    console.log("image selected");
  };

  let galleryArr = sortByDate(stories);
  galleryArr = galleryArr.slice(0, 4);
  let items = [];
  items = galleryArr.map((data) => {
    return <Item key={data.id} item={data} />;
  });

  return (
    <Box height={"250px"}>
      <Card sx={{ paddingLeft: 2, paddingBottom: 2, paddingTop: 2 }}>
        <Grid container spacing={0} wrap="nowrap">
          <Grid item xs={4} style={{ display: 'flex' }} sx={{ marginRight: 2, borderRadius: "10px", height: "250px", backgroundImage: `url(${"images/flowers.png"})`, display: "flex", justifyContent: "center", alignItems: "center" }}
            component="form" onSubmit={(e) => handleSubmit(e)}>
            <Button
              component="label"
              style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', color:"white" }}
            >
              <AddCircleOutlineIcon />
              <input type="file" name="image" id="image" hidden onChange={handleFileChange} />
            </Button>
            <Button style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', color: "white" }} type="submit">
              <PublishIcon />
            </Button>
          </Grid>
          {items}
        </Grid>
      </Card>
    </Box>
  );
};

function Item(props) {
  return (
    <Grid item xs={4} style={{ display: 'flex' }} sx={{ marginRight: 2, borderRadius: "10px" }}>
      <CardMedia
        sx={{ height: "250px", borderRadius: "10px" }}
        component="img"
        image={props.item.image}
      >
      </CardMedia>
    </Grid>
  );
}

export default ImageGallery;

