import React, { useState, useEffect } from "react";
import APIURL from "../helpers/environment";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";
import "./UserEdit.css";


const UserEdit = (props) => {
  	const [firstName, setFirstName] = useState("");
  	const [lastName, setLastName] = useState("");
  	const [email, setEmail] = useState("");
  	const [password, setPassword] = useState("");
  	const [changePasswordToggle, setChangePasswordToggle] = useState(true);
	// const [userData, setUserData] = useState('');

  	const loginToggle = (event) => {
   		event.preventDefault();
    	setChangePasswordToggle(!changePasswordToggle);
    	setPassword("");
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

		})
		.then((err) => {console.log(err);})
	}, []);	

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(firstName, lastName, email, password);
    console.log(props.token);

    fetch(`${APIURL}/user/`, {
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
        "Authorization": props.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        props.updateToken(data.sessionToken);
        console.log(data.sessionToken);
      });
  };


  const changePasswordField = () =>
    !changePasswordToggle ? (
		<div>
  			<FormGroup className="password">
				  <br />
				<Label htmlFor="password">Password:</Label>
				<Input id="password" type="password" name="password" placeholder="Enter New Password" onChange={(e) => setPassword(e.target.value)}/>
			</FormGroup>
      	</div>
	  ) : null;

	//   const deleteUser =() =>{
    //     fetch(`${APIURL}/user`,{
    //         method: 'DELETE',
    //         headers: new Headers ({
    //             'Content-Type': 'application/json',
    //             'Authorization': props.token
    //         })
    //     })
    //     .then(()=> props.fetchUser())
    // }

  return (
	<Container>
	 	<div className="d-flex justify-content-center"><h2>Update User</h2></div>
	 	<Form className="form" onSubmit={handleSubmit} style={{margin: "50px auto 0 auto", maxWidth: "300px"}}s>
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
				<a className="toggle_button" onClick={loginToggle}>Change Password?</a>
			</div>
			{changePasswordField()}
			<div className="d-flex justify-content-between">
				<Button className="updateButtons" type="submit">Update</Button>
				{/* <Button className="updateButtons" onClick={() => {deleteUser(user)}}>Delete Account</Button> */}
			</div>
		</Form>
	</Container>
  );
};

export default UserEdit;
