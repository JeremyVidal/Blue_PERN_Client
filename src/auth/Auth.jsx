import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import UserEdit from './UserEdit'
import { Container, Row, Col } from "reactstrap";


const Auth = (props) => {
    return(
        <Container className="auth-container">
            <Row>
                <Col md="4">
                    {/* <Signup updateToken={props.updateToken}/> */}
                </Col>
                <Col md="4">
                    {/* <Login updateToken={props.updateToken}/> */}
                </Col>
                <Col md="4">
                    <UserEdit updateToken={props.updateToken}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Auth;