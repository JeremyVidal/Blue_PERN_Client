import React, { useState } from "react";
import APIURL from "../helpers/environment";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const MediaCreate = (props) => {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [rated, setRated] = useState("");
  const [rating, setRating] = useState("");
  const [consumed, setConsumed] = useState("");
  const [platform, setPlatform] = useState("");

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
        Authorization: props.updateToken,
      }),
    })
      .then((res) => res.json())
      .then((logMedia) => {
        console.log(logMedia);
        setType("");
        setTitle("");
        setGenre("");
        setDescription("");
        setRated("");
        setRating("");
        setConsumed("");
        setPlatform("");
        props.fetchMedia();
      });
  };

  return (
    <div className="main">
		<div className="mainDiv">
      <h3>Add to your Media Collection</h3>
      <br />
      <h5>Select Media Type</h5>
      <Form id="create" onSubmit={handleSubmit}>
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
          <Label htmlFor="rated">Rated: </Label>
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
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="consumed">Consumed: </Label>
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
        <Button type="submit">Click to Submit</Button>
      </Form>
    </div>
    </div>
  );
};

export default MediaCreate;
