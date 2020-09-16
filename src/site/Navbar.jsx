import React, { useState } from "react";
import { Route, Link, Switch } from "react-router-dom";
import Home from "./Home";
import MediaTable from "../media/MediaTable";
import MediaIndex from "../media/MediaIndex";
import MediaActions from "../media/MediaActions";
import MediaAll from "../media/MediaAll";
import UserEdit from "../auth/UserEdit";
import './Navbar.css';
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
      <div className="one">
      <Navbar color="black" light expand="md">
        <NavbarBrand>
         <h3>My Media Collection</h3>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav fill
            justify 
         
            navbar
          >
          <NavItem className="justify-content-between">         
          {/* <Button><Link to="/">Home</Link></Button> */}
          <Button className="nav_buttons" ><Link className="nav_links" to="/mediaIndex">Home</Link></Button>
          <Button className="nav_buttons" color="secondary"><Link className="nav_links" to="/mediaAll">View All Media</Link></Button>
          <Button className="nav_buttons" color="secondary"><Link className="nav_links" to="/mediaMine">View My Media</Link></Button>
          <Button className="nav_buttons" color="secondary"><Link className="nav_links" to="/userEdit">User Edit</Link></Button>
          <Button className="nav_buttons" color="secondary" onClick={props.clearToken}><Link className="nav_links" to="">Logout</Link></Button>
          {/* <li><Link to="/userDelete">User Delete</Link></li> */}
          </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      
             </div>

      <div className="route">
        <Switch>
          <Route exact path="/mediaIndex">
            <Home />
          </Route>
          <Route exact path="/mediaAll">
            <MediaAll />
          </Route>
          <Route exact path="/mediaMine">
            <MediaTable media={props.media} editUpdateMedia={props.editUpdateMedia} token={props.token} updateOn={props.updateOn}/>
          </Route>
          <Route exact path="/userEdit">
            <UserEdit />
          </Route>
          {/* <Route exact path="/userDelete">
            <UserDelete />
          </Route> */}
          </Switch>
      </div>
    </div>
  );
};
export default Sitebar;
