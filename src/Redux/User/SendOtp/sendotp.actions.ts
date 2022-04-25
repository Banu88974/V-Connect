import axios from "axios";
import * as alertActions from "./../../Alerts/alerts.actions"

interface Email
{
    email:String
}
export const SENDOTP_REQUEST:string = "SENDOTP_REQUEST";
export const SENDOTP_SUCCESS:string = "SENDOTP_SUCCESS";
export const SENDOTP_FAILURE:string = "SENDOTP_FAILURE";

export const registerUser = (email:Email,history:any) => {
    return async(dispatch:any) =>
    {
        try
        {
            dispatch({type:SENDOTP_REQUEST});
            let dataURL: string = "https://connectv.herokuapp.com/connect/otp/sendOTP";
            let response = await axios.post(dataURL,email)
            dispatch({ type: SENDOTP_SUCCESS, payload: response.data });
         
            if(response.data.msg !== "Entered Email does not match Registerd Email")
            {
                history.push("/connect/Otp");
            }
            else {
                dispatch(alertActions.setAlert(response.data.msg,"Danger"));
            }
        }
        catch(error)
        {
            dispatch({ type: SENDOTP_FAILURE, payload: error.message })
        }
    }

}
