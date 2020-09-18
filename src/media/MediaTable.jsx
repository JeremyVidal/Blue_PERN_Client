import React, { useState, useEffect } from "react";
import APIURL from '../helpers/environment';
import { Table, Button, Container } from "reactstrap";
import MediaEdit from './MediaEdit';
import "./media.css";
import Play from '../assets/Play.png';
import Collection from '../assets/Collection.png';



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
				{/* <th scope="row">{media.id}</th> */}
				<td scope="row"><img className="media_table_image" src={Play} alt=""/></td>
				<td>{media.type}</td>
				<td>{media.title}</td>
				<td>{media.genre}</td>
				<td>{media.description}</td>
				<td>{media.rated}</td>
				<td>{media.platform}</td>
				{/* <td>{media.consumed}</td>
				<td>{media.rating}</td> */}
				<td><Button color ="success" onClick={()=> {props.editUpdateMedia(media); props.updateOn()}}>Update</Button></td>
				<td><Button color="danger" onClick={() => {getDeleteId(media.id)}}>Delete</Button></td>
        	</tr>
	      );
    });
  };

  return (

	<div className="main">
	<div className="mainDiv">

		<div className="d-flex" style={{padding: "20px"}}>
			<img className="media_collection_image" src={Collection} alt=""/><h3>My Collection</h3>
		</div>
      <Table striped>
        <thead className="mediaTable">
          <tr >
            <th></th>
            <th>Type</th>
            <th>Title</th>
            <th>Genre</th>
            <th>Description</th>
            <th>MPAA/ESRB Rating</th>
            <th>Platform</th>
			<th></th>
			<th></th>
            {/* <th>Consumed</th> */}
            {/* <th>My Rating</th> */}
            {/* <th>Watched/Read/Played</th>
            <th>My Rating</th> */}
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
          />
        ) : (
          <></>
        )}
 </div>
 </div>
  );
}
export default MediaTable;
