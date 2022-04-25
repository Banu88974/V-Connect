import React from 'react';
import { NavLink } from "react-router-dom";
import onlineIcon from './../assets/images/onlineIcon.png';
import closeIcon from './../assets/images/closeIcon.png';

import './InfoBar.css';

const InfoBar = ({ room }) => (

    <div className="container" id="container">
        <div className="row mt-3">
            <div className="col-md-10 col-lg-10 col-sm-12 col-xl-8 mx-auto">
                <div className="card-header bg-info text-center">
                <h6><span  className="mx-2 fa fa-circle" style={{width:"20px",height:"20px",boxShadow:"none",color:"green",borderRadius:"50%"}} ></span>
                <span className="h2 mx-auto">{room}</span></h6>
                <NavLink to="/connect/posts"><i className="fa fa-close"></i></NavLink>
                </div>
                <div className="card-body">
                </div>
            </div>
        </div>
    </div>
);

export default InfoBar;
