import React, { useState, useEffect } from "react";
import MediaTable from './MediaTable';
import APIURL from '../helpers/environment';
// import MediaCreate from './MediaCreate';
import MediaActions from './MediaActions';
import {Container, Row, Col } from "reactstrap";


const MediaIndex = (props) => {
  const [media, setMedia] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [mediaToUpdate, setMediaToUpdate] = useState({});

  const editUpdateMedia = (mediaEntry) => {
    setMediaToUpdate(mediaEntry);
    console.log(mediaEntry);
  }

  const updateOn = () => {
    setUpdateActive(true);
  }

  const updateOff = () => {
    setUpdateActive(false);
  }

  const fetchMedia = () => {
    // fetch(`${APIURL}/media`, {
    fetch(`${APIURL}/media/all`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        // Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then((mediaData) => {
        setMedia(mediaData);
        console.log(mediaData);
      });
  };


  useEffect(() => {
    fetchMedia();
  }, []);
  
 

  return (
    <Container>
      <Row>
        {/* <Col md="3">
    
        
        </Col> */}
        <Col md="12">
          <MediaTable
            media={media}
            editUpdateMedia={editUpdateMedia}
            updateOn={updateOn}
            updateOff={updateOff}
            token={props.token}
          />
        </Col>
        <Col md="6">
          {/* <MediaActions
            media={media}
            editUpdateMedia={editUpdateMedia}
            updateOn={updateOn}
            updateOff={updateOff}
            token={props.token}
          /> */}
        </Col>
                   
      </Row>
    </Container>
  );
};
export default MediaIndex;