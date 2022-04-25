import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sendotpActions from "./../Redux/User/SendOtp/sendotp.actions";

interface IProps
{
    
}
interface Email
{
    email:string;
}
interface IState
{
    email:Email;
}

let SendOtp:React.FC<IProps> = () =>
{
    let dispatch = useDispatch();
    let history = useHistory();
    let [emailState,setEmailState] = useState<IState>(
        {
            email:{} as Email
        }
    )

    let updateInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setEmailState(
            {
                ...emailState,
                email:
                {
                    ...emailState.email,
                    [event.target.name] : event.target.value
                }
            }
        )
    }

    let sendOtp = (event:React.FormEvent<HTMLFormElement>)=>
    {
        event.preventDefault();
        dispatch(sendotpActions.registerUser(emailState.email,history));
        console.log(emailState.email)
    }
    return(
        <React.Fragment>
            <div className="container" id="container">
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-lg-6 col-md-9 col-sm-12">
                        <div className="card">
                            <div className="card-header bg-dark text-white text-center">
                                <h2>To Send OTP</h2>
                            </div>
                            <div className="cardbody bg-warning">
                                <h5 className="mt-2 mx-3 text-white">Note:To get OTP to your gmail Allow less Secure Apps Functionality.It will not affect your Security.</h5>
                                <h6 className="mt-3 mx-4">Enter Registered email to get OTP</h6>
                                <form onSubmit={sendOtp}>
                                    <div className="container mt-2">
                                        <input type="text" className="form-control mt-3" onChange={updateInput} name="email" value={emailState.email.email}></input>
                                    </div>
                                   
                                    <div className="container mt-2 mx-5">
                                    <input type="Submit" value="Send OTP" className="btn btn-success btn-sm mt-3 mx-3"></input>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-3"></div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SendOtp;