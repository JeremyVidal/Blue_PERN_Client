import React, { useState, useEffect } from "react";
import APIURL from "../helpers/environment";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";

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
  const [conf, setConf] = useState('form submitted');

  const fetchMedia = (token) => {
    fetch(`${APIURL}/media`, {
      // fetch(`${APIURL}/media/all`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    })
      // .then(() => props.fetchMedia())
      .then((res) => res.json())
      .then((mediaData) => {
        console.log(mediaData);
        setMedia(mediaData);
      });
  };

  useEffect(() => {
    fetchMedia(localStorage.getItem("token"));
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
          platform: platform,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
        // 'Authorization': localStorage.getItem('token'),
      }),
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
        fetchMedia(localStorage.getItem("token"));
      });
      
  };

  return (
    <Container >
    <Form className="form" onSubmit={handleSubmit} style={{margin:"auto", maxWidth: "500px"}}>
     <h5>Add to your Media Collection</h5>
          <div className="d-flex justify-content-right"></div>
          <FormGroup style={{marginBottom: '5px'}}>
            <Label htmlFor="type" style ={{marginBottom: '1px'}} > Type: </Label>
            <Input bsSize="sm" 
              id="formTypes"
              type="select"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option></option>
              <option value="Movie">Movie</option>
              <option value="Book">Book</option>
              <option value="Game">Game</option>
            </Input>
          </FormGroup>
           <FormGroup style={{marginBottom: '5px'}}>
            <Label htmlFor="title"  style ={{marginBottom: '1px'}}>Title:</Label>
            <Input bsSize="sm" 
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FormGroup>
           <FormGroup style={{marginBottom: '5px'}}>
            <Label htmlFor="genre"  style ={{marginBottom: '1px'}}>Genre:</Label>
            <Input bsSize="sm" 
              name="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup style={{marginBottom: '5px'}}>
            <Label htmlFor="description"  style ={{marginBottom: '1px'}}>Description:</Label>
            <Input bsSize="sm" 
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup style={{marginBottom: '5px'}}>
            <Label htmlFor="rated"  style ={{marginBottom: '1px'}}> MPAA/ESRB Rating: </Label>
            <Input bsSize="sm" 
              name="rated"
              value={rated}
              onChange={(e) => setRated(e.target.value)}
            />
          </FormGroup>
          <FormGroup style={{marginBottom: '5px'}}>
            <Label htmlFor="rating"  style ={{marginBottom: '1px'}}> Rating: </Label>
            <Input bsSize="sm" 
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
          <FormGroup style={{marginBottom: '5px'}}>
            <Label htmlFor="consumed"  style ={{marginBottom: '1px'}}>Watched/Read/Played?: </Label>
            <Input bsSize="sm" 
              name="consumed"
              value={consumed}
              onChange={(e) => setConsumed(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="platform"  style ={{marginBottom: '1px'}}>Platform: </Label>
            <Input bsSize="sm" 
              name="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
   </Container>

  )
};

export default MediaCreate;
