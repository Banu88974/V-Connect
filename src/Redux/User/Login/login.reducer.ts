import IUser from "../../../IModels/IUser";
import * as loginActions from "./login.actions";

export interface loginState {
    loading: boolean;
    isAuthenticated:boolean;
    user:any;
    followers:any,
    following:any,
    errorMessage: string;
    token:string;
} 
let initialRegister:loginState =
{
    loading:false,
    isAuthenticated:false,
    errorMessage:'',
    user:[] as any[],
    followers:[] as any[],
    following:[] as any[],
    token:''
}

export const reducer =(state:loginState=initialRegister,action:any):loginState =>
{
    let {payload,type} =action;
    switch(type){
        case loginActions.LOGIN_REQUEST :
            return{
                ...state,
                loading:true
            }
 
        case loginActions.LOGIN_SUCCESS :
           localStorage.setItem('v-connect',payload.token);
            return{
                ...state, 
                loading:false,
                isAuthenticated:true,
                token:payload.token
            }
        
        case loginActions.LOGIN_FAILURE :
            localStorage.removeItem("v-connect")
            return{
                ...state,
                loading:false,
                token:"",
                isAuthenticated:false,
                errorMessage:payload
            }
        case loginActions.GET_USERINFO_REQUEST:
            return{
                ...state,
                loading:true
            }
        case loginActions.GET_USERINFO_SUCCESS:
            return{
                ...state,
                loading:false,
                user:payload
            }
        case loginActions.GET_USERINFO_FAILURE:
                return{
                    ...state,
                    loading:false,
                    errorMessage:payload
                }
                case loginActions.UPDATE_PROFILE_REQUEST:
                    return{
                        ...state,
                        loading:true
                    }
                case loginActions.UPDATE_PROFILE_SUCCESS:
                    return{
                        ...state,
                        loading:false,
                        user:action.payload
                    }
                case loginActions.UPDATE_PROFILE_FAILURE:
                        return{
                            ...state,
                            loading:true,
                            errorMessage:payload
                        }
                        case loginActions.GET_FOLLOWERS_REQUEST:
                            return{
                                ...state,
                                loading:true
                            }
                        case loginActions.GET_FOLLOWERS_SUCCESS:
                            return{
                                ...state,
                                loading:false,
                                followers:state.followers.concat(action.payload)
                            }
                        case loginActions.GET_FOLLOWERS_FAILURE:
                                return{
                                    ...state,
                                    loading:false,
                                    errorMessage:payload
                                }
                          case loginActions.GET_FOLLOWERS_REQUEST:
                            return{
                                ...state,
                                loading:true
                            }
                        case loginActions.GET_FOLLOWERS_SUCCESS:
                            return{
                                ...state,
                                loading:false,
                                followers:state.followers.concat(action.payload)
                            }
                        case loginActions.GET_FOLLOWERS_FAILURE:
                                return{
                                    ...state,
                                    loading:false,
                                    errorMessage:payload
                                }

                        case loginActions.GET_FOLLOWING_REQUEST:
                                    return{
                                        ...state,
                                        loading:true
                                    }
                        case loginActions.GET_FOLLOWING_SUCCESS:
                                    return{
                                        ...state,
                                        loading:false,
                                        following:state.following.concat(action.payload)
                                    }
                        case loginActions.GET_FOLLOWING_FAILURE:
                                        return{
                                            ...state,
                                            loading:false,
                                            errorMessage:payload
                                        }

        default: return state
    }
}