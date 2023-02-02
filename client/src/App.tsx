import React, { useEffect } from 'react';
import './App.css';
import Home from './components/Home'
import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Logout from './components/Logout';
import UserProfile from './components/UserProfile';


function App() {

  return (
    <div className="App">
      <Login />
      <Logout />
      <p>User Info:</p>
      <UserProfile />
    </div>
  );
}

export default App;
