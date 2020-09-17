import React, { useState, useEffect } from "react";
import Auth from "./auth/Auth";
import MediaTable from "./media/MediaTable";
// import MediaIndex from "../media/MediaIndex";
import MediaCreate from "./media/MediaCreate";
// import MediaActions from "../media/MediaActions";
import UserEdit from "./auth/UserEdit";
import MediaAll from "./media/MediaAll";
import MediaIndex from "./media/MediaIndex";
import MediaActions from "./media/MediaActions";
import Header from "./site/Header";
import Sitebar from "./site/Navbar";
import Footer from "./site/Footer";
import "./App.css";
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";

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

  const [media, setMedia] = useState([]);

  // const [deleteId, setDeleteId] = useState('');

  const [updateActive, setUpdateActive] = useState(false);
  const [mediaToUpdate, setMediaToUpdate] = useState({});

  const editUpdateMedia = (mediaEntry) => {
    setMediaToUpdate(mediaEntry);
    // console.log(mediaEntry);
  };

  const updateOn = () => {
    setUpdateActive(true);
  };

  const updateOff = () => {
    setUpdateActive(false);
  };

  const protectedViews = () => {
    return sessionToken === localStorage.getItem("token") ? (
      <Route exact path="/mediaCreate">
      <MediaCreate token={sessionToken} setMedia={setMedia} />
    </Route>
    ) : (
      <Route exact path="/">    <Auth updateToken={updateToken} /></Route>
    );
  };

  return (
    <div id="main">
      {/* <Header /> */}
      <Router>
        <Sitebar
          clearToken={clearToken}
          token={sessionToken}
          editUpdateMedia={editUpdateMedia}
          media={media}
          setMedia={setMedia}
          updateActive={updateActive}
          mediaToUpdate={mediaToUpdate}
          updateOn={updateOn}
          updateOff={updateOff}
        />
        <div className="route">
        <Switch>
        {protectedViews()}
          <Route exact path="/mediaCreate">
            <MediaCreate setMedia={setMedia} />
          </Route>
          <Route exact path="/mediaAll">
            <MediaAll />
          </Route>
          <Route exact path="/mediaMine">
            <MediaTable
              media={media}
              editUpdateMedia={editUpdateMedia}
              token={sessionToken}
              updateOn={updateOn}
              updateActive={updateActive}
              mediaToUpdate={mediaToUpdate}
			  updateOff={updateOff}
            />
          </Route>
          <Route exact path="/userEdit">
            <UserEdit token={sessionToken} />
          </Route>
        </Switch>

      </div>
      </Router>
      {/* <MediaIndex /> */}
      <Footer />
    </div>
  );
}

export default App;
