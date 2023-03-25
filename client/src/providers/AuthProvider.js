import { createContext, useState } from 'react';
import axios from "axios";

export const authContext = createContext();

const AuthProvider = (props) => {
  const [auth, setAuth] = useState(localStorage.getItem("auth") === "true");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

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

        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("auth", true);

        return;
      })
      .catch(error => {
        return error.response.data.errors;
      });
  };

  const logout = async () => {
    return axios.post(`http://localhost:3001/logout`, {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        setAuth(false);

        localStorage.setItem("user", null);
        localStorage.setItem("auth", false);

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