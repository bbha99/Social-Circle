import { createContext, useState } from 'react';
import axios from "axios";

export const authContext = createContext();

const AuthProvider = (props) => {
  const [auth, setAuth] = useState(sessionStorage.getItem("auth") === "true");
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

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

        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        sessionStorage.setItem("auth", true);

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

        sessionStorage.setItem("user", null);
        sessionStorage.setItem("auth", false);

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