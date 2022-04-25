import React from "react";
import { NavLink } from "react-router-dom";
interface IProps
{

}
interface IState
{

}

let Friends:React.FC<IProps> = () =>
{
    return(
        <React.Fragment>
            <div className="container" id="container">
                <div className="row">
                    <div className=" col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto">
                        <div className="card-header text-light bg-dark">
                            <div className="container">
                                <NavLink to="/connect/following" className="mx-5 h4 text-success">Following</NavLink>
                                <NavLink to="/connect/followers" className="mx-5 h4 text-warning">Followers</NavLink>
                            </div>
                        </div>
        
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Friends;