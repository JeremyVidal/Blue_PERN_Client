import React, { useState } from "react";
import APIURL from '../helpers/environment';
import "./Auth.css";

import {
  Container,
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
  const [passError, setPassError] = useState('');

  const title = () => {
    return login ? "Login" : "Signup";
  };

  const label = () => {
    return !login ? "Go to Login" : "Go to Signup";

  }
  const loginToggle = (event) => {
    event.preventDefault();
    setLogin(!login);
    setEmail("");
    setPassword("");
    setFirstName("");
	setLastName("");
	setPassError("");
    setInputType("password");
  };

  const signupFields = () =>
    !login ? (
		<div>
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
      </div>
    ) : null;

  const handleSubmit = (event) => {
	event.preventDefault();
	// console.log(email, password);
	if (password.length > 4){
		let userObject = {
		email: email,
		password: password,
		firstName: firstName,
		lastName: lastName,
		};
		let url = login
		? `${APIURL}/user/login`
		: `${APIURL}/user/signup`;
		// console.log(url);
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
			// console.log(data.sessionToken);
		})
		.catch((err) => console.log(err));
	}
	else{
		setEmail("");
		setPassword("");
		setFirstName("");
		setLastName("");
		setPassError(<span className="pass_error" style={{width: "100%", textAlign: "center"}}>Password must be 5 characters or Longer!</span>);
	}
  };

    return(
    <Container className="auth">
		<Form className="form" onSubmit={handleSubmit} style={{margin: "50px auto 0 auto", maxWidth: "300px"}}>
			<div className="d-flex justify-content-center"><h3>{title()}</h3></div>
			{signupFields()}
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
				{passError}
				{/* <span className="pass_error">{passError}</span> */}
			</FormGroup>
		
			<div className="d-flex justify-content-between">
				<Button color="warning" type="submit">{title()}</Button>
				<Button color="success" className="toggle_button" onClick={loginToggle}>
				{label()}
				</Button>
			</div>
		</Form>
    </Container>
  );
};

export default Auth;
