import React, {useState, useEffect}from "react";
import { Route, Link, Switch } from "react-router-dom";
// import Home from "./Home";
import MediaTable from "../media/MediaTable";
// import MediaIndex from "../media/MediaIndex";
import MediaCreate from "../media/MediaCreate";
// import MediaActions from "../media/MediaActions";
import MediaAll from "../media/MediaAll";
import UserEdit from "../auth/UserEdit";
import "./Navbar.css";
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
	const [deleteId, setDeleteId] = useState('');

	const toggle = () => {
		let newIsOpen = !isOpen;
		setIsOpen(newIsOpen);
	};

  return (
    <div className="sidebar">
      <div className="mainNav">
      <Navbar color="black" light expand="md">
        <NavbarBrand style={{color: "white"}}>
         <h3>My Media Collection</h3>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="nav-fill w-100" >
				<NavItem>
					<Button className="nav_buttons" ><Link className="nav_links" to="/mediacreate">Add Media</Link></Button>
				</NavItem>
				<NavItem>
					<Button className="nav_buttons" color="secondary"><Link className="nav_links" to="/mediaAll">View All Media</Link></Button>
				</NavItem>
				<NavItem>
					<Button className="nav_buttons" color="secondary"><Link className="nav_links" to="/mediaMine">View My Media</Link></Button>
				</NavItem>
				<NavItem>
					<Button className="nav_buttons" color="secondary"><Link className="nav_links" to="/userEdit">User Edit</Link></Button>
				</NavItem>
				<NavItem>
					<Button className="nav_buttons" color="secondary" onClick={props.clearToken}><Link className="nav_links" to="">Logout</Link></Button>
				</NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      
    	</div>

      <div className="route">
        <Switch>
          <Route exact path="/mediacreate">
            <MediaCreate setMedia={props.setMedia} />
          </Route>
          <Route exact path="/mediaAll">
            <MediaAll />
          </Route>
          <Route exact path="/mediaMine">
            <MediaTable
              media={props.media}
              editUpdateMedia={props.editUpdateMedia}
              token={props.token}
              updateOn={props.updateOn}
              updateActive={props.updateActive}
              mediaToUpdate={props.mediaToUpdate}
			  updateOff={props.updateOff}
            />
          </Route>
          <Route exact path="/userEdit">
            <UserEdit token={props.token} />
          </Route>
        </Switch>

      </div>
    </div>
  );
};
export default Sitebar;


