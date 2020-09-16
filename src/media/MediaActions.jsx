import React, {useState, useEffect} from 'react'
import MediaCreate from './MediaCreate';
import UserEdit from '../auth/UserEdit';
import MediaTable from './MediaTable'
import {
	Button,
    Row,
    Col
} from "reactstrap";
import MediaEdit from './MediaEdit';

const MediaActions = (props) => { 

//   const [updateActive, setUpdateActive] = useState(false);
//    // console.log(props.user.email);


//   const updateOn = () => {
//     setUpdateActive(true);
//   };

//   const updateOff = () => {
//     setUpdateActive(false);
//   };

  return (
    <div className="Main">
      <div className="box1">
        <h1>Welcome *user*</h1>

        <Button onClick={props.MediaTable}>Go to your Collection</Button>
      </div>
      <div className="box2">
              <MediaCreate />
      </div>

      <h3>Media edit</h3>
      {/* {updateActive ? (
        <MediaEdit 
          updateOn={updateOn}
          mediaToUpdate={props.mediaToUpdate}
          updateOff={updateOff}
          token={props.token}
        />
      ) : (
        <></>
      )} */}

      {/* {viewConductor()} */}
      <div className="box4">
         {/* <UserEdit /> */}
      </div>
    </div>
  );
};
export default MediaActions;
