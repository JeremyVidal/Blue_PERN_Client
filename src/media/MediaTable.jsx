import React, { useState, useEffect } from "react";
import APIURL from '../helpers/environment';
import { Table, Button } from "reactstrap";
import "./media.css";

const MediaTable = (props) => {
	const [media, setMedia] = useState([]);
	const [deleteId, setDeleteId] = useState('');
	
	const fetchMedia = () => {
		fetch(`${APIURL}/media`, {
		  method: "GET",
		  headers: new Headers({
			"Content-Type": "application/json",
			Authorization: props.token,
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


	const deleteMedia = () => {
		console.log(deleteId);
		if (deleteId){
			let url = `${APIURL}/${deleteId}`;
			fetch(url, {
					method: 'DELETE',
					headers: new Headers({
						'Content-Type': 'application/json',
						'Authorization': props.token
					})
			})
			.then(res => res.json())
			// .then(setDeleteId(''))
			.catch(err => console.log(err))
		}
	}
	useEffect(() => {
		deleteMedia();
		setDeleteId('');
	}, [deleteId]);



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
          	<td><Button /*className="btn-edit"*/ color ="info" onClick={()=> {props.editUpdateMedia(media); props.updateOn()}}>Update</Button></td>
            <td><Button color="dark" onClick={() => {setDeleteId(media.id)}}>Delete</Button></td>
        </tr>
      );
    });
  };

  return (
		  <div>
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
			  <tbody>
				{mediaMapper()}
			  </tbody>
			</Table>
		  </div>
  );
};
export default MediaTable;