import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [topics, setTopics] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    axios.get('/admin/topics')
      .then(response => {
        setTopics(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('/admin/topics', {
      name: name
    })
      .then(response => {
        setTopics([...topics, response.data]);
        setName('');
        console.log("Successfully added")
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div>
      <h1>Topics</h1>
      <ul>
        {topics.map(topic => (
          <li key={topic.id}>{topic.name}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Topic Name" value={name} onChange={handleNameChange} />
        <button type="submit">Add Topic</button>
      </form>
    </div>
  );
}

export default AdminDashboard;