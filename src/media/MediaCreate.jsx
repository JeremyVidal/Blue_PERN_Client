import React, { useState, useEffect } from "react";
import APIURL from "../helpers/environment";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import "./media.css";

const MediaCreate = (props) => {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [rated, setRated] = useState("");
  const [rating, setRating] = useState(0);
  const [consumed, setConsumed] = useState("");
  const [platform, setPlatform] = useState("");
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


  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${APIURL}/media/create`, {
      method: "POST",
      body: JSON.stringify({
        media: {
          type: type,
          title: title,
          genre: genre,
          description: description,
          rated: rated,
          rating: rating,
          consumed: consumed,
          platform: platform
        }
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        'Authorization':  localStorage.getItem('token'),
        // 'Authorization': localStorage.getItem('token'),
      })
    })
      .then((res) => res.json())
      .then((logData) => {
        console.log(logData);
        setType("");
        setTitle("");
        setGenre("");
        setDescription("");
        setRated("");
        setRating(0);
        setConsumed("");
        setPlatform("");
        fetchMedia(localStorage.getItem('token'));

      });
    };
    
  return (
    <Container >
      <h5>Add to your Media Collection</h5>
      <Form className="form" onSubmit={handleSubmit} style={{margin:"auto", maxWidth: "500px"}}>
			<div className="d-flex "></div>
        <FormGroup>
          <Label htmlFor="type"> Type: </Label>
          <Input
            id="formTypes"
            type="select"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option></option>
            <option value="Movie">Movie</option>
            <option value="Book">Book</option>
            <option value="Game">Game</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="title">Title:</Label>
          <Input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="genre">Genre:</Label>
          <Input
            name="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description:</Label>
          <Input
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="rated"> MPAA/ESRB Rating: </Label>
          <Input
            name="rated"
            value={rated}
            onChange={(e) => setRated(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="rating"> Rating: </Label>
          <Input
            name="rating"
            type="select"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option></option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="consumed">Watched/Read/Played?: </Label>
          <Input
            name="consumed"
            value={consumed}
            onChange={(e) => setConsumed(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="platform">Platform: </Label>
          <Input
            name="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default MediaCreate;
