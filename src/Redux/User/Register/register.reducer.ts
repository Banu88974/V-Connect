import IUser from "../../../IModels/IUser";
import * as registerActions from "./register.actions";

export interface registerState {
    loading: boolean;
    user:IUser[];
    errorMessage: string;
}

let initialRegister:registerState =
{
    loading:false,
    user:[] as IUser[],
    errorMessage:''
}

export const reducer =(state:registerState=initialRegister,action:any) =>
{
    switch(action.type){
        case registerActions.REGISTER_REQUEST :
            return{
                ...state,
                loading:true
            }

        case registerActions.REGISTER_SUCCESS :
            return{
                ...state,
                loading:false,
                user:state.user.concat(action.payload)
            }
        
        case registerActions.REGISTER_FAILURE :
            return{
                ...state,
                loading:false,
                errorMessage:action.payload
            }
        default: return state
    }
}