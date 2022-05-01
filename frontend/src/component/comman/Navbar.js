import React from "react";
import {Link, NavLink, useParams} from 'react-router-dom';
import { useHistory } from "react-router-dom";

const Navbar = () => {
    let {id} = useParams();
    const history = useHistory();
    id = id ? id : JSON.parse(localStorage.getItem('userId'));

    const handleLogout = () => {
        localStorage.clear()
        history.push("/")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
            <div className="container ">

                <div className="collapse navbar-collapse navbar-expand-md">
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#collapsenavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsenavbar">
                        {localStorage.getItem('userId') && localStorage.getItem('token') && <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" exact to={'/home'}>
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" exact to={`/profile/${id}`}>
                                    Profile
                                </NavLink>
                            </li>
                        </ul>}
                    </div>
                    {!(localStorage.getItem('userId') && localStorage.getItem('token')) && <Link className="btn btn-outline-light" to="/register">Register</Link>}
                    {(localStorage.getItem('userId') && localStorage.getItem('token')) && <Link className="btn btn-outline-light" onClick={handleLogout}>Log Out</Link>}
                </div>
            </div>
        </nav>
    )
}


export default Navbar;