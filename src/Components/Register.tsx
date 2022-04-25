import { type } from "os";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import IUser from "../IModels/IUser";
import Login from "./Login";
import Otp from "./Otp";
import "./Register.css";
import * as registerActions from "./../Redux/User/Register/register.actions";
import * as registerReducer from "./../Redux/User/Register/register.reducer";
import { stringify } from "query-string";

interface IProps
{

}
interface IState
{
    user:IUser;
}
interface IShowPassword
{
    showPassword:boolean,
    initialPassword:string,
    
}

interface IUserError
{
    nameError:string;
    emailError:string;
    mobileNumberError:string;
    passwordError:string;
    dateOfBirthError:string;
}

let Register:React.FC<IProps> = () =>
{
    let [passwordState,setpasswordState] = useState<IShowPassword>(
        {
            
            showPassword:false,
            initialPassword:""
        }
    )
   
    let [userErrorState,setUserErrorState] = useState<IUserError>(
        {
            nameError:"",
            emailError:"",
            mobileNumberError:"",
            passwordError:"",
            dateOfBirthError:""
        }
    )
    let [userState,setUserState] = useState<IState>(
        {
            user:{} as IUser
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

    let validateName = (event:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    {
        setUserState(
            {
                ...userState,
                user: {
                    ...userState.user,
                    [event.target.name] : event.target.value
                }
            }
        )
        let regEx = /^[A-Z]{1}[A-Za-z0-9 ]{5,34}$/;
        if(!regEx.test(userState.user.name))
        {
            setUserErrorState(
                {
                    ...userErrorState,
                    nameError:"Enter a UserName which starts with Capital letter and min-length is 6 and max-length is 35"
                }
            )
        }
        else
        {
            setUserErrorState(
                {
                    ...userErrorState,
                    nameError:""
                }
            )
        }
    }

    let validateEmail = (event:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    {
        setUserState(
            {
                ...userState,
                user: {
                    ...userState.user,
                    [event.target.name] : event.target.value
                }
            }
        )
        let regEx =  /^[a-z0-9A-Z_.]{3,25}@[a-zA-Z0-9_.]{2,10}.[a-z]{2,3}$/;
        if(!regEx.test(userState.user.email))
        {
            setUserErrorState(
                {
                    ...userErrorState,
                    emailError:"Enter a Valid Email"
                }
            )
        }
        else
        {
            setUserErrorState(
                {
                    ...userErrorState,
                    emailError:""
                }
            )
        }
    }
   
    let validateMobileNumber = (event:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    {
        setUserState(
            {
                ...userState,
                user: {
                    ...userState.user,
                    [event.target.name] : event.target.value
                }
            }
        )
        let regEx =   /^[1-9]{1}[0-9]{8}$/;
        if(!regEx.test(userState.user.mobileNumber))
        {
            setUserErrorState(
                {
                    ...userErrorState,
                    mobileNumberError:"Enter Valid Mobile Number"
                }
            )
        }
        else
        {
            setUserErrorState(
                {
                    ...userErrorState,
                    mobileNumberError:""
                }
            )
        }
    }
    let validateDateOfBirth = (event:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    {
        setUserState(
            {
                ...userState,
                user: {
                    ...userState.user,
                    [event.target.name] : event.target.value
                }
            }
        )
        
        let CurrentDate = new Date();
        let date = CurrentDate.getDate();
        let month = CurrentDate.getMonth();
        let year = CurrentDate.getFullYear();
        let birthDate = `${year}-${month}-${date}`;
   
        if(userState.user.dateOfBirth > birthDate )
        {
            setUserErrorState(
                {
                    ...userErrorState,
                    dateOfBirthError:"Enter Date before today's Date"
                }
            )
        }
        else
        {
            setUserErrorState(
                {
                    ...userErrorState,
                    dateOfBirthError:""
                }
            )
        }
    }

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

    
    let dispatch = useDispatch();
    let history = useHistory();
  
    let registerState:registerReducer.registerState = useSelector((state:{register:registerReducer.registerState})=>
    {
        return state.register
    })



   
    let submitUser = (event:React.FormEvent<HTMLFormElement>)=>
    {
        event.preventDefault();
        dispatch(registerActions.registerUser(userState.user,history));
        if(passwordState.initialPassword !== userState.user.password)
        {
            alert("Enter Password and Confirm Password does not match")
        }
    }


    
        
        
    return(
        
            
        <React.Fragment>
            <div className="container" id="container">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-lg-8 col-md-10 col-sm-12">
                        <div className="card">
                            <div className="card-header text-center bg-dark text-white">
                                <h3>Register to V-Connect</h3>
                            </div>
                            <div className="card-body bg-light">
                                <form onSubmit={submitUser}>
                                    <div className="container">
                                        <input type="text" className={`form-control ${userErrorState.nameError.length>0?'is-invalid':null} mt-3 `} placeholder="Enter Your Name" name="name"  onChange={validateName} value={userState.user.name} required={true}></input><span className="text-danger h3">*</span>
                                        {
                                            userErrorState.nameError.length>0 ? <span className="text-danger my-2">{userErrorState.nameError}</span>:null
                                        }
                                    </div>
                                    <div className="container mt-1">
                                        <input type="email" className={`form-control ${userErrorState.emailError.length>0?'is-invalid':null} mt-3 `}  placeholder="Enter email address" name="email" onChange={validateEmail} value={userState.user.email} required={true}></input><span className="text-danger h3">*</span>
                                        {
                                            userErrorState.emailError.length>0 ? <span className="text-danger mt-2">{userErrorState.emailError}</span>:null
                                        }
                                    </div>
                                    <div className="container mt-1">
                                        <input type="text" className={`form-control ${userErrorState.mobileNumberError.length>0?'is-invalid':null} mt-3 `}  placeholder="Enter Mobile Number" name="mobileNumber" onChange={validateMobileNumber} value={userState.user.mobileNumber} required={true}></input><span className="text-danger h3">*</span>
                                        {
                                            userErrorState.mobileNumberError.length>0 ? <span className="text-danger mt-2">{userErrorState.mobileNumberError}</span>:null
                                        }
                                    </div>
                                    <div className="container input-group mt-1">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text bg-white" style={{border:"5px solid green"}}>
                                                <i className="fa fa-eye-slash bg-white" onClick={show} style={{fontSize:"15px"}}></i>
                                            </div>
                                        </div>
                                        <input type={passwordState.showPassword ? "text" : "password"} placeholder="Create Password"  className="form-control form-group bg-white"  onChange={handleChange} value={passwordState.initialPassword} name="initialPassword" required={true}></input><br/>    
                                    </div>
                                    <span className="text-danger mx-4 h3">*</span>
                                    <div className="container input-group mt-1">
                                    <div className="input-group-prepend " >
                                        <div className="input-group-text bg-white" style={{border:"5px solid green"}}>
                                            <i className="fa fa-eye-slash bg-white" onClick={show} style={{fontSize:"15px"}}></i>
                                        </div>
                                        </div>
                                        <input type={passwordState.showPassword ? "text" : "password"}  placeholder="Confirm Password" value={userState.user.password} name="password" className="form-control form-group bg-white" required={true} onChange={handleChange}></input>
                                        
                                    </div>
                                    <span className="text-danger mx-4 h3">*</span>
                                    <div className="container mt-1">
                                        <input type="text" className={`form-control ${userErrorState.dateOfBirthError.length>0?'is-invalid':null} mt-3 `}  placeholder="Choose Date of Birth" onFocus={(event)=>
                                        {
                                        event.currentTarget.type = "date";
                                        event.currentTarget.focus();
                                        }
                                        } name="dateOfBirth" onChange={validateDateOfBirth} value={userState.user.dateOfBirth} required={true}></input>
                                        {
                                            userErrorState.dateOfBirthError.length>0 ? <span className="text-danger mt-2">{userErrorState.dateOfBirthError}</span>:null
                                        }
                                    </div>
                                    <div className="container mt-1">
                                    <span className="text-danger h3">*</span>
                                        <select className="form-control" name="gender" onChange={updateInput} value={userState.user.gender} required={true}>
                                            <option value="null">----Select Gender----</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="others">Others</option>
                                        </select>
                                    </div>
                                    <div className="container">
                                    <span className="text-danger h3">*</span>
                                        <input type="text" className="form-control" placeholder="Enter City" name="city" onChange={updateInput} value={userState.user.city} required={true}></input>
                                    </div>
                                    <div className="container">
                                    <span className="text-danger h3">*</span>
                                        <input type="text" className="form-control" placeholder="Enter State" name="state" onChange={updateInput} value={userState.user.state} required={true}></input>
                                    </div>
                                    <div className="container">
                                    <span className="text-danger h3">*</span>
                                        <input type="text" className="form-control" placeholder="Enter Country" name="country" onChange={updateInput} value={userState.user.country} required={true}></input>
                                        <span className="text-danger h3">*</span>
                                    </div>
                                    <div className="container">
                                        <input type="checkbox" className=" mx-2"></input><span className="mx-1">I Accept All Terms & Conditions</span>
                                    </div>
                                    <div className="container" id="register">
                                        <input type="submit" className="btn btn-success btn-md form-control-sm mt-3 mx-5" value="Register"></input>
                                    </div>
                                    <div className="container" id="login">
                                        <span>Already have an Account </span><NavLink to="/connect/login" className="mx-2 btn btn-sm btn-primary">Login</NavLink>
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

export default Register;