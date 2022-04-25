import IUser from "../../../IModels/IUser";
import * as validateotpActions from "./validateotp.actions";

interface OTP
{
   otp:number
}
export interface otpState {
    loading: boolean;
    otp:OTP[],
    errorMessage: string;
}

let initialRegister:otpState =
{
    loading:false,
    otp:[] as OTP[],
    errorMessage:''
}



export const reducer =(state:otpState=initialRegister,action:any) =>
{
    switch(action.type){
        case validateotpActions.VALIDATEOTP_REQUEST :
            return{
                ...state,
                loading:true
            }

        case validateotpActions.VALIDATEOTP_SUCCESS :
            return{
                ...state,
                loading:false,
                otp:state.otp.concat(action.payload)
            }
        
        case validateotpActions.VALIDATEOTP_FAILURE :
            return{
                ...state,
                loading:false,
                errorMessage:action.payload
            }
        default: return state
    }
}