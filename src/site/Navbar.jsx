import React, { useState } from "react";
import { Route, Link, Switch } from "react-router-dom";
import Home from "./Home";
import MediaTable from "../media/MediaTable";
import MediaIndex from "../media/MediaIndex";
import MediaAll from "../media/MediaAll";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  Button,
} from "reactstrap";
import UserEdit from "../auth/UserEdit";

const Sitebar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    let newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
  };
  return (
    <div className="mainNav">
      <div className="one">
        <ul className="two">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li><Link to="/mediaAll">View All Media</Link></li>
          <li><Link to="/mediaMine">View My Media</Link></li>
          <li><Link to="/userEdit">User Edit</Link></li>
          {/* <li><Link to="/userDelete">User Delete</Link></li> */}
        </ul>
      </div>

      <div className="route">
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/mediaAll">
            <MediaAll />
          </Route>
          <Route exact path="/mediaMine">
          <MediaTable media={props.media} />
          </Route>
          <Route exact path="/userEdit">
            <UserEdit />
          </Route>
          {/* <Route exact path="/userDelete">
            <UserDelete />
          </Route> */}
          </Switch>
      </div>

      <Navbar color="black" light expand="md">
        <NavbarBrand>
          {" "}
          <h3>My Media Collection</h3>{" "}
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav
            // justify variant="pills"
            className="ml-auto"
            navbar
          >
            <NavItem>
              {/* <Button onClick ={props.media}><Link to ="/mediaindex">ViewMedia</Link></Button> */}
              <Button onClick={props.MediaTable}>View Media</Button>
              <Button onClick={props.MediaActions}>Home</Button>
              <Button onClick={props.clearToken}>Logout</Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      {/* <div className="route">
      <Route exact path="/home"><Home /></Route>
      <Route exact path="/mediaindex"><MediaIndex /></Route>
    </div> */}
    </div>
  );
};
export default Sitebar;
