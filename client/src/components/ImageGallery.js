import { Card, CardMedia, Grid } from "@mui/material";
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

  return (
    // <Box sx={{display: "flex"}}>
    // <Card sx={{ marginBottom: 2, paddingTop: 2, paddingBottom: 2 }}>
    //   <Carousel height={"350px"} autoPlay={false} navButtonsAlwaysVisible={true} indicators={false} >
    //     {items}
    //   </Carousel>
    // </Card>
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
  );
};

function Item(props) {
  return (
    <Grid item xs={4} style={{ display: 'flex' }} sx={{ marginRight: 2 }}>
      <CardMedia
        sx={{ height: "300px" }}
        component="img"
        image={props.item.image}
      // title="test"
      >
        {/* <Typography className="MediaCaption">
          test
        </Typography> */}
      </CardMedia>

    </Grid>
    // <Paper sx={{ marginRight: 2, marginLeft: 2 }}>
    // {/* <img src={`${props.item.image}`} alt="" height={"350px"} width={"220px"} /> */ }
    // </Paper>
  );
}

export default ImageGallery;