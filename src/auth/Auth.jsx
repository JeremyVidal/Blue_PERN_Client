import React, { useState } from "react";
import APIURL from '../helpers/environment';
import "./Auth.css";

import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

const Auth = (props) => {
  const [login, setLogin] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("text");

  const title = () => {
    return login ? "Login" : "Signup";
  };

  const loginToggle = (event) => {
    event.preventDefault();
    setLogin(!login);
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setInputType("password");
  };

  const signupFields = () =>
    !login ? (
      <div>
        <Row>
          <Col md={10}>
            <FormGroup row>
              <Label htmlFor="firstName">First Name:</Label>
              <br />
              <Input
                name="firstName"
                type="text"
                placeholder="First Name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={10}>
            <FormGroup row>
              <Label htmlFor="lastName">Last Name:</Label>
              <br />
              <Input
                name="lastName"
                type="text"
                placeholder="Last Name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
      </div>
    ) : null;

  const handleSubmit = (event) => {
	event.preventDefault();
	console.log(email, password);
    let userObject = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };
    let url = login
      ? `${APIURL}/user/login`
      : `${APIURL}/user/signup`;
    console.log(url);
    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(userObject),
    })
      .then((res) => res.json())
      .then((data) => {
        props.updateToken(data.sessionToken);
		console.log(data.sessionToken);
	  })
      .catch((err) => console.log(err));
  };
	
    return(

    <Container className="auth-container">
      <Form className="form" onSubmit={handleSubmit}>
        <Col sm="4">
          <h3>{title()}</h3>
          {signupFields()}
          <Row>
            <Col md={10}>
              <FormGroup row>
                <Label htmlFor="email">Email:</Label>
                <br />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={10}>
              <FormGroup row>
                <Label htmlFor="password">Password:</Label>
                <br />
                <Input
                  name="password"
                  type={inputType}
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <div>
            <Button type="submit">{title()}</Button>
            <Button className="toggle_button" onClick={loginToggle}>
              Login/Signup
            </Button>
          </div>
        </Col>
      </Form>
        </Container>

    // <Container className="auth-container">
    //     <Row>
    //         <Col md="4">
    //             <Signup updateToken={props.updateToken}/>
    //         </Col>
    //         <Col md="4">
    //             <Login updateToken={props.updateToken}/>
    //         </Col>
    //         <Col md="4">
    //             {/* <UserEdit updateToken={props.updateToken}/> */}
    //         </Col>
    //     </Row>
    // </Container>
  );
};

export default Auth;
