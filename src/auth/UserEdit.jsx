import React, { useState, useEffect } from "react";
import APIURL from "../helpers/environment";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";
import "./UserEdit.css";


const UserEdit = (props) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [changePasswordToggle, setChangePasswordToggle] = useState(true);
	const[successMessage, setSuccessMessage] = useState('');
	const [deleteUserId, setDeleteUserId] = useState('');
	// const [userData, setUserData] = useState('');

  	const passwordToggle = (event) => {
   		event.preventDefault();
    	setChangePasswordToggle(!changePasswordToggle);
		setPassword('');
		setSuccessMessage('');
  	};

	useEffect(() => {
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
	}, []);	

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(firstName, lastName, email, password);
    console.log(props.token);

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
        // props.updateToken(data.sessionToken);
        // console.log(data.sessionToken);
	  });
	  if (password != ''){
		setChangePasswordToggle(!changePasswordToggle);
		  setSuccessMessage(<span className="success_message" >Successfully Updated Your Password!</span>)
		  setPassword('');
	  }
	  
  };


  const changePasswordField = () =>
    !changePasswordToggle ? (
		<div>
  			<FormGroup className="password">
				  <br />
				<Label htmlFor="password">Password:</Label>
				<Input id="password" type="text" name="password" placeholder="Enter New Password" onChange={(e) => setPassword(e.target.value)} value={password} />
			</FormGroup>
      	</div>
	  ) : null;

	  const getDeleteUserId = (id) => {
		setDeleteUserId(id);
	}


	  useEffect(() => {
		deleteUser(deleteUserId);
	  }, [deleteUserId]);

	  const deleteUser = (token) => {
		if (deleteUserId) {
		  let url = `${APIURL}/user/`;
		  fetch(url, {
			method: "DELETE",
			headers: new Headers({
			  "Content-Type": "application/json",
			  Authorization: token,
			}),
		  })
			.then((res) => res.json())
			.then((userData) => {
			  console.log(userData);
			  setDeleteUserId('');
			//   fetchMedia(localStorage.getItem("token"));
			})
			.catch((err) => console.log(err));
		}
	  };


  return (
	<Container style={{marginTop: "60px"}}>
	 	<div className="d-flex justify-content-center user_heading"><h5>Update User</h5></div>
	 	<div className="d-flex justify-content-center" >{successMessage}</div>

	 	<Form className="form" onSubmit={handleSubmit} style={{margin: "10px auto 0 auto", maxWidth: "300px"}}s>
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
			<div >
				<a className="toggle_button" onClick={passwordToggle}>Change Password?</a>
			
			</div>
			{changePasswordField()}
			<div className="d-flex justify-content-between">
				<Button className="updateButtons" type="submit">Update</Button>
				<Button className="updateButtons" onClick={() =>{getDeleteUserId(false)}}>Delete Account</Button>
			</div>
		</Form>
	</Container>
  );
};

export default UserEdit;
