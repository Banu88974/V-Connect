import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import IUser from "../IModels/IUser";
import ProfilePicture from "./../assets/images/dhoni2.jpg";
import "./AddFriend.css";
import * as loginActions from "./../Redux/User/Login/login.actions";
import * as loginReducer from "./../Redux/User/Login/login.reducer";
import { useEffect } from "react";
import * as allActions from "./../Redux/User/ALL/all.actions";
import * as allReducer from "./../Redux/User/ALL/all.reducer";
import Spinner from "./Spinner";

interface IProps
{

}
interface IState
{

}



let AddFriend:React.FC<IProps> = () =>
{
  let dispatch = useDispatch();


  let usersState: allReducer.allState = useSelector((
    state: { all: allReducer.allState }
) => {
    return state.all;
})
    let followingState:loginReducer.loginState = useSelector((
        state : {login : loginReducer.loginState}
    )=>
    {
        return state.login;
    })

  useEffect(()=>
  {
    dispatch(allActions.getAllUsers());
    dispatch(loginActions.getFollowingInfo());
    dispatch(loginActions.getUserInfo());
    return() => {
        window.location.reload();
    }
  },[])

  let followUser = (id:string)=>
  {
      dispatch(allActions.followUser(id));
      window.location.reload();
  }

  let {users,loading} = usersState;
  let {following} = followingState;
  let loggedinUser = followingState.user;
    return(
        <React.Fragment>
            <div className="container" id="container">
            {
                loading ? <Spinner/> :
                users.map((user)=>
                {
                    return( 
                            loggedinUser.email === user.email ? null :
                            following.length > 0 ?
                            following.map((followings)=>
                            {
                                return(
                                    followings.followingEmail === user.email ? null:
                                <div className="row my-3">
                                    <div className="col-xl-6 col-lg-8 col-md-10 col-sm-12 mx-auto">
                                        <div className="card bg-light">
                                            <img src={user.profilePicture} style={{width:"100px",height:"100px",marginBottom:"50px",border:"4px solid orange",boxShadow:"none"}} className="mt-2 mx-5"></img>
                                            <div className="profilef">
                                                <NavLink to="/connect/userProfile"><span className="h4">{user.name}</span></NavLink>
                                                <h5>{user.email}</h5>
                                                <h5>{user.mobileNumber}</h5>
                                            </div>
                                            <div className="follow">
                                                <button className="mx-5 btn btn-sm btn-primary" onClick={followUser.bind(this,user._id)}>Follow</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                             
                                )
                            }) : <div className="container mt-4">
                            <div className="row my-3">
                                <div className="col-xl-6 col-lg-8 col-md-10 col-sm-12 mx-auto">
                                    <div className="card bg-light">
                                        <img src={user.profilePicture} style={{width:"100px",height:"100px",marginBottom:"50px",border:"4px solid orange",boxShadow:"none"}} className="mt-2 mx-5"></img>
                                        <div className="profilef">
                                            <NavLink to={`/connect/userProfile/${user._id}`}><span className="h4">{user.name}</span></NavLink>
                                            <h5>{user.email}</h5>
                                            <h5>{user.mobileNumber}</h5>
                                        </div>
                                        <div className="follow">
                                            <button className="mx-5 btn btn-sm btn-success" onClick={followUser.bind(this,user._id)}>Follow</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                      
                        )
                    })
                  
            }
            </div>
        </React.Fragment>
    )
}

export default AddFriend;