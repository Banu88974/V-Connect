import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfilePicture from "./../assets/images/dhoni2.jpg";
import * as loginActions from "./../Redux/User/Login/login.actions";
import * as loginReducer from "./../Redux/User/Login/login.reducer";
import * as allActions from "./../Redux/User/ALL/all.actions";
import * as allReducer from "./../Redux/User/ALL/all.reducer";
import Spinner from "./Spinner";

interface IProps
{

}
interface IState
{

}

let Following:React.FC<IProps> = () =>
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
    
   
  let unFollowUser = (id:string)=>
  {
      dispatch(allActions.unFollowUser(id));
      window.location.reload();
  }

    useEffect(()=>
    {
        
        dispatch(loginActions.getFollowingInfo());
        dispatch(allActions.getAllUsers());
        return() => {
            window.location.reload();
        }
    },[])
    let {following,loading} = followingState;
    let {users} = usersState;
  
     
   

    return(
        <React.Fragment>
            {
                loading ? <Spinner/> :
            <div className="container" id="container">
                <div className="row">
                    <div className=" col-xl-10 col-lg-10 col-md-10 col-sm-12 mx-auto">
                        <div className="card-header bg-dark text-white">
                            <div className="container text-center">
                                <NavLink to="/connect/following" className="mx-5 h4 text-success">Following</NavLink>
                                <NavLink to="/connect/followers" className="mx-5 h4 text-warning">Followers</NavLink>
                            </div>
                        </div>
                        {
                            following.length > 0 ?
                            following.map((followings)=>
                            {
                                return(
                                    
                                        <div className="card-body bg-success">
                                            <div className="row mx-2">
                                                <div className="col-xsm-12 col-xl-10 col-lg-12 col-md-12 col-sm-12 mx-auto">
                                                    <div className="card bg-light">
                                                        {
                                                            users.map((user)=>
                                                            {
                                                                return(
                                                                    user.email == followings.followingEmail ?
                                                                    <React.Fragment>
                                                                        <div><img src={user.profilePicture} style={{width:"100px",height:"100px",border:"4px solid orange",boxShadow:"none"}} className="mt-3 mx-5"></img></div>
                                                                        <div className="profile2">
                                                                            <NavLink to={`/connect/userProfile/${user._id}`}><span className="h4">{followings.followingName}</span></NavLink>
                                                                            <h5>{followings.followingEmail}</h5>
                                                                            <h5>{followings.followingMobileNumber}</h5>
                                                                        </div>
                                                                        <div className="follow">
                                                                    <button className="mx-5 btn btn-sm btn-primary" onClick={unFollowUser.bind(this,user._id)}>Unfollow</button>
                                                                    </div>
                                                                    </React.Fragment>
                                                                    :null
                                                                )
                                                            })
                                                        }
                                                       
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                            )
                            }):<h1 className="text-success text-center">You are Not Following AnyOne</h1>
                        }
                    </div>
                </div>
            </div>
        }
        </React.Fragment>
    )
}

export default Following;