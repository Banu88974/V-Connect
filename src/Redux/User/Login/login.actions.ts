import axios from "axios";
import * as alertActions from "./../../Alerts/alerts.actions"
import dotenv from "dotenv"
import { AuthUtil } from "../../../Util/AuthUtil";
import { TokenUtil } from "../../../Util/TokenUtil";
import IUser from "../../../IModels/IUser";
import * as allActions from "./../ALL/all.actions";
interface User
{
    email:string;
    password:string;
}

export const LOGIN_REQUEST:string = "LOGIN_REQUEST";
export const LOGIN_SUCCESS:string = "LOGIN_SUCCESS";
export const LOGIN_FAILURE:string = "LOGIN_FAILURE";

export const GET_USERINFO_REQUEST:string = "GET_USERINFO_REQUEST";
export const GET_USERINFO_SUCCESS:string = "GET_USERINFO_SUCCESS";
export const GET_USERINFO_FAILURE:string = "GET_USERINFO_FAILURE";

export const UPDATE_PROFILE_REQUEST:string = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS:string = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILURE:string = "UPDATE_PROFILE_FAILURE";

export const GET_FOLLOWERS_REQUEST:string = "GET_FOLLOWERS_REQUEST";
export const GET_FOLLOWERS_SUCCESS:string = "GET_FOLLOWERS_SUCCESS";
export const GET_FOLLOWERS_FAILURE:string = "GET_FOLLOWERS_FAILURE";

export const GET_FOLLOWING_REQUEST:string = "GET_FOLLOWING_REQUEST";
export const GET_FOLLOWING_SUCCESS:string = "GET_FOLLOWING_SUCCESS";
export const GET_FOLLOWING_FAILURE:string = "GET_FOLLOWING_FAILURE";




export const loginUser = (user:User,history:any) => {
    return async(dispatch:any) =>
    {
        dispatch({type:LOGIN_REQUEST});
        try
        {
            let dataURL: string = "http://127.0.0.1:5000/connect/user/login";
            let response = await axios.post(dataURL,user);
            if(response.status == 200) {
                dispatch({ type: LOGIN_SUCCESS, payload: response.data});
                dispatch(getUserInfo());
                dispatch(allActions.getAllPosts());
                dispatch(allActions.getPosts());
                dispatch(getFollowersInfo());
                dispatch(getFollowingInfo());
                dispatch(alertActions.setAlert(response.data.msg,"success"));
                history.push("/connect/");
                window.location.reload();
            } else {
                dispatch({ type: LOGIN_SUCCESS,payload: response.data})
                dispatch(alertActions.setAlert(response.data.msg,"danger"));
            }

        }
        catch(error)
        {
            dispatch({ type: LOGIN_FAILURE, payload: error.message});
            
        }
    }

}

export const getUserInfo = () =>
{
    return async(dispatch:any) =>
    {
        dispatch({type:GET_USERINFO_REQUEST});
        try
        {
            if(AuthUtil.isLoggedin())
            {
                let token = AuthUtil.getToken();
                TokenUtil.setTokenHeader(token);
                let dataURL: string = "http://127.0.0.1:5000/connect/user/";
                let response = await axios.get(dataURL);
                dispatch({type:GET_USERINFO_SUCCESS,payload:response.data});    
            }
        }
        catch(error)
        {
            dispatch({type:GET_USERINFO_REQUEST,payload:error.message});
        }
    }
}

export const updateProfile = (user:IUser,history:any) =>
{
    return async(dispatch:any) =>
    {
        dispatch({type:UPDATE_PROFILE_REQUEST});
        try
        {
            if(AuthUtil.isLoggedin())
            {
                let token = AuthUtil.getToken();
                TokenUtil.setTokenHeader(token);
                let dataURL: string = "http://127.0.0.1:5000/connect/user/updateProfilePhoto";
                let response = await axios.put(dataURL,user);
                if(response.status == 200) {
                    dispatch({type:UPDATE_PROFILE_SUCCESS,payload:response.data});
                    history.push("/connect/profile");
                    dispatch(alertActions.setAlert(response.data.msg,"success"));
                    window.location.reload();
                } else {
                    dispatch(alertActions.setAlert(response.data.msg,"danger"));
                }  
            }
        }
        catch(error)
        {
            dispatch({type:UPDATE_PROFILE_FAILURE,payload:error.message});
        }
    }
}

export const getFollowersInfo = () =>
{
    return async(dispatch:any) =>
    {
        dispatch({type:GET_FOLLOWERS_REQUEST});
        try
        {
            if(AuthUtil.isLoggedin())
            {
                let token = AuthUtil.getToken();
                TokenUtil.setTokenHeader(token);
                let dataURL: string = "http://127.0.0.1:5000/connect/followers/";
                let response = await axios.get(dataURL);
                dispatch({type:GET_FOLLOWERS_SUCCESS,payload:response.data});
            }
        }
        catch(error)
        {
            dispatch({type:GET_FOLLOWERS_FAILURE,payload:error.message});
        }
    }
}
export const getFollowingInfo = () =>
{
    return async(dispatch:any) =>
    {
        dispatch({type:GET_FOLLOWING_REQUEST});
        try
        {
            if(AuthUtil.isLoggedin())
            {
                let token = AuthUtil.getToken();
                TokenUtil.setTokenHeader(token);
                let dataURL: string = "http://127.0.0.1:5000/connect/following/";
                let response = await axios.get(dataURL);
                dispatch({type:GET_FOLLOWING_SUCCESS,payload:response.data});    
            }
        }
        catch(error)
        {
            dispatch({type:GET_FOLLOWING_FAILURE,payload:error.message});
        }
    }
}