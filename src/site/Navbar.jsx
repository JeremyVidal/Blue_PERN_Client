import React, { useState } from "react";
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
    <Navbar color="faded" light expand="md">
      <NavbarBrand>My Media Collection </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Button /*onClick={MediaTable}*/>View Media</Button>
            <Button onClick={props.clearToken}>Logout</Button>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};
export default Sitebar;
