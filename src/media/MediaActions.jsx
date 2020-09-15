import React, {useState, useEffect} from 'react'
import MediaCreate from './MediaCreate';
import {
    Button,
    Row,
    Col,
} from "reactstrap";
// import MediaEdit from './MediaEdit';

const MediaActions = (props) => {


return (
    <div>
        <Row>
        <h1>Welcome *user*</h1>
        <Button /*onClick={MediaTable}*/>Go to your Collection</Button>
        <Col md ="10">
        {/* <h3>Select Media Type</h3> */}
        <MediaCreate />
        </Col>
        {/* <Col md ="3">
            <h3>Media edit</h3>
        <MediaEdit />
        </Col> */}
        </Row>
        {/* {viewConductor()} */}
    </div>
)


}
export default MediaActions;


