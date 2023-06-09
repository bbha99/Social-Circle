import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import AdminDashboard from "../pages/AdminDashboard";
import User from "../pages/User";
import ChatPage from "../pages/ChatPage";
import SearchResults from "../pages/SearchResults";

const Main = ({ cable }) => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace={true} />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/home" element={<Home />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
      <Route path="/users/:id" element={<User />}></Route>
      <Route path="/chats" element={<ChatPage cable={cable} />}></Route>
      <Route path="/chat_container"element={<ChatPage cable={cable} />}></Route>
      <Route path="/search/:searchInput" element={<SearchResults />}></Route>
    </Routes>
  );
};

export default Main;
