import React, { useState, useEffect } from "react";
import APIURL from "../helpers/environment";
import MediaCreate from "./MediaCreate";
import MediaActions from "./MediaActions";
import MediaEdit from "./MediaEdit";

import { Container, Row, Col } from "reactstrap";

const MediaIndex = (props) => {
  const [media, setMedia] = useState([]);

  const [deleteId, setDeleteId] = useState('');

  const [updateActive, setUpdateActive] = useState(false);
  const [mediaToUpdate, setMediaToUpdate] = useState({});

  const editUpdateMedia = (mediaEntry) => {
    setMediaToUpdate(mediaEntry);
    console.log(mediaEntry);
  };

  const updateOn = () => {
    setUpdateActive(true);
  };


  const editUpdateMedia = (mediaEntry) => {
    setMediaToUpdate(mediaEntry);
    console.log(mediaEntry);
  };

  const updateOn = () => {
    setUpdateActive(true);
  };

  const updateOff = () => {
    setUpdateActive(false);
  };

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
	if (deleteId){
		let url = `http://localhost:3025/media/${deleteId}`;
		fetch(url, {
				method: 'DELETE',
				headers: new Headers({
					'Content-Type': 'application/json',
					'Authorization': props.token
				})
		})
		.then(res => res.json())
		.then(setDeleteId(''))
		.catch(err => console.log(err))
	}
}

useEffect(() => {
	deleteMedia(deleteId);
	// setDeleteId('');
}, [deleteId]);


  return (
      <div>
      {/* <MediaCreate /> */}
      </div>
  );

};
export default MediaIndex;

