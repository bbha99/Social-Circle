import { Button, Card, CardContent, CardMedia, ListItem, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function NewsItem({ title, description, url, urlToImage }) {
  return (
    <Card sx={{m: 3}}>
      {/* <CardMedia
        image={urlToImage}
        component="img"
        height="150"
        title="image"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {description}
        </Typography>
        <Button target="_blank" href={url}>View Details</Button>
      </CardContent>
    </Card>
  );
}

export default NewsItem;