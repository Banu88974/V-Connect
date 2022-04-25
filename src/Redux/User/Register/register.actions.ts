import axios from "axios";
import IUser from "../../../IModels/IUser";
import * as alertActions from "./../../Alerts/alerts.actions"

export const REGISTER_REQUEST:string = "REGISTER_REQUEST";
export const REGISTER_SUCCESS:string = "REGISTER_SUCCESS";
export const REGISTER_FAILURE:string = "REGISTER_FAILURE";

export const registerUser = (user:IUser,history:any) => {
    return async(dispatch:any) =>
    {
        dispatch({type:REGISTER_REQUEST});
        try
        {
            let dataURL: string = "http://127.0.0.1:5000/connect/user/register";
            let response = await axios.post(dataURL,user)
            dispatch({ type: REGISTER_SUCCESS, payload: response.data });
            dispatch(alertActions.setAlert(response.data.msg,"success"));
            if(response.data.msg !== "MobileNumber and Email Already Exists" && response.data.msg !== "MobileNumber Already Exists" && response.data.msg !== "Email Already Exists")
            {
                history.push("/connect/sendOtp");
                //window.location.reload();
            } else {
                dispatch(alertActions.setAlert(response.data.msg,"danger"));
            }
        }
        catch(error)
        {
            dispatch({ type: REGISTER_FAILURE, payload: error.message })
        }
    }

}
