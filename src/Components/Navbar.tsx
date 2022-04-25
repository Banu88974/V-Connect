import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { AuthUtil } from "../Util/AuthUtil";
import * as logoutActions from "./../Redux/User/Logout/logout.actions"

interface IProps
{

}
interface IState
{

}

let Navbar:React.FC<IProps> = () =>
{
    let dispatch = useDispatch();
    let clickLogout = (history:any) =>
    {
        dispatch(logoutActions.logoutUser());
        window.location.reload();
    }
    let refresh= () => {
        window.location.reload();
    }
    return(
        <React.Fragment>
            <nav className="navbar text-white bg-secondary navbar-expand-sm fixed-top">
                   <div className="container">
                        <NavLink to="/" className="navbar-brand mx-5">
                            <i className="text-white h2">V-Connect</i>
                        </NavLink>
                        {
                           AuthUtil.isLoggedin() ? 
                            <React.Fragment>
                                <div className="collapse navbar-collapse" id="nav-items">
                                <ul className="navbar-nav me-auto">
                                    <li className="nav-item">
                                        <NavLink to="/connect/posts" className="nav-link text-white h6 mt-3 mx-2"><i className="fa fa-home text-white p-1 h4"></i>Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/connect/addFriend" className="nav-link text-white h6 mt-3 mx-2"><i className="fa fa-user-plus text-white p-1 h4"></i>Add Friends</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/connect/friends" className="nav-link text-white h6 mt-3 mx-2"><i className="fa fa-users text-white p-1 h4"></i>Friends</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/connect/search" className="nav-link text-white h6 mt-3 mx-2"><i className="fa fa-search text-white p-1 h4"></i>Search</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/connect/join" className="nav-link text-white h6 mt-3 mx-2 includer"><i className="fa fa-envelope text-white p-1 h4"></i>Chat</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/connect/profile" className="nav-link text-white h6 mt-3 mx-2"><i className="fa fa-user-circle text-white p-1 h4"></i>Profile</NavLink>
                                    </li>
                                </ul>
                            </div>
                            </React.Fragment> : null
                        }
                        
                            <div className="d-flex justify-content-end">
                                
                                <ul className="navbar-nav">
                                    {
                                        AuthUtil.isLoggedin() ?
                                        <React.Fragment>
                                             <li className="nav-item">
                                                <NavLink to="/connect" className="nav-link text-white h6 mt-3 mx-2" onClick={clickLogout}><i className="fa fa-sign-out text-white p-1 h4"></i>Logout</NavLink>
                                            </li>
                                        </React.Fragment>:
                                        <React.Fragment>
                                            <li className="nav-item">
                                                <NavLink to="/connect/login" className="nav-link text-white h6 mt-3 mx-2"><i className="fa fa-sign-in text-white p-1 h4"></i>Login</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to="/connect/register" className="nav-link text-white h6 mt-3 mx-2"><i className="fa fa-user text-white p-1 h4"></i>Register</NavLink>
                                            </li>
                                        </React.Fragment>
                                    }
                                </ul>
                            </div>
                        </div>
            </nav>
        </React.Fragment>
    )

}

export default Navbar;