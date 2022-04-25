import { type } from "os";
import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Login from "./Login";
import "./Register.css";
import * as loginActions from "./../Redux/User/Login/login.actions";
import * as allActions from "./../Redux/User/ALL/all.actions";
import * as loginReducer from "./../Redux/User/Login/login.reducer";
import * as allReducer from "./../Redux/User/ALL/all.reducer";
import { useDispatch, useSelector } from "react-redux";
import IUser from "../IModels/IUser";
import axios, { AxiosResponse } from "axios";
import * as alertActions from "./../Redux/Alerts/alerts.actions"
import Spinner from "./Spinner";

interface IProps
{

}
interface IShowPassword
{
    showPassword:boolean,
    initialPassword:string,
    
}
interface IState
{
    user:IUser;
    isSubmitted: boolean
}

let ChangePassword:React.FC<IProps> = () =>
{
    let [passwordState,setpasswordState] = useState<IShowPassword>(
        {
            
            showPassword:false,
            initialPassword:""
        }
    )
    let dispatch = useDispatch();
    let history = useHistory();
    let [userState,setUserState] = useState<IState>(
        {
            user:{} as IUser,
            isSubmitted:false
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
                [event.target.name] : event.target.value
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

    let updatedUserState: loginReducer.loginState = useSelector((
        state: { login: loginReducer.loginState }
    ) => {
        return state.login;
    })
    let {user,loading} = updatedUserState;
  
    
    useEffect(() => {
        let dataURL: string = `http://127.0.0.1:5000/connect/user/`

        axios.get(dataURL).then((response: AxiosResponse<any>) => {
            setUserState(
                {
                    ...userState,
                    user: response.data,
                }
            )
        }).catch((error) => {
            console.error(error.message);

        })
    }, [user._id])

    

    let submitUpdatedUser = (event:React.FormEvent<HTMLFormElement>)=>
    {
        let dataURL = `http://127.0.0.1:5000/connect/user/changePassword`

        axios.put(dataURL,userState.user)
            .then((response: AxiosResponse<any>) => {
                setUserState(
                    {
                        ...userState,
                        isSubmitted: true
                    }
                )
            })
            .catch((error) => {
                console.error(error);
            });
            if(passwordState.initialPassword !== userState.user.password)
            {
                alert("Enter Password and Confirm Password does not match")
            }
            else
            {
                dispatch(alertActions.setAlert("Password changed Successfully","success"));
                history.push("/connect/profile");
                window.location.reload();
                
            }
    }

    return(
        <React.Fragment>
            { 
            loading ? <Spinner/> :
            <div className="container" id="container">
                <div className="row">
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-8 mx-auto">
                        <div className="card">
                            <div className="card-header text-center bg-dark text-white">
                                <h3>Change Password</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submitUpdatedUser}>
                                <div className="container input-group mt-3">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text bg-white" style={{border:"5px solid green"}}>
                                                <i className="fa fa-eye-slash bg-white" onClick={show} style={{fontSize:"15px"}}></i>
                                            </div>
                                        </div>
                                        <input type={passwordState.showPassword ? "text" : "password"} placeholder="Create Password"  className="form-control form-group bg-white"  onChange={handleChange} value={passwordState.initialPassword} name="initialPassword" required={true}></input><br/>    
                                    </div>
                                    <div className="container input-group mt-3">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text bg-white" style={{border:"5px solid green"}}>
                                                <i className="fa fa-eye-slash bg-white" onClick={show} style={{fontSize:"15px"}}></i>
                                            </div>
                                        </div>
                                        <input type={passwordState.showPassword ? "text" : "password"}  placeholder="Confirm Password" value={userState.user.password} name="password" className="form-control form-group bg-white" required={true} onChange={handleChange}></input>
                                    </div>
                                    <div className="container">
                                        <input type="submit" className="btn btn-success btn-md mt-3" value="Change"></input>
                                    </div>   
                                </form>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </React.Fragment>
    )
}

export default ChangePassword;