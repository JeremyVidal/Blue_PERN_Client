import React from "react";
import "./header.css"
import banner from "../assets/low_poly_abstract_banner_design_2105.jpg"
import Sitebar from "../site/Navbar";

const Header =(props) =>{
    return (
        <div>
            <nav>

                {/* img source: https://www.vecteezy.com/vector-art/1183293-neutral-low-poly-abstract-banner */}
                <img id="banner" style={{width: "100%"}}src= {banner} alt="banner" />
             {/* <Logout setSessionToken={props.setSessionToken}/> */}
             {/* <Sitebar clearToken={props.clearToken} /> */}
            </nav>
        </div>
    )
}


export default Header;