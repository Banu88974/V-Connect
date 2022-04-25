import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ProfilePicture from "./../assets/images/dhoni2.jpg";
import "./Search.css";
import * as loginActions from "./../Redux/User/Login/login.actions";
import * as loginReducer from "./../Redux/User/Login/login.reducer";
import { useEffect } from "react";
import * as allActions from "./../Redux/User/ALL/all.actions";
import * as allReducer from "./../Redux/User/ALL/all.reducer";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";

interface IProps
{

}
interface IState
{
    user:string
}
interface IUsers
{
    users:IState
}

let Search:React.FC<IProps> = () =>
{
    let dispatch = useDispatch();
    let [usersState,setUsersState] = useState<IUsers>(
        {
        users:{} as IState
        }
    )
    let searchUpdate = (event:React.ChangeEvent<HTMLInputElement>)=>
    {
        setUsersState(
            {
                ...usersState,
                users:
                {
                    ...usersState.users,
                    [event.target.name] : event.target.value
                }
            }
        )
        dispatch(allActions.searchUsers(usersState.users));
        dispatch(loginActions.getUserInfo());
    }
  

    let userState: allReducer.allState = useSelector((
      state: { all: allReducer.allState }
  ) => {
      return state.all;
  })

      
let {search,loading} = userState;

    return(
        <React.Fragment>
            {
                loading ? <Spinner/> :
                <React.Fragment>
                    <div className="container" id="container">
                <div className="row my-3">
                    <div className="col-md-10 mx-auto">
                        <span className="h5">There might be some bad user experience while searching.Please execuse us.Our team is working to make it better.Click on Textfield after enetering each and every character</span><br/>
                        <i className="fa fa-search mx-3 mt-2"></i><input type="text" className="form-control-md" placeholder="    Search User by Name" style={{outline:"none",border:"3px solid green",borderRadius:"20px",width:"300px",height:"40px"}} value={usersState.users.user} name="user" onChange={searchUpdate} />
                    </div>
                </div>
                {
                    search.length >= 1 ? search.map((searched)=>
                    {
                        return(
                            <div className="row my-3">
                             <div className="col-xsm-12 col-xl-6 col-lg-8 col-md-10 col-sm-12 mx-auto">
                                <div className="card bg-light">
                                <img src={searched.profilePicture} style={{width:"100px",height:"100px",border:"4px solid orange",boxShadow:"none"}} className="mt-2 mx-5"></img>
                                <div className="profile2">
                                    <NavLink to={`/connect/userProfile/${searched._id}`}><span className="h4">{searched.name}</span></NavLink>
                                <h5>{searched.email}</h5>
                                <h5>{searched.mobileNumber}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                        )
                    }) : null
                }    
            </div>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default Search;