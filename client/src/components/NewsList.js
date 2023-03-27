import { Card, List, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';

function NewsList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`)
      .then((response) => {

        setArticles(response.data.articles);
      });
  }, []);
  console.log("response news: ", articles);
  return (
    <Card style={{ maxHeight: "68%", overflow: 'auto', maxWidth: "100%" }}>
      <Typography variant="h5" component="div" sx={{ m: 3 }}>Top Headlines</Typography>
      {articles.map(({ title, description, url, urlToImage }) => {
        return <NewsItem title={title} description={description} url={url} urlToImage={urlToImage} />;
      })}
    </Card>
  );
}

export default NewsList;