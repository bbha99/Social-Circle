import { createContext, useState } from 'react';
import axios from "axios";

export const authContext = createContext();

const AuthProvider = (props) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  const register = (username, email, password, password_confirmation) => {
    const user = { username, email, password, password_confirmation };

    return axios.post(`http://localhost:3001/users`, { user }, { withCredentials: true })
      .then(() => {
        login(email, password);
      })
      .catch(error => {
        return error.response.data.errors;
      });
  };

  const login = async (email, password, redirect) => {
    const user = { email, password };

    return axios.post(`http://localhost:3001/login`, { user }, { withCredentials: true })
      .then(response => {
        setUser(response.data.user);
        setAuth(true);

        return;
      })
      .catch(error => {
        return error.response.data.errors;
      });
  };

  const logout = () => {
    return axios.post(`http://localhost:3001/logout`, {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        setAuth(false);

        return;
      })
      .catch(error => {
        return error.response.data.errors;
      });
  };

  const userData = { auth, user, register, login, logout };

  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthProvider;