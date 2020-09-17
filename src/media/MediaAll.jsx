import React, { useState, useEffect } from "react";
import APIURL from "../helpers/environment";
import { Table } from "reactstrap";

const MediaAll = (props) => {
  const [media, setMedia] = useState([]);

  const fetchMedia = () => {
    // fetch(`${APIURL}/media`, {
    fetch(`${APIURL}/media/all`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        'Authorization': props.token,
      }),
    })
      .then((res) => res.json())
      .then((mediaData) => {
        //   console.log(mediaData);
        setMedia(mediaData);
      });
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const mediaMapper = () => {
    return media.map((media, index) => {
      return (
        // <div className="main">
        // <div className="mainDiv">
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

        //  </div>
        // </div>
      );
    });
  };

  return (
        <div className="main">
        <div className="mainDiv">
      <h5  className="mediaTable">Media in All Collections</h5>
      <hr />
      <Table striped>
        <thead  className="mediaTable"> 
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
        <tbody  className="mediaTable">{mediaMapper(props.token)}</tbody>
      </Table>
    </div>
    </div>
  );
};
export default MediaAll;
