import IUser from "../../../IModels/IUser";
import * as sendotpActions from "./sendotp.actions";

interface Email
{
    email:string;
}
export interface otpState {
    loading: boolean;
    email:Email[];
    errorMessage: string;
}

let initialRegister:otpState =
{
    loading:false,
    email:[] as Email[],
    errorMessage:''
}



export const reducer =(state:otpState=initialRegister,action:any) =>
{
    switch(action.type){
        case sendotpActions.SENDOTP_REQUEST :
            return{
                ...state,
                loading:true
            }

        case sendotpActions.SENDOTP_SUCCESS :
            return{
                ...state,
                loading:false,
                email:state.email.concat(action.payload)
            }
        
        case sendotpActions.SENDOTP_FAILURE :
            return{
                ...state,
                loading:false,
                errorMessage:action.payload
            }
        default: return state
    }
}