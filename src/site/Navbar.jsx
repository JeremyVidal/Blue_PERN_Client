import React, { useState } from "react";
import { Route, Link, Switch } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  Button,
} from "reactstrap";

const Sitebar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    let newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
  };
  return (
    <div className="mainNav">
    <Navbar  color="black" light expand="md">
      <NavbarBrand> <h4>My Media Collection</h4> </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav 
        // justify variant="pills" 
        className="ml-auto" navbar>
          <NavItem>
       
            <Button onClick={props.MediaTable}>View Media</Button>
            <Button onClick={props.MediaActions}>Home</Button>
            <Button onClick={props.clearToken}>Logout</Button>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
    </div>
  );
};
export default Sitebar;
