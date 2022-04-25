import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Otp.css";
import * as validateotpActions from "./../Redux/User/ValidateOTP/validateotp.actions"
interface IProps
{
   
}
interface OTP
{
    otp:number;
}
interface IState
{
    otp:OTP
}

let Otp:React.FC<IProps> = () =>
{
    let dispatch = useDispatch();
    let history = useHistory();
    let [otpState,setOtpState] = useState<IState>(
        {
            otp:{} as OTP
        }
    )

    let updateInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setOtpState(
            {
                ...otpState,
                otp:
                {
                    ...otpState.otp,
                    [event.target.name] : event.target.value
                }
            }
        )
    }

    let validateOtp = (event:React.FormEvent<HTMLFormElement>)=>
    {
        event.preventDefault();
        dispatch(validateotpActions.registerUser(otpState.otp,history));
        console.log(otpState.otp)
        
    }
    return(
        <React.Fragment>
            <div className="container" id="container">
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-lg-6 col-md-9 col-sm-12">
                        <div className="card">
                            <div className="card-header bg-dark text-white text-center">
                                <h2>Enter OTP</h2>
                            </div>
                            <div className="cardbody bg-warning">
                                <h4 className="mx-1">Note: If You don't Receive OTP.No Problem Just Login After Registering without Verifying OTP</h4>
                                <h6 className="mt-3 mx-4">OTP has sent to the registered email</h6>
                                <form onSubmit={validateOtp}>
                                   
                                    <div className="container mt-2">
                                        <input type="number" placeholder="Enter OTP" className="form-control mt-3" value={otpState.otp.otp} name="otp" onChange={updateInput}></input>
                                    </div>
                                    <div className="container mt-2 mx-5">
                                    <input type="Submit" value="Verify OTP" className="btn btn-success btn-sm mt-3 mx-3"></input>
                                    </div>
                                </form>
                            <div className="container" id="resend">
                                <button className="btn btn-danger btn-sm">Resend OTP</button>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3"></div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Otp;