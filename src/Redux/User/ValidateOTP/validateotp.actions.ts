import axios from "axios";
import * as alertActions from "./../../Alerts/alerts.actions"

interface OTP
{
    otp:number
}
export const VALIDATEOTP_REQUEST:string = "VALIDATEOTP_REQUEST";
export const VALIDATEOTP_SUCCESS:string = "VALIDATEOTP_SUCCESS";
export const VALIDATEOTP_FAILURE:string = "VALIDATEOTP_FAILURE";

export const registerUser = (otp:OTP,history:any) => {
    return async(dispatch:any) =>
    {
        try
        {
            dispatch({type:VALIDATEOTP_REQUEST});
            let dataURL: string = "https://connectv.herokuapp.com/connect/otp/validateOTP";
            let response = await axios.post(dataURL,otp)
            dispatch({ type: VALIDATEOTP_SUCCESS, payload: response.data });
            if(response.data.msg !== "otp was incorrect")
            {
                history.push("/connect/login");
                window.location.reload();
            }
            else {
                dispatch(alertActions.setAlert(response.data.msg,"danger"));
            }
        }
        catch(error)
        {
            dispatch({ type: VALIDATEOTP_FAILURE, payload: error.message })
        }
    }

}
