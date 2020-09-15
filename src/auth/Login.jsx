import React, { useState } from "react";
import APIURL from '../helpers/environment';
import {
  Container,
  Row,
  Col,
  FormFeedback,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password);
    if (email) {
      fetch(`${APIURL}/user/login`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          props.updateToken(data.sessionToken);
          console.log(data.sessionToken);
        })
        .catch((err) => console.log(err));
    } else {
      setMessage("Required!");
    }
  };

  return (
    <Container className="App">
      <h1>Login</h1>
      <Form className="form" onSubmit={handleSubmit}>
        <Row>
          <Col sm={10}>
            <FormGroup row>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <FormFeedback tooltip>{ message }</FormFeedback> */}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={10}>
            <FormGroup row>
              <Input
                name="password"
                id="password"
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
};
export default Login;
