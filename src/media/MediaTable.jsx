import React, { useState, useEffect } from "react";
import APIURL from '../helpers/environment';
import { Table, Button } from "reactstrap";
import MediaEdit from './MediaEdit';
import "./media.css";

const MediaTable = (props) => {

	const [media, setMedia] = useState([]);
	
	const fetchMedia = (token) => {
		fetch(`${APIURL}/media`, {
			// fetch(`${APIURL}/media/all`, {
		  method: "GET",
		  headers: new Headers({
			"Content-Type": "application/json",
			"Authorization": token,
		  }),
		})
		// .then(() => props.fetchMedia())
		  .then((res) => res.json())
		  .then((mediaData) => {
			  console.log(mediaData);
			  setMedia(mediaData);
		  })
	  };
	
	  useEffect(() => {

		fetchMedia(localStorage.getItem('token'));
	  }, []);

	//console.log(props.token);

  	const mediaMapper = () => {
    return media.map((media, index) => {
      return (
		<div className="main">
		<div className="mainDiv">
        <tr key={index}>
          	<th scope="row">{media.id}</th>
          	<td>{media.type}</td>
          	<td>{media.title}</td>
          	<td>{media.genre}</td>
          	<td>{media.description}</td>
          	<td>{media.rated}</td>
          	<td>{media.platform}</td>
          	<td>{media.consumed}</td>
          	<td>{media.rating}</td>
          	<td><Button color ="info" onClick={()=> {props.editUpdateMedia(media); props.updateOn()}}>Update</Button></td>
            <td><Button color="dark" onClick={() => {props.setDeleteId(media.id)}}>Delete</Button></td>
        </tr>
		</div>
		</div>
      );
    });
  };

  return (
	<div className="main">
	<div className="mainDiv">
      <h3>Media Collection</h3>
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
            <th>Platform</th>
            {/* <th>Consumed</th> */}
            {/* <th>My Rating</th> */}
          </tr>
        </thead>
        <tbody>{mediaMapper()}</tbody>
      </Table>
      {props.updateActive ? (
          <MediaEdit
            updateOn={props.updateOn}
            mediaToUpdate={props.mediaToUpdate}
            updateOff={props.updateOff}
            token={props.token}
            fetchMedia={fetchMedia}
            updateOn={props.updateOn}
          />
        ) : (
          <></>
        )}
    </div>
	</div>
  );
}
export default MediaTable;
