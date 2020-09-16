import React, { useState, useEffect } from "react";
import APIURL from "../helpers/environment";
import { Container, Row, Col, Table } from "reactstrap";

const MediaAll = (props) => {
  const [media, setMedia] = useState([]);
  // const [updateActive, setUpdateActive] = useState(false);
  // const [mediaToUpdate, setMediaToUpdate] = useState({});

  // const editUpdateMedia = (mediaEntry) => {
  //   setMediaToUpdate(mediaEntry);
  //   console.log(mediaEntry);
  // }

  // const updateOn = () => {
  //   setUpdateActive(true);
  // }

  // const updateOff = () => {
  //   setUpdateActive(false);
  // }

  const fetchMedia = () => {
      fetch(`${APIURL}/media/all`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
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

  const mediaMapper = () => {
    return media.map((media, index) => {
      return (
        <tr key={index}>
          <th scope="row">{media.id}</th>
          <td>{media.type}</td>
          <td>{media.title}</td>
          <td>{media.genre}</td>
          <td>{media.description}</td>
          <td>{media.rated}</td>
          <td>{media.userId}</td>
          {/* <td>{media.platform}</td> */}
          {/* <td>{media.consumed}</td> */}
          {/* <td>{media.rating}</td> */}
        </tr>
      );
    });
  };

  return (
    <div id= "main">
      <h3>Media in All Collections</h3>
      <hr />
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Title</th>
            <th>Genre</th>
            <th>Description</th>
            <th>Rated</th>
            <th>UserId</th>
            {/* <th>Platform</th> */}
            {/* <th>Consumed</th> */}
            {/* <th>My Rating</th> */}
          </tr>
        </thead>
        <tbody>{mediaMapper()}</tbody>
      </Table>
    </div>
  );
};
export default MediaAll;
