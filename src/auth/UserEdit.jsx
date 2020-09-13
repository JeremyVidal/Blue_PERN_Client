import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";


const UserEdit = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(firstName, lastName, username, password);
 
    fetch("http://localhost:3025/user/", {
      method: "PUT",
      body: JSON.stringify({user: { firstName:firstName, lastName:lastName,  email: email, password: password } }), 
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        props.updateToken(data.sessionToken)
             });
  };

    return (
      <div>
        <h1>Update User</h1>
        <Form onSubmit={handleSubmit}>  
        <FormGroup>
            <Label htmlFor="firstName">First lastName</Label>
            <Input
              id="firstName"
              type="text"
              name="firstName"
              placeholder="enter first name"
              onChange={(e) => setFirstName(e.target.value)}             
              value={firstName}
              required
            />          
          </FormGroup>
          <FormGroup>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              name="lastName"
              placeholder="enter last name"
              onChange={(e) => setLastName(e.target.value)}             
              value={lastName}
              required
            />          
          </FormGroup>    
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              name="email"
              placeholder="enter email"
              onChange={(e) => setEmail(e.target.value)}             
              value={email}
              required
            />          
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="enter password"
              onChange={(e) => setPassword(e.target.value)}         
              value={password}
              required
            />
          </FormGroup>
          <Button type="submit">Sign Up</Button>
        </Form>
      </div>
    );
  }

export default UserEdit;