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

  return (
    <Card style={{ maxHeight: "65%", overflow: 'auto', maxWidth: "100%" }}>
      <Typography variant="h5" component="div" sx={{ m: 3 }}>Top Headlines</Typography>
      {articles.map((article, index) => {
        return <NewsItem key={index} title={article.title} description={article.description} url={article.url} urlToImage={article.urlToImage} />;
      })}
    </Card>
  );
}

export default NewsList;