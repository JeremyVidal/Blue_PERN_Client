import React, { useState, useEffect } from "react";
import APIURL from "../helpers/environment";
import MediaTable from "./MediaTable";
import MediaActions from "./MediaActions";
import MediaEdit from "./MediaEdit";

import { Container, Row, Col } from "reactstrap";

const MediaIndex = (props) => {
  const [media, setMedia] = useState([]);

  const [deleteId, setDeleteId] = useState("");

  // const [updateActive, setUpdateActive] = useState(false);
  // const [mediaToUpdate, setMediaToUpdate] = useState({});

  // const editUpdateMedia = (mediaEntry) => {
  //   setMediaToUpdate(mediaEntry);
  //   console.log(mediaEntry);
  // };

  // const updateOn = () => {
  //   setUpdateActive(true);
  // };

  // const updateOff = () => {
  //   setUpdateActive(false);
  // };

  const fetchMedia = () => {
    // fetch(`${APIURL}/media`, {

    fetch(`${APIURL}/media/all`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then((mediaData) => {
        setMedia(mediaData);
        // console.log(mediaData);
      });
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const deleteMedia = (deleteId) => {
    console.log(deleteId);
    if (deleteId) {
      let url = `${APIURL}/media/${deleteId}`;
      fetch(url, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: props.token,
        }),
      })
        .then((res) => res.json())
        .then(setDeleteId(""))
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    deleteMedia(deleteId);
    // setDeleteId('');
  }, [deleteId]);

  return (
    <Container>
     
          {/* <MediaTable
            media={media}
            editUpdateMedia={editUpdateMedia}
			      updateOn={updateOn}
			      setDeleteId={setDeleteId}
            token={props.token}
          /> */}
   
          {/* <MediaActions
            media={media}
            // editUpdateMedia={editUpdateMedia}
            // updateOn={updateOn}
            token={props.token}
          /> */}
 

        {/* <MediaTable media={media} editUpdateMedia={editUpdateMedia}
          updateOn={updateOn} /> */}

          {/* <MediaActions editUpdateMedia={editUpdateMedia} mediaToUpdate={mediaToUpdate} media={media} token={props.token} fetchMedia={fetchMedia}/>
          {updateActive ? ( */}
{/* 
        <MediaEdit
          updateOn={updateOn}
          mediaToUpdate={mediaToUpdate}
          updateOff={updateOff}
          token={props.token}
          fetchMedia={fetchMedia}
        />
      ) : (
        <></>
       */}
      
    
        {/* <MediaActions editUpdateMedia={props.editUpdateMedia} mediaToUpdate={props.mediaToUpdate} media={props.media} token={props.token} fetchMedia={fetchMedia}/> */}
    </Container>
  );
};

export default MediaIndex;
