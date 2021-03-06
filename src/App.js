import React, { useState, useEffect } from "react";
import Auth from "./auth/Auth";
import MediaTable from "./media/MediaTable";
import MediaCreate from "./media/MediaCreate";
import UserEdit from "./auth/UserEdit";
import MediaAll from "./media/MediaAll";
import MediaIndex from "./media/MediaIndex";
import MediaActions from "./media/MediaActions";
import Header from "./site/Header";
import Sitebar from "./site/Navbar";
import Footer from "./site/Footer";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

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
      		<MediaCreate token={sessionToken} setMedia={setMedia}/>
    	</Route>
    ) : (
      <Route exact path="/"><Auth updateToken={updateToken} clearToken={clearToken}/></Route>
    );
  };
  
  return (
    <div id="main" className="sideBar">
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
          <Route exact path="/">
          {sessionToken === localStorage.getItem("token")  ?  <Redirect to="/mediaCreate" /> : <Auth updateToken={updateToken} />}
          </Route> 
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
            <UserEdit token={sessionToken} clearToken={clearToken}/>
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

  {/* <Route exact path='/' token={sessionToken} render={
   <Auth updateToken={updateToken} />} />
  
  <ProtectedRoute exact path='/mediaCreate'><MediaCreate setMedia={setMedia} /> </ProtectedRoute>
  <Route exact path='/landingpage'><LandingPage /></Route>  */}