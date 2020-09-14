import React, { useState, useEffect } from "react";
import MediaTable from './MediaTable';
// import MediaCreate from './MediaCreate';
import MediaActions from './MediaActions';

import { Container, Row, Col } from "reactstrap";


const MediaIndex = (props) => {
  const [media, setMedia] = useState([]);


  const fetchMedia = () => {
    fetch("http://localhost:3025/media/all", {
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
        <Col md="3">
    
        
        </Col>
        <Col md="9">
          <MediaTable
            media={media}
            // editUpdateMedia={editUpdateMedia}
            // updateOn={updateOn}
            token={props.token}
          />
        </Col>
        <Col md="9">
          <MediaActions
            media={media}
            // editUpdateMedia={editUpdateMedia}
            // updateOn={updateOn}
            token={props.token}
          />
        </Col>
                   
      </Row>
    </Container>
  );
};
export default MediaIndex;