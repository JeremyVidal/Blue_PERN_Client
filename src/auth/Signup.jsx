import React, { useState } from 'react';
import APIURL from '../helpers/environment';
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
			fetch(`${APIURL}/user/signup`, {
				method: 'POST',
				body: JSON.stringify({firstName: firstName, lastName: lastName, email: email, password: password}),
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			})
		})
		.then((response) => response.json())
		.then((data) => {props.updateToken(data.sessionToken)})
		.catch(err => console.log(err))
		}

	
	
	return(
			<Form className="form" onSubmit={handleSubmit}>
			<h1>Sign Up</h1>
				<Row>
				<Col md={10}>
				<FormGroup row>
					<Input name="firstName" id="firstName" type="text" placeholder="First Name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
					{/* <FormFeedback tooltip>{ message }</FormFeedback> */}
					</FormGroup>
				</Col>
				</Row>
				<Row>
				<Col md={10}>
					<FormGroup row>
					<Input name="lastName" id="lastName" type="text" placeholder="Last Name" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
					{/* <FormFeedback tooltip>{ message }</FormFeedback> */}
					</FormGroup>
				</Col>
				</Row>
				<Row>
				<Col md={10}>
					<FormGroup row>
					<Input name="email" id="email" type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
					{/* <FormFeedback tooltip>{ message }</FormFeedback> */}
					</FormGroup>
				</Col>
				</Row>
				<Row>
				<Col md={10}>
					<FormGroup row>
					<Input name="password" id="password" type="text" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
					</FormGroup>
				</Col>
				</Row>
					<Button type="submit">Signup</Button>
			</Form>


	);
};
export default Signup;