import React, { useState, useEffect } from "react";
import Auth from "./auth/Auth";
import MediaIndex from "./media/MediaIndex";
import MediaActions from "./media/MediaActions";
import Header from './site/Header'
import Sitebar from "./site/Navbar";
import Footer from './site/Footer'
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    // console.log(sessionToken);
  };
  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
  };

  const protectedViews = () => {
    return sessionToken === localStorage.getItem("token") ? (
      <MediaIndex token={sessionToken} />
    ) : (
      <Auth updateToken={updateToken} />
    );
  };

  return (
    <div id="main">
      {/* <Header /> */}
      <Router>
      <Sitebar clearToken={clearToken} token={sessionToken} />
      {protectedViews()}
      </Router>
      {/* <MediaIndex /> */}
      <Footer />
    </div>
  );
}

export default App;
