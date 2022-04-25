import IUser from "../../../IModels/IUser";
import * as logoutActions from "./logout.actions";
export interface logoutState {
    loading: boolean;
    isAuthenticated:boolean;
    errorMessage: string;
    token:string;
} 
let initialRegister:logoutState =
{
    loading:false,
    isAuthenticated:false,
    errorMessage:'',
    token:''
}

export const reducer =(state:logoutState=initialRegister,action:any)=>
{
    let {type} =action;
    switch(type){
        case logoutActions.LOGOUT_USER :
           localStorage.removeItem("v-connect")
            return{
                ...state,
                loading:false,
                isAuthenticated:false
            }
 
        
        default: return state
    }
}