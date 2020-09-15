import React, {useState, useEffect} from 'react'
import MediaCreate from './MediaCreate';
import {
    Button,
    Row,
    Col,
} from "reactstrap";
// import MediaEdit from './MediaEdit';

const MediaActions = () => {
    const [sessionToken, setSessionToken] = useState(undefined);
    console.log(sessionToken);

    useEffect(() => console.log('session token has changed'), [sessionToken]);

    const viewConductor = () => {
        return sessionToken ?
        <media sessionToken={sessionToken} /> :
        <auth
         message= "test"
         setSessionToken={setSessionToken}
        />
    }

return (
    <div>
        <Row>
        <h1>Welcome *user*</h1>
        <Col md ="6">
        <h3>Select Media Type</h3>
        <MediaCreate setSessionToken={setSessionToken}/>
        </Col>
        <Col md ="3">
            <h3>workout edit</h3>
        {/* <MediaEdit /> */}
        </Col>
        <Button /*onClick={MediaTable}*/>Go to your Collection</Button>
        </Row>
        {viewConductor()}
    </div>
)


}
export default MediaActions;


