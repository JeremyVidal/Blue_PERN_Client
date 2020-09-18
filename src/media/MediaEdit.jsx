import React, { useState } from "react";
import "./MediaEdit.css";
import APIURL from "../helpers/environment";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

const MediaEdit = (props) => {
  const [editType, setEditType] = useState(props.mediaToUpdate.type);
  const [editTitle, setEditTitle] = useState(props.mediaToUpdate.title);
  const [editGenre, setEditGenre] = useState(props.mediaToUpdate.genre);
  const [editDescription, setEditDescription] = useState(
    props.mediaToUpdate.description
  );
  const [editRated, setEditRated] = useState(props.mediaToUpdate.rated);
  const [editRating, setEditRating] = useState(props.mediaToUpdate.rating);
  const [editConsumed, setEditConsumed] = useState(
    props.mediaToUpdate.consumed
  );
  const [editPlatform, setEditPlatform] = useState(
    props.mediaToUpdate.platform
  );

  const toggle = () => props.updateOff();

  const mediaUpdate = (event) => {
    event.preventDefault();
    fetch(`${APIURL}/media/update/${props.mediaToUpdate.id}`, {
      method: "PUT",
      body: JSON.stringify({
        media: {
          type: editType,
          title: editTitle,
          genre: editGenre,
          description: editDescription,
          rated: editRated,
          rating: editRating,
          consumed: editConsumed,
          platform: editPlatform,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }),
    }).then((res) => {
      props.fetchMedia(localStorage.getItem("token"));
      console.log(`${APIURL}/media/update/${props.mediaToUpdate.id}`);
      console.log(res);
      console.log(localStorage.getItem("token"));
      props.updateOff();
    });
  };

  return (
    <Modal isOpen={true}>
      <ModalHeader>Edit Your Media</ModalHeader>
      <ModalBody id="edit-form">
        <Form onSubmit={mediaUpdate}>
          <FormGroup>
            <Label htmlFor="type">Edit Type:</Label>
            <Input
              type="select"
              name="type"
              value={editType}
              onChange={(e) => setEditType(e.target.value)}
              required
            >
              <option></option>
              <option value="Movie">Movie</option>
              <option value="Book">Book</option>
              <option value="Game">Game</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="title">Edit Title:</Label>
            <Input
              name="title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="genre">Edit Genre:</Label>
            <Input
              name="genre"
              value={editGenre}
              onChange={(e) => setEditGenre(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Edit Description:</Label>
            <Input
              name="description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="rated">Edit MPAA/ESRB Rating:</Label>
            <Input
              name="rated"
              value={editRated}
              onChange={(e) => setEditRated(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="rating">Edit User Rating:</Label>
            <Input
              name="rating"
              type="select"
              max="5"
              value={editRating}
              onChange={(e) => setEditRating(e.target.value)}
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
            <Label htmlFor="consumed">Watched/Read/Played?:</Label>
            <Input
              name="consumed"
              value={editConsumed}
              onChange={(e) => setEditConsumed(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="platform">Edit Platform:</Label>
            <Input
              name="platform"
              value={editPlatform}
              onChange={(e) => setEditPlatform(e.target.value)}
            />
          </FormGroup>
          <Button type="submit" color="success">
            Submit
          </Button>{" "}
          <Button color="danger" onClick={toggle}>
            Cancel
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default MediaEdit;
