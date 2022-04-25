import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useState } from "react";
import "./Login.css"
import { useDispatch } from "react-redux";
import * as loginActions from "./../Redux/User/Login/login.actions";

interface IProps
{

}
interface User
{
    email:string;
    password:string;
}
interface IState
{
    user:User
}
interface IShowPassword
{
    showPassword:boolean,   
}


let Login:React.FC<IProps> = () =>
{
    let [userState,setUserState] = useState<IState>(
        {
            user:{} as User
        }
    )
    let updateInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setUserState(
            {
                ...userState,
                user: {
                    ...userState.user,
                    [event.target.name] : event.target.value
                }
            }
        )
    }

    let [passwordState,setpasswordState] = useState<IShowPassword>(
        {
            
            showPassword:false
        }
    )
    let show = (event:any) =>
    {
    setpasswordState(
        {
            ...passwordState,
            showPassword: !passwordState.showPassword
        }
    )
}
let handleChange = (event:React.ChangeEvent<HTMLInputElement>)=>
{
    setpasswordState(
        {
            ...passwordState,
        }
    )
     
    setUserState(
        {
            ...userState,
            user: {
                ...userState.user,
                [event.target.name] : event.target.value
            }
        }
    )

}
    let dispatch = useDispatch();
    let history = useHistory();
  

    let submitUser = (event:React.FormEvent<HTMLFormElement>)=>
    {
        event.preventDefault();
        dispatch(loginActions.loginUser(userState.user,history));
    }

    
    return(
        <React.Fragment>
            <div className="container" id="container">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-lg-8 col-md-10 col-sm-12">
                        <div className="card">
                            <div className="card-header bg-dark text-white text-center">
                                <h2>Login</h2>
                            </div>
                            <div className="card-body bg-warning">
                                <form onSubmit={submitUser}>
                                <div className="container mt-4">
                                    <input type="text" className="form-control mt-4" placeholder="Enter Email/MobileNumber" name="email" onChange={updateInput} value={userState.user.email} required={true}></input>
                                </div>
                                <div className="container input-group mt-4" >
                                    <div className="input-group-prepend">
                                        <div className="input-group-text bg-white" style={{border:"5px solid green"}}>
                                            <i className="fa fa-eye-slash bg-white" onClick={show} style={{fontSize:"15px"}}></i>
                                        </div>
                                    </div>
                                    <input type={passwordState.showPassword ? "text" : "password"}  placeholder="Confirm Password" value={userState.user.password} name="password" className="form-control form-group bg-white" required={true} onChange={handleChange}></input>        
                                </div>
                                <div className="container">
                                    <input type="submit" value="login" className="btn btn-md btn-danger my-4 mx-3"></input>
                                </div>
                                <div className="container" id="forgot">
                                    <NavLink to="/connect/forgot">Forgot Password!</NavLink>
                                </div>
                                <div className="container mt-4 mx-4">
                                    <span className="mt-4">Don't have an Account?</span><NavLink to="/connect/register" className="mt-4 mx-3 text-decoration-underline">Register</NavLink>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login;