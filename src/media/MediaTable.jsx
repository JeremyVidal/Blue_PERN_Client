import React from "react";
import { Table, Button } from "reactstrap";

const MediaTable = (props) => {
 

  const mediaMapper = () => {
    return props.media.map((media, index) => {
      return (
        <tr key={index}>
          <th scope="row">{media.id}</th>
          <td>{media.type}</td>
          <td>{media.title}</td>
          <td>{media.genre}</td>
          <td>{media.description}</td>
          <td>{media.rated}</td>
          <td>{media.platform}</td>
          {/* <td>{media.consumed}</td> */}
          {/* <td>{media.rating}</td> */}
          <td>
          <Button color ="warning" onClick={()=> {props.editUpdateMedia(media); props.updateOn()}}>Update</Button>
            {/* <Button color="danger" onClick={() => {deleteMedia(media) }}>Delete</Button> */}
          </td>
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