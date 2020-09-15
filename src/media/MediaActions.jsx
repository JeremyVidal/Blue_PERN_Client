import React from 'react'
import MediaCreate from './MediaCreate';
import {
    Button,
    Row,
    Col,
} from "reactstrap";
// import MediaEdit from './MediaEdit';

const MediaActions = () => {

return (
    <div>
        <Row>
        <h1>Welcome *user*</h1>
        <Col md ="6">
        <h3>Select Media Type</h3>
        <MediaCreate />
        </Col>
        <Col md ="3">
            <h3>workout edit</h3>
        {/* <MediaEdit /> */}
        </Col>
        <Button /*onClick={MediaTable}*/>Go to your Collection</Button>
        </Row>
    </div>
)


}
export default MediaActions;


