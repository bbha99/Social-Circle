import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Admin from '../pages/Admin';
import NotFound from '../pages/NotFound';

const Main = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='*' element={<NotFound />} />
      <Route path='/home' element={<Home />}></Route>
      <Route path='/admin' element={<Admin />}></Route>
      {/* <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route> */}
    </Routes>
  );
};

export default Main;