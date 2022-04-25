import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfilePicture from "./../assets/images/dhoni2.jpg";
import * as loginActions from "./../Redux/User/Login/login.actions";
import * as loginReducer from "./../Redux/User/Login/login.reducer";
import * as allActions from "./../Redux/User/ALL/all.actions";
import * as allReducer from "./../Redux/User/ALL/all.reducer";
import { stringify } from "querystring";
import Spinner from "./Spinner";

interface IProps
{

}
interface IState
{

}

let Followers:React.FC<IProps> = () =>
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


    let followUser = (id:string)=>
    {
        dispatch(allActions.followUser(id));
        window.location.reload();
    }

  let unFollowUser = (id:string)=>
  {
      dispatch(allActions.unFollowUser(id));
      console.log(id);
      window.location.reload();
  }


    useEffect(()=>
    {
        
        dispatch(loginActions.getFollowersInfo());
        dispatch(allActions.getAllUsers());
        return() => {
            window.location.reload();
        }
        
    },[])
    let {following,followers,loading} = followingState;
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
                            followers.length > 0 ?
                            followers.map((followers)=>
                            {
                                return(
                                    <div className="card-body bg-warning">
                                            <div className="row mx-2">
                                                <div className="col-xsm-12 col-xl-10 col-lg-12 col-md-12 col-sm-12 mx-auto">
                                                    <div className="card bg-light">
                                                        {
                                                            users.map((user)=>
                                                            {
                                                                return(
                                                                    user.email == followers.followerEmail ?
                                                                    <React.Fragment>
                                                                        <img src={user.profilePicture} style={{width:"100px",height:"100px",border:"4px solid orange",boxShadow:"none"}} className="mt-3 mx-5"></img>
                                                                        <div className="profile2">
                                                                            <NavLink to={`/connect/userProfile/${user._id}`}><span className="h4">{followers.followerName}</span></NavLink>
                                                                            <h5>{followers.followerEmail}</h5>
                                                                            <h5>{followers.followerMobileNumber}</h5>
                                                                        </div>
                                                                    </React.Fragment>:null
                                                                    )
                                                            })
                                                        }
                                                
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                            )
                            }):<h1 className="text-warning text-center">You Don't have any Followers</h1>
                        }
                    </div>
                </div>
            </div>
        }
        </React.Fragment>
    )
}

export default Followers;