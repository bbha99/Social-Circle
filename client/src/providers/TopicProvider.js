import { createContext, useState } from 'react';
import axios from "axios";

export const topicContext = createContext();

const TopicProvider = (props) => {
  const [topicList, setTopicList] = useState([]);

  const getTopics = async () => {
    return axios.get('http://localhost:3001/admin/topics')
      .then((response) => {
        setTopicList(response.data);
      })
      .catch(error => {
        return error.response.data.errors;
      });
  };

  const topicData = { topicList, getTopics };

  return (
    <topicContext.Provider value={topicData}>
      {props.children}
    </topicContext.Provider>
  );
};

export default TopicProvider;