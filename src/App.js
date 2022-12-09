import React from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

// import MasterLayout from "./Layouts/Admin/MasterLayout";
// import Home from "./Components/Frontend/Home";
// import About from "./Components/Frontend/About";
// import Contact from "./Components/Frontend/Contact";
// import Login from "./Components/Frontend/Auth/Login";
// import Register from "./Components/Frontend/Auth/Register";
import AdminPrivateRoute from "./AdminPrivateRoute";
// import Page403 from "./Components/Errors/Page403";
// import Page404 from "./Components/Errors/Page404";
import PublicRoute from "./PublicRoute";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config){
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

function App() {
  return (
      <Router>
          <Switch>

            <AdminPrivateRoute path="/admin" name="Admin"/>
            
            <PublicRoute path="/" name="Home" />

          </Switch>
      </Router>
  );
}

export default App;
