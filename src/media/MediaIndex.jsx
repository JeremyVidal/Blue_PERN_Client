import React, { useState, useEffect } from "react";
import APIURL from "../helpers/environment";
import MediaCreate from "./MediaCreate";
import MediaTable from "./MediaTable";
import MediaActions from "./MediaActions";
import MediaEdit from "./MediaEdit";
import MediaTable from "./MediaTable";

import { Container, Row, Col } from "reactstrap";

const MediaIndex = (props) => {
	// const [media, setMedia] = useState([]);
	// const [deleteId, setDeleteId] = useState('');

	// const fetchMedia = () => {
	// 	// fetch(`${APIURL}/media`, {

	// 	fetch(`${APIURL}/media/all`, {
	// 	method: "GET",
	// 	headers: new Headers({
	// 		"Content-Type": "application/json",
	// 		Authorization: props.token,
	// 	}),
	// 	})
	// 		.then((res) => res.json())
	// 		.then((mediaData) => {
	// 		setMedia(mediaData);
	// 		// console.log(mediaData);
	// 	});
	// };


	// useEffect(() => {
	// 		fetchMedia();
	// }, []);

	// const getDeleteId = (id) => {
	// 		setDeleteId(id);
	// }
  
	// useEffect(() => {
	// 	deleteMedia(deleteId);
	// }, []);

  // 	const deleteMedia = (deleteId) => {
	// 	// console.log(deleteId);
	// 	if (deleteId){
	// 		let url = `${APIURL}/media/${deleteId}`;
	// 		fetch(url, {
	// 			method: 'DELETE',
	// 			headers: new Headers({
	// 				'Content-Type': 'application/json',
	// 				'Authorization': props.token
	// 			})
	// 		})
	// 	.then(res => res.json())
	// 	.then(setDeleteId(''))
	// 	.catch(err => console.log(err))
	// 	}
	// }
	

  return (
      <div>
      {/* <MediaCreate /> */}
      <h1>HI</h1>
      </div>
  );

};
export default MediaIndex;

