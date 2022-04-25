import { type } from "os";
import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Login from "./Login";
import "./Register.css";
import * as loginActions from "./../Redux/User/Login/login.actions";
import * as allActions from "./../Redux/User/ALL/all.actions";
import * as loginReducer from "./../Redux/User/Login/login.reducer";
import * as allReducer from "./../Redux/User/ALL/all.reducer";
import IUser from "../IModels/IUser";
import { useDispatch, useSelector } from "react-redux";
import axios, { AxiosResponse } from "axios";
import * as alertActions from "./../Redux/Alerts/alerts.actions";
import { AuthUtil } from "../Util/AuthUtil";
import { TokenUtil } from "../Util/TokenUtil";

interface IProps
{

}
interface IState
{
    user:IUser;
    isSubmitted: boolean
}

let UpdateProfile:React.FC<IProps> = () =>
{
    let dispatch = useDispatch();
    let history = useHistory();
    let [userState,setUserState] = useState<IState>(
        {
            user:{} as IUser,
            isSubmitted:false
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
    let updatedUserState: loginReducer.loginState = useSelector((
        state: { login: loginReducer.loginState }
    ) => {
        return state.login;
    })
    let {user} = updatedUserState;
  
    
    useEffect(() => {
        if(AuthUtil.isLoggedin()) {
            let token = AuthUtil.getToken();
            TokenUtil.setTokenHeader(token);
            let dataURL: string = `http://127.0.0.1:5000/connect/user/`
            axios.get(dataURL).then((response: AxiosResponse<any>) => {
            setUserState(
                {
                    ...userState,
                    user: response.data
                }
            )
            }).catch((error) => {
            console.error(error.message);

            })
        }
        
    }, [user._id])


    let submitUpdatedUser = (event:React.FormEvent<HTMLFormElement>)=>
    {
        let dataURL = `http://127.0.0.1:5000/connect/user/updateProfile`

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
        dispatch(alertActions.setAlert("Profile Details updated Successfully","success"))
        history.push("/connect/profile");
        

    }
    return(
        <React.Fragment>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-lg-8 col-md-10 col-sm-12">
                        <div className="card">
                            <div className="card-header text-center bg-dark text-white">
                                <h3>Update Profile</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submitUpdatedUser}>
                                    <div className="container">
                                        <input type="text" className="form-control mt-3" placeholder="Enter Updated Name" name="name" value={userState.user.name} onChange={updateInput} />
                                    </div>
                                    <div className="container">
                                        <input type="text" className="form-control mt-3" placeholder="Choose Date of Birth" onFocus={(event)=>
                                        {
                                        event.currentTarget.type = "date";
                                        event.currentTarget.focus();
                                        }
                                        } name="dateOfBirth" value={userState.user.dateOfBirth} onChange={updateInput} ></input>
                                    </div>
                                    <div className="container">
                                        <select className="form-control mt-3" name="gender" value={userState.user.gender} onChange={updateInput}>
                                            <option>----Select Gender----</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Others</option>
                                        </select>
                                    </div>
                                    <div className="container">
                                        <input type="text" className="form-control mt-3" placeholder="Enter City" name="city" value={userState.user.city} onChange={updateInput}></input>
                                    </div>
                                    <div className="container">
                                        <input type="text" className="form-control mt-3" placeholder="Enter State" name="state" value={userState.user.state} onChange={updateInput}></input>
                                    </div>
                                    <div className="container">
                                        <input type="text" className="form-control mt-3" placeholder="Enter Country" name="country" value={userState.user.country} onChange={updateInput}></input>
                                    </div>
                                    <div className="container" id="register">
                                        <input type="submit" className="btn btn-success btn-md form-control-sm mt-3 mx-5" value="Update"></input>
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

export default UpdateProfile;