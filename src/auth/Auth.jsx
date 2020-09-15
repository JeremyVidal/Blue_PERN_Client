import React, { useState } from "react";
// import Signup from "./Signup";
// import Login from "./Login";
import UserEdit from './UserEdit'
import "./Auth.css"

import {Container, Row, Col, Form, FormGroup, Input, Button} from 'reactstrap';

const Auth = (props) => {
	const [login, setLogin] = useState(false)
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [inputType, setInputType] = useState('text');

	const title = () => {
		return login ?  'Login' : 'Signup'
	}

	const loginToggle = (event) => {
		event.preventDefault();
		setLogin(!login);
		setEmail('');
		setPassword('');
		setFirstName('');
		setLastName('');
		setInputType('password');
	}

	const signupFields = () => !login ?
		(
			<div>
				<Row>
				<Col md={10}>
				<FormGroup row>
					<Input name="firstName" type="text" placeholder="First Name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
					</FormGroup>
				</Col>
				</Row>
				<Row>
				<Col md={10}>
					<FormGroup row>
					<Input name="lastName" type="text" placeholder="Last Name" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
					</FormGroup>
				</Col>
				</Row>
			</div>
		) : null


	const handleSubmit = (event) => {
		event.preventDefault();
		let userObject = {
			email: email,
			password: password,
			firstName: firstName,
			lastName: lastName
		}
		let url = login ? 'http://localhost:3025/user/login' : 'http://localhost:3025/user/signup'
		console.log(url);
		fetch(url, {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(userObject)
		})
		.then(res => res.json())
		.then(data => { props.updateToken(data.sessionToken) })
		.catch(err => console.log(err))
	}
	
	
    return(
		<Container >
			<Form className="form" onSubmit={handleSubmit}>
				<Col sm="4">
					<h5>{ title() }</h5>
					{signupFields()}
					<Row>
						<Col md={10}>
							<FormGroup row>
							<Input name="email" type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col md={10}>
							<FormGroup row>
							<Input name="password" type={inputType} placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
							</FormGroup>
						</Col>
					</Row>
					<div>
						<Button type="submit">{title()}</Button>
						<Button className="toggle_button" onClick={loginToggle}>Login/Signup</Button>
					</div>
				</Col>
			</Form>

			<UserEdit />
		</Container>

        <Container className="auth-container">
            <Row>
                <Col md="4">
                    <Signup updateToken={props.updateToken}/>
                </Col>
                <Col md="4">
                    <Login updateToken={props.updateToken}/>
                </Col>
                <Col md="4">
                    {/* <UserEdit updateToken={props.updateToken}/> */}
                </Col>
            </Row>
        </Container>

    )
}

export default Auth;