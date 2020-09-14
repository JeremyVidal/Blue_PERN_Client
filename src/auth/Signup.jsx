import React, { useState } from 'react';
import { Container, Row, Col, FormFeedback, Form, FormGroup, Label, Input, Button} from 'reactstrap';


const Signup = (props) => {

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(email, password);
		if(email){
			fetch("http://localhost:3025/user/signup", {
				method: 'POST',
				body: JSON.stringify({firstName: firstName, lastName: lastName, email: email, password: password}),
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			})
			.then((response) => response.json())
			.then((data) => {props.updateToken(data.sessionToken)})
			.catch(err => console.log(err))
		}
		else {
			setMessage('Required!');
		}
	}
	
	return(
			<Container className="App">
			<h1>Sign Up</h1>
			<Form className="form" onSubmit={handleSubmit}>
				<Row>
				<Col md={6}>
				<FormGroup row>
					<Input name="firstName" id="firstName" type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
					{/* <FormFeedback tooltip>{ message }</FormFeedback> */}
					</FormGroup>
				</Col>
				</Row>
				<Row>
				<Col sm={10}>
					<FormGroup row>
					<Input name="lastName" id="lastName" type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
					{/* <FormFeedback tooltip>{ message }</FormFeedback> */}
					</FormGroup>
				</Col>
				</Row>
				<Row>
				<Col sm={10}>
					<FormGroup row>
					<Input name="email" id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
					{/* <FormFeedback tooltip>{ message }</FormFeedback> */}
					</FormGroup>
				</Col>
				</Row>
				<Row>
				<Col sm={10}>
					<FormGroup row>
					<Input name="password" id="password" type="text" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)} />
					</FormGroup>
				</Col>
				</Row>
					<Button type="submit">Signup</Button>
			</Form>
			</Container>


	);
};
export default Signup;