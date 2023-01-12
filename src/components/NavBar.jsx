import { Link } from "react-router-dom";

import './NavBar.css';

const NavBar = () => {
    return (
        <>
            <nav className="nav-bar sticky">
                <ul>
                    <li className="nav-float-left">
                        <Link id="nav-link-home" to={"/"}><span>Virginia Beach Rentals</span></Link>
                    </li>
                    <li className="nav-center">
                        <ul>
                            <li className="nav-float-left"></li>
                        </ul>
                    </li>
                    <li className="nav-float-right">
                        
                    </li> 
                </ul>    
            </nav>  
            <div className="nav-bar-blank"></div>    
        </>
    );
}

export default NavBar;