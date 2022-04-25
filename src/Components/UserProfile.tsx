import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import ProfilePicture from "./../assets/images/dhoni2.jpg";
import "./Profile.css";
import * as loginActions from "./../Redux/User/Login/login.actions";
import * as allActions from "./../Redux/User/ALL/all.actions";
import * as loginReducer from "./../Redux/User/Login/login.reducer";
import * as allReducer from "./../Redux/User/ALL/all.reducer";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";

interface IProps
{

}
interface IState
{

}

let UserProfile:React.FC<IProps>=()=>
{
    let id:any = useParams();
   let dispatch = useDispatch();
    
   useEffect(()=>
   {
        dispatch(allActions.getUserById(id.userId));
        dispatch(allActions.getFollowersById(id.userId));
        dispatch(allActions.getFollowingById(id.userId));
        dispatch(allActions.getImagesById(id.userId));
        return() => {
            window.location.reload();
        }
   },[])

   let userState: allReducer.allState = useSelector((
    state: { all: allReducer.allState }
) => {
    return state.all;
})

let followState: loginReducer.loginState = useSelector((
    state: { login: loginReducer.loginState }
) => {
    return state.login;
})
let {followers,following,loading} = followState;

let {iuser,ifollowers,ifollowing,iimages} = userState;
console.log(userState.iuser);
 
    return(
        <React.Fragment>
            {
                loading ? <Spinner/> :
            <div className="conatainer" id="container">
            <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-8 col-xsm-8 mx-auto">
                        <div className="card">
                            <div className="card-header text-center bg-light">
                                <img src={iuser.profilePicture} id="#profile" className="mt-5"></img><br></br>
                                <h4 className="mt-3">{iuser.name}</h4>
                                <h4  className="mt-2">Email:{iuser.email}</h4>
                                <h4  className="mt-2">Mobile:{iuser.mobileNumber}</h4>
                                <div className="my-3 mt-4">
                                    <span className="h3 mx-3 text-secondary">Followers</span><span className="h3 mx-3 text-danger">Following</span><br/>
                                    <span className="mx-5 h3">{ifollowers.length}</span><span className="mx-5 h3">{ifollowing.length}</span>
                                </div>
                            </div>
                            <div className="card-body bg-light">
                                <div className="container mx-5">
                                    <div className="row mt-3">
                                    <div className="col-lg-6 mt-3">
                                            <span className="mt-5 mx-3 h3">Date Of Birth:<span>{iuser.dateOfBirth}</span></span>
                                        </div>
                                        <div className="col-lg-6 mt-3">
                                            <span className="mt-5 mx-3 h3">Gender : {iuser.gender}</span>
                                        </div>
                                        <div className="col-lg-6 mt-3">
                                            <span className="mt-5 mx-3 h3">City : {iuser.city}</span>
                                        </div>
                                        <div className="col-lg-6 mt-3">
                                            <span className="mt-5 mx-3 h3">State: {iuser.state}</span>
                                        </div>
                                        <div className="col-lg-6 mt-3">
                                            <span className="mt-5 mx-3 h3">Country :{iuser.country}</span>
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
        iimages.length>0 &&
        iimages.map((image)=>
        {
            return(
            <div className="container mt-5">
            <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 mx-auto">
                <div className="card-header bg-light">
                    <img src={iuser.profilePicture} style={{width:"80px",height:"80px",border:"4px solid orange",boxShadow:"none"}} className="m-2"></img>
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

export default UserProfile;