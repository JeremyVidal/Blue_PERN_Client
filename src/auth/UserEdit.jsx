import React, { useState, useEffect } from "react";
import APIURL from "../helpers/environment";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";
import "./UserEdit.css";
import User from '../assets/User.png';

const UserEdit = (props) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [changePasswordToggle, setChangePasswordToggle] = useState(true);
	const [successMessage, setSuccessMessage] = useState('');
	const [deleteUser, setDeleteUser] = useState(false);
	const [passError, setPassError] = useState('');

  	const passwordToggle = (event) => {
   		event.preventDefault();
    	setChangePasswordToggle(!changePasswordToggle);
		setPassword('');
		setSuccessMessage('');
		setPassError('');
  	};

	const getUser = () => {
		fetch(`${APIURL}/user`, {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				"Authorization": localStorage.getItem('token'),
			}),
		})
		.then((res) => res.json())
		.then((data) => {
			// console.log(`User data: ${data.firstName}`);
			// setUserData(data);
			setFirstName(data.firstName)
			setLastName(data.lastName)
			setEmail(data.email)
			// setPassword(data.password)

		})
		// .then((err) => {console.log(err);})
	}

	useEffect(() => {
		getUser();
	}, [passError]);

	useEffect(() => {
		getUser();
	}, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(firstName, lastName, email, password);
    // console.log(props.token);
	// if (password !== '' && password.length > 4){

		fetch(`${APIURL}/user/`, {
		method: "PUT",
		body: JSON.stringify({
			// user: {
				
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password
			// },
		}),
		headers: new Headers({
			"Content-Type": "application/json",
			'Accept': 'application/json',
			"Authorization": localStorage.getItem("token"),
			// "Authorization": props.token,
		}),
		})
		.then((response) => response.json())
		.then((data) => {
			if (password != ''){
				setSuccessMessage(<span className="success_message" >Successfully Updated Your Password!</span>)
			}
			// props.updateToken(data.sessionToken);
			// console.log(data.sessionToken);
		});
	// }
	// else{
	// 	setEmail("");
	// 	setPassword("");
	// 	setFirstName("");
	// 	setLastName("");
	// 	setPassError(<span className="pass_error d-flex justify-content-center" >Password must be 5 characters or Longer!</span>);
	// }

	if (password !== ''){
		setChangePasswordToggle(!changePasswordToggle);
		setPassword('');
	}
	  
  };
  	// const getDeleteId = (id) => {
	// 	setDeleteId(id)
  	// }

	useEffect(() => {
		if(deleteUser === true){
			deleteAccount();
			setDeleteUser(false);
			props.clearToken(localStorage.getItem('token'));
		}
	}, [deleteUser]);
	
	const deleteAccount =() =>{
		fetch(`${APIURL}/user`,{
			method: 'DELETE',
            headers: new Headers ({
				'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        })
		.then(res => res.json())
		.then((logdata) => {
			console.log(logdata);
			props.clearToken()
		})
		.catch(err => console.log(err))
    }
	
	const changePasswordField = () =>
	  !changePasswordToggle ? (
		  <div>
				<FormGroup className="password">
				  <Label htmlFor="password">Password:</Label>
				  <Input id="password" type="text" name="password" placeholder="Enter New Password" onChange={(e) => setPassword(e.target.value)} value={password} />
			  </FormGroup>
			</div>
		) : null;

  return (
	<Container className="user_edit" >
	 	<Form className="form" onSubmit={handleSubmit} style={{margin: "10px auto 0 auto", maxWidth: "300px"}}s>
	 	<div className="d-flex justify-content-center align-items-center user_heading"><img className="user_image" src={User} alt=""/><h2>Update User</h2></div>
	 	<div className="d-flex justify-content-center" style={{marginBottom: '20px'}}>{ successMessage }{ passError }</div>
		 
	 		<FormGroup className="fname">
	 			<Label htmlFor="firstName">First Name:</Label>
	 			<Input id="firstName" type="text" name="firstName" placeholder="Enter First Name" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
	 		</FormGroup>
	 		<FormGroup className="lname">
	 			<Label htmlFor="lastName">Last Name:</Label>
	 			<Input id="lastName" type="text" name="lastName" placeholder="Enter Last Name" onChange={(e) => setLastName(e.target.value)} value={lastName}/>
	 		</FormGroup>	
			
	 		<FormGroup className="email">
	 			<Label htmlFor="email">Email:</Label>
	 			<Input id="email" type="text" name="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} value={email} />
			</FormGroup>
			<div className="d-flex justify-content-center">
				<a className="toggle_button " onClick={passwordToggle}>Change Password?</a>
			</div>
			{ changePasswordField() }
			
			<div className="d-flex justify-content-between">
				<Button className="updateButtons" color="success" type="submit">Update</Button>
				<Button className="updateButtons" color="danger" onClick={() => { setDeleteUser(true) }}>Delete Account</Button>
			</div>
		</Form>
	</Container>
  );
};

export default UserEdit;
