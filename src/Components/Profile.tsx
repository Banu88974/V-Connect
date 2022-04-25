import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import ProfilePicture from "./../assets/images/dhoni2.jpg";
import "./Profile.css";
import * as loginActions from "./../Redux/User/Login/login.actions";
import * as allActions from "./../Redux/User/ALL/all.actions";
import * as loginReducer from "./../Redux/User/Login/login.reducer";
import * as allReducer from "./../Redux/User/ALL/all.reducer";
import { useDispatch, useSelector } from "react-redux";
import IUser from "../IModels/IUser";
import Spinner from "./Spinner";

interface IProps
{

}
interface IState
{

}

let Profile:React.FC<IProps>=()=>
{
    

    let dispatch =useDispatch();
    let userState: loginReducer.loginState = useSelector((
        state: { login: loginReducer.loginState }
    ) => {
        return state.login;
    })
    let {user,followers,following,loading} = userState;

    let postsState: allReducer.allState = useSelector((
        state: { all: allReducer.allState }
    ) => {
        return state.all;
    })

    useEffect(()=>
    {
        dispatch(loginActions.getUserInfo());
        dispatch(loginActions.getFollowersInfo());
        dispatch(loginActions.getFollowingInfo());
        dispatch(allActions.getPosts());
        return() => {
            window.location.reload();
        }
},[])




    return(
        
        <React.Fragment>
            {
                loading ? <Spinner/> :
            <div className="conatainer" id="container">
                <div className="row">
                    <div className="col-lg-6 col-md-8 col-sm-8 mx-auto">
                        <div className="card">
                            <div className="card-header text-center bg-light">
                                <img src={user.profilePicture} id="#profile" className="mt-5"></img><br></br>
                                <div className="mt-3">
                                <NavLink to="/connect/updateProfilePhoto" className="btn-sm btn-primary mt-3">Change</NavLink>
                                </div>
                                <h5 className="mt-3">{user.name}</h5>
                                <h6  className="mt-2">Email: {user.email}</h6>
                                <h6  className="mt-2">Mobile: {user.mobileNumber}</h6>
                                <div className="my-3 mt-4">
                                    <span className="h3 mx-3 text-secondary">Followers</span><span className="h3 mx-3 text-danger">Following</span><br/>
                                    <span className="mx-5 h3">{followers.length}</span><span className="mx-5 h3">{following.length}</span>
                                </div>
                                <NavLink to="/connect/uploadPhoto" className="btn btn-success btn-sm text-white">Upload Photo</NavLink>
                            </div>
                            <div className="card-body bg-light">
                                <div className="container mx-5">
                                    <div className="mx-2 m-2">
                                        <NavLink to="/connect/updateProfile" className="btn btn-sm btn-primary">Edit Profile</NavLink>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-lg-6 mt-3">
                                            <span className="mt-5 mx-3 h4">Date Of Birth : <span>{user.dateOfBirth}</span></span>
                                        </div>
                                        <div className="col-lg-6 mt-3">
                                            <span className="mt-5 mx-3 h4">Gender : {user.gender}</span>
                                        </div>
                                        <div className="col-lg-6 mt-3">
                                            <span className="mt-5 mx-3 h4">City : {user.city}</span>
                                        </div>
                                        <div className="col-lg-6 mt-3">
                                            <span className="mt-5 mx-3 h4">State: {user.state}</span>
                                        </div>
                                        <div className="col-lg-6 mt-3">
                                            <span className="mt-5 mx-3 h4">Country : {user.country}</span>
                                        </div>
                                        <div className="div mt-3 mx-2">
                                            <div className="input-group">
                                                <NavLink to="/connect/changePassword" className="btn btn-sm btn-danger mt-3" style={{borderRadius:"10px"}}>Change Password</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    }
    {/* UPLOADED IMAGES */}

    {
        loading ? <Spinner/> :
        postsState.images.length>0 &&
        postsState.images.map((image)=>
        {
            return(
            <div className="container mt-5">
            <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 mx-auto">
                <div className="card-header bg-light">
                    <img src={user.profilePicture} style={{width:"80px",height:"80px",border:"4px solid orange",boxShadow:"none"}} className="m-2"></img>
                    <div className="profile1">
                        <span className="h6">{image.name}</span><span className="h6 mx-1"> Added Photo</span>
                        <span className="h6">on 🌎 {image.createdAt.slice(0,10)} {image.createdAt.slice(11,20)}</span>
                    </div>
                    <span className="mx-4 mt-5 h6">{image.caption}</span>
                </div>
                <div className="card-body bg-light">
                    <img src={image.image} className="h-100 w-100" style={{border:"none",boxShadow:"none"}}></img>
                </div>
            </div>
            </div>
            </div>
            )
        })
    }
        </React.Fragment>
    )
}

export default Profile;