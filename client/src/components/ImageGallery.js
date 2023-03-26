import { Card, CardMedia, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';

const ImageGallery = (props) => {
  // const [selectedImage, setSelectedImage] = useState(null);
  const dataItems = props.gallery;

  let items = [];
  const sliderItems = dataItems.length > 4 ? 4 : dataItems.length;
  for (let i = 0; i < dataItems.length; i += sliderItems) {
    if (i % sliderItems === 0) {
      items.push(
        <Card key={i.toString()} sx={{ paddingLeft: 2, paddingBottom: 2, paddingTop: 2 }}>
          <Grid container spacing={0} wrap="nowrap" // --> add this line to disable wrap
          
          >
            {dataItems.slice(i, i + sliderItems).map((da, index) => {
              return <Item key={index} item={da} />;
            })}
          </Grid>
        </Card>
      );
    }
  }

  console.log("images: ", dataItems)
  return (
    <Box height={"300px"}>
      <Carousel
        autoPlay={false}
        animation="fade"
        indicators={false}
        duration={500}
        navButtonsAlwaysVisible={false}
        navButtonsAlwaysInvisible={false}
        cycleNavigation={false}
        fullHeightHover={true}
        swipe={true}>
        {items}
      </Carousel>

    </Box>
  );
};

function Item(props) {
  return (
    <Grid item xs={4} style={{ display: 'flex' }} sx={{ marginRight: 2 }}>
      <CardMedia
        sx={{ height: "300px" }}
        component="img"
        image={props.item.image}
      >
      </CardMedia>
    </Grid>
  );
}

export default ImageGallery;