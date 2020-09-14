import React, { useState, useEffect } from "react";
import Auth from "./auth/Auth";
import MediaIndex from "./media/MediaIndex";
// import Header from './site/Header'
import Sitebar from "./site/Navbar";
import "./App.css";

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
    console.log(sessionToken);
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
    <div>
      {/* <Header /> */}
      <Sitebar clearToken={clearToken} />
      {protectedViews()}
      <MediaIndex />
    </div>
  );
}

export default App;
