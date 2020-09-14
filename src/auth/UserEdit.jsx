import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./UserEdit.css"

const UserEdit = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(firstName, lastName, email, password);

    fetch("http://localhost:3025/user/", {
      method: "PUT",
      body: JSON.stringify({
        user: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        props.updateToken(data.sessionToken);
      });
  };

  return (
    <div id="editForm">
      <h1>Update User</h1>
      <Form onSubmit={handleSubmit}>
        <div className="name">
          <FormGroup className="fname">
            <Label htmlFor="firstName">First Name:</Label>
            <br />
            <Input
              id="firstName"
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
            />
          </FormGroup>
          <FormGroup className="lname">
            <Label htmlFor="lastName">Last Name:</Label>
            <br />
            <Input
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
            />
          </FormGroup>
        </div>

        <FormGroup className="email">
          <Label htmlFor="email">Email:</Label>
          <br />
          <Input
            id="email"
            type="text"
            size="30"
            name="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </FormGroup>
        <br />
        <FormGroup className="password">
          <Label htmlFor="password">Password:</Label>
          <br />
          <Input
            id="password"
            type="password"
            size="30"
            name="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </FormGroup>
        <br />
        <Button  className="toggle" type="submit">Update</Button>
      </Form>
    </div>
  );
};

export default UserEdit;
