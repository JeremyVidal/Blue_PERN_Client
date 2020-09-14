import React, { useState } from 'react';
import { Col, FormFeedback, Form, FormGroup, Label, Input, Button} from 'reactstrap';


const Signup = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const [validity, setValidity] = useState('valid');

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(email, password);
		if(email){
			fetch("http://localhost:3025/user/signup", {
				method: 'POST',
				body: JSON.stringify({email: email, password: password}),
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			})
			.then((response) => response.json())
			.then((data) => {props.updateToken(data.sessionToken)})
			.catch(err => console.log(err))
		}
		else {
			setMessage('Please Enter a Username!');
			setValidity('invalid');
		}
	}
	
	return(
		<div>
			<Form onSubmit={handleSubmit}>
				<h1>Sign Up</h1>
				<FormGroup row>
					<Label htmlFor="email" sm={2}>Email</Label>
					<Col sm={10}>
						<Input name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
						<FormFeedback tooltip>{ message }</FormFeedback>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label htmlFor="password" sm={2}>Password</Label>
					<Col sm={10}>
						<Input name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
					</Col>
				</FormGroup>
				<Button type="submit">Signup</Button>
			</Form>
		</div>

	);
};
export default Signup;