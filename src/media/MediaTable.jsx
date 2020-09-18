import React, { useState, useEffect } from "react";
import APIURL from '../helpers/environment';
import { Table, Button, Container } from "reactstrap";
import MediaEdit from './MediaEdit';
import "./media.css";

const MediaTable = (props) => {

	const [media, setMedia] = useState([]);
	const [deleteId, setDeleteId] = useState('');
	
	const fetchMedia = (token) => {
		fetch(`${APIURL}/media`, {
			  method: "GET",
		  headers: new Headers({
			"Content-Type": "application/json",
			"Authorization": token,
		  }),
		})
		  .then((res) => res.json())
		  .then((mediaData) => {
			//   console.log(mediaData);
			  setMedia(mediaData);
		  })
	  };
	
	  useEffect(() => {
		fetchMedia(localStorage.getItem('token'));
	  }, []);

	//console.log(props.token);

	const getDeleteId = (id) => {
		setDeleteId(id);
	}

	useEffect(() => {
		deleteMedia(deleteId);
	}, [deleteId]);

	const deleteMedia = (deleteId) => {
		// console.log(deleteId);
		if (deleteId){
			let url = `${APIURL}/media/${deleteId}`;
			fetch(url, {
				method: 'DELETE',
				headers: new Headers({
					'Content-Type': 'application/json',
					'Authorization': props.token
				})
			})
		.then(res => res.json())
		.then(
			(logdata) => {
				console.log(logdata);
				setDeleteId('');
				fetchMedia(localStorage.getItem('token'));})
		.catch(err => console.log(err))
		}
		
	}

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
          	<td>{media.platform}</td>
          	<td>{media.consumed}</td>
          	<td>{media.rating}</td>
          	<td><Button color ="info" onClick={()=> {props.editUpdateMedia(media); props.updateOn()}}>Update</Button></td>
            <td><Button color="dark" onClick={() => {getDeleteId(media.id)}}>Delete</Button></td>
        </tr>
	      );
    });
  };

  return (
	<Container>
      <h5>Media Collection</h5>
      <hr />
      <Table striped>
        <thead className="mediaTable">
          <tr >
            <th>#</th>
            <th>Type</th>
            <th>Title</th>
            <th>Genre</th>
            <th>Description</th>
            <th>MPAA/ESRB Rating</th>
            <th>Platform</th>
            <th>Watched/Read/Played</th>
            <th>My Rating</th>
          </tr>
        </thead>
        <tbody className="mediaTable">{mediaMapper()}</tbody>
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
 </Container>
  );
}
export default MediaTable;
