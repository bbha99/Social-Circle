import { Card, CardContent, CardMedia, ListItem, Typography } from '@mui/material';
import React from 'react';

function NewsItem({ title, description, url, urlToImage }) {
  return (
    <Card sx={{m: 3}}>
      <CardMedia
        image={urlToImage}
        component="img"
        height="150"
        title="image"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          <a href={url}></a>{title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NewsItem;