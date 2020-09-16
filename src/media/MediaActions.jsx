import React/*, {useState, useEffect}*/ from 'react'
import MediaCreate from './MediaCreate';
import UserEdit from '../auth/UserEdit';
import {
	Button,
    Row,
    Col,
} from "reactstrap";
// import MediaEdit from './MediaEdit';

const MediaActions = (props) => {


return (
    <div class="Main">
        <div className = "box1">
        <h1>Welcome *user*</h1>
     
        <Button onClick={props.MediaTable}>Go to your Collection</Button>
        </div>
<div className="box2">
    
            {/* <h3>Select Media Type</h3> */}
            <MediaCreate />
            </div>
            {/* <Col md ="3">
                <h3>Media edit</h3>
            <MediaEdit />
        </Col> */}
       
        {/* {viewConductor()} */}
        <div className = "box4">
            <UserEdit />
        </div>
    </div>
)


}
export default MediaActions;


