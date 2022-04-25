import axios from "axios";
import { AuthUtil } from "../../../Util/AuthUtil";
import { TokenUtil } from "../../../Util/TokenUtil";
import * as alertActions from "./../../Alerts/alerts.actions";

export const UPLOAD_POST_REQUEST:string = "UPLOAD_POST_REQUEST";
export const UPLOAD_POST_SUCCESS:string = "UPLOAD_POST_SUCCESS";
export const UPLOAD_POST_FAILURE:string = "UPLOAD_POST_FAILURE";

export const GET_POSTS_REQUEST:string = "GET_POSTS_REQUEST";
export const GET_POSTS_SUCCESS:string = "GET_POSTS_SUCCESS";
export const GET_POSTS_FAILURE:string = "GET_POSTS_FAILURE";

export const GET_ALL_POSTS_REQUEST:string = "GET_ALL_POSTS_REQUEST";
export const GET_ALL_POSTS_SUCCESS:string = "GET_ALL_POSTS_SUCCESS";
export const GET_ALL_POSTS_FAILURE:string = "GET_ALL_POSTS_FAILURE";

export const GET_ALL_USERS_REQUEST:string = "GET_ALL_USERS_REQUEST";
export const GET_ALL_USERS_SUCCESS:string = "GET_ALL_USERS_SUCCESS";
export const GET_ALL_USERS_FAILURE:string = "GET_ALL_USERS_FAILURE";

export const FOLLOW_REQUEST:string = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS:string = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE:string = "FOLLOW_FAILURE";

export const UNFOLLOW_REQUEST:string = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS:string = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE:string = "UNFOLLOW_FAILURE";

export const SEARCH_USER_REQUEST:string = "SEARCH_USER_REQUEST";
export const SEARCH_USER_SUCCESS:string = "SEARCH_USER_SUCCESS";
export const SEARCH_USER_FAILURE:string = "SEARCH_USER_FAILURE";

export const GET_USER_BY_ID_REQUEST:string = "GET_USER_BY_ID_REQUEST";
export const GET_USER_BY_ID_SUCCESS:string = "GET_USER_BY_ID_SUCCESS";
export const GET_USER_BY_ID_FAILURE:string = "GET_USER_BY_ID_FAILURE";

export const GET_FOLLOWERS_BY_ID_REQUEST:string = "GET_FOLLOWERS_BY_ID_REQUEST";
export const GET_FOLLOWERS_BY_ID_SUCCESS:string = "GET_FOLLOWERS_BY_ID_SUCCESS";
export const GET_FOLLOWERS_BY_ID_FAILURE:string = "GET_FOLLOWERS_BY_ID_FAILURE";

export const GET_FOLLOWING_BY_ID_REQUEST:string = "GET_FOLLOWING_BY_ID_REQUEST";
export const GET_FOLLOWING_BY_ID_SUCCESS:string = "GET_FOLLOWING_BY_ID_SUCCESS";
export const GET_FOLLOWING_BY_ID_FAILURE:string = "GET_FOLLOWING_BY_ID_FAILURE";

export const GET_IMAGES_BY_ID_REQUEST:string = "GET_IMAGES_BY_ID_REQUEST";
export const GET_IMAGES_BY_ID_SUCCESS:string = "GET_IMAGES_BY_ID_SUCCESS";
export const GET_IMAGES_BY_ID_FAILURE:string = "GET_IMAGES_BY_ID_FAILURE";

export const UPDATE_USER_REQUEST:string = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS:string = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE:string = "UPDATE_USER_FAILURE";

export const GET_COMMENTS_REQUEST:string = "GET_COMMENTS_REQUEST";
export const GET_COMMENTS_SUCCESS:string = "GET_COMMENTS_SUCCESS";
export const GET_COMMENTS_FAILURE:string = "GET_COMMENTS_FAILURE";

export const POST_COMMENTS_REQUEST:string = "POST_COMMENTS_REQUEST";
export const POST_COMMENTS_SUCCESS:string = "POST_COMMENTS_SUCCESS";
export const POST_COMMENTS_FAILURE:string = "POST_COMMENTS_FAILURE";

export interface IPost
{
    image:string;
    caption:string;
}
export const uploadPosts = (posts:IPost,history:any) =>
{
    return async(dispatch:any) =>
    {
        dispatch({type:UPLOAD_POST_REQUEST});
        try
        {
            if(AuthUtil.isLoggedin())
            {
                let token = AuthUtil.getToken();
                TokenUtil.setTokenHeader(token);
                let dataURL: string = "https://connectv.herokuapp.com/connect/images/upload";
                let response = await axios.post(dataURL,posts);
                dispatch({type:UPLOAD_POST_SUCCESS,payload:response.data});
                history.push("/connect/profile");
                window.location.reload();
            }
    
        }
        catch(error)
        {
            dispatch({type:UPLOAD_POST_FAILURE,payload:error.message});
        }
    }
}

export const getPosts = () =>
{
    return async(dispatch:any) =>
    {
        dispatch({type:GET_POSTS_REQUEST});
        try
        {
            if(AuthUtil.isLoggedin())
            {
                let token = AuthUtil.getToken();
                TokenUtil.setTokenHeader(token);
                let dataURL: string = "https://connectv.herokuapp.com/connect/images/profile";
                let response = await axios.get(dataURL);
                dispatch({type:GET_POSTS_SUCCESS,payload:response.data});
            }
    
        }
        catch(error)
        {
            dispatch({type:GET_POSTS_FAILURE,payload:error.message});
        }
    }
}

export const getAllPosts = () =>
{
    return async(dispatch:any) =>
    {
        dispatch({type:GET_ALL_POSTS_REQUEST});
        try
        {
            if(AuthUtil.isLoggedin())
            {
                let token = AuthUtil.getToken();
                TokenUtil.setTokenHeader(token);
                let dataURL: string = "https://connectv.herokuapp.com/connect/images/";
                let response = await axios.get(dataURL);
                dispatch({type:GET_ALL_POSTS_SUCCESS,payload:response.data});
            }
    
        }
        catch(error)
        {
            dispatch({type:GET_ALL_POSTS_FAILURE,payload:error.message});
        }
    }
}


export const getAllUsers = () =>
{
    return async(dispatch:any) =>
    {
        dispatch({type:GET_ALL_USERS_REQUEST});
        try
        {
            if(AuthUtil.isLoggedin())
            {
                let token = AuthUtil.getToken();
                TokenUtil.setTokenHeader(token);
                let dataURL: string = "https://connectv.herokuapp.com/connect/user/allusers";
                let response = await axios.get(dataURL);
                dispatch({type:GET_ALL_USERS_SUCCESS,payload:response.data});
            }
    
        }
        catch(error)
        {
            dispatch({type:GET_ALL_USERS_FAILURE,payload:error.message});
        }
    }
}

export const followUser = (followId:string) =>
{
    return async(dispatch:any) =>
    {
        dispatch({type:FOLLOW_REQUEST});
        try
        {
            if(AuthUtil.isLoggedin())
            {
                let token = AuthUtil.getToken();
                TokenUtil.setTokenHeader(token);
                let dataURL: string = `https://connectv.herokuapp.com/connect/follow/${followId}`;
                let response = await axios.put(dataURL);
                dispatch({type:FOLLOW_SUCCESS,payload:response.data});
            }
    
        }
        catch(error)
        {
            dispatch({type:FOLLOW_FAILURE,payload:error.message});
        }
    }
}

export const unFollowUser = (followId:string) =>
{
    return async(dispatch:any) =>
    {
        dispatch({type:UNFOLLOW_REQUEST});
        try
        {
            if(AuthUtil.isLoggedin())
            {
                let token = AuthUtil.getToken();
                TokenUtil.setTokenHeader(token);
                let dataURL: string = `https://connectv.herokuapp.com/connect/unfollow/${followId}`;
                let response = await axios.delete(dataURL);
                dispatch({type:UNFOLLOW_SUCCESS,payload:response.data});
            }
    
        }
        catch(error)
        {
            dispatch({type:UNFOLLOW_FAILURE,payload:error.message});
        }
    }
}

export const searchUsers = (user:any) =>
{
    return async(dispatch:any) =>
    {
        dispatch({type:SEARCH_USER_REQUEST});
        try
        {
            if(AuthUtil.isLoggedin())
            {
                let token = AuthUtil.getToken();
                TokenUtil.setTokenHeader(token);
                let dataURL: string = `https://connectv.herokuapp.com/connect/user/search`;
                let response = await axios.post(dataURL,user);
                dispatch({type:SEARCH_USER_SUCCESS,payload:response.data});
            }
        }
        catch(error)
        {
            dispatch({type:SEARCH_USER_FAILURE,payload:error.message});
        }
    }
}


export const getUserById = (userId:any) =>
{
    return async(dispatch:any) =>
    {
        dispatch({type:GET_USER_BY_ID_REQUEST});
        try
        {
            if(AuthUtil.isLoggedin())
            {
                let token = AuthUtil.getToken();
                TokenUtil.setTokenHeader(token);
                let dataURL: string = `https://connectv.herokuapp.com/connect/user/${userId}`;
                let response = await axios.get(dataURL);
                dispatch({type:GET_USER_BY_ID_SUCCESS,payload:response.data});
            }
    
        }
        catch(error)
        {
            dispatch({type:GET_USER_BY_ID_FAILURE,payload:error.message});
        }
    }
}

export const getFollowersById = (userId:any) =>
{
    return async(dispatch:any) =>
    {
        dispatch({type:GET_FOLLOWERS_BY_ID_REQUEST});
        try
        {
            if(AuthUtil.isLoggedin())
            {
                let token = AuthUtil.getToken();
                TokenUtil.setTokenHeader(token);
                let dataURL: string = `https://connectv.herokuapp.com/connect/followers/${userId}`;
                let response = await axios.get(dataURL);
                dispatch({type:GET_FOLLOWERS_BY_ID_SUCCESS,payload:response.data});
            }
    
        }
        catch(error)
        {
            dispatch({type:GET_FOLLOWERS_BY_ID_FAILURE,payload:error.message});
        }
    }
}

export const getFollowingById = (userId:any) =>
{
    return async(dispatch:any) =>
    {
        dispatch({type:GET_FOLLOWING_BY_ID_REQUEST});
        try
        {
            if(AuthUtil.isLoggedin())
            {
                let token = AuthUtil.getToken();
                TokenUtil.setTokenHeader(token);
                let dataURL: string = `https://connectv.herokuapp.com/connect/following/${userId}`;
                let response = await axios.get(dataURL);
                dispatch({type:GET_FOLLOWING_BY_ID_SUCCESS,payload:response.data});
            }
    
        }
        catch(error)
        {
            dispatch({type:GET_FOLLOWING_BY_ID_FAILURE,payload:error.message});
        }
    }
}

export const getImagesById = (userId:any) =>
{
    return async(dispatch:any) =>
    {
        dispatch({type:GET_IMAGES_BY_ID_REQUEST});
        try
        {
            if(AuthUtil.isLoggedin())
            {
                let token = AuthUtil.getToken();
                TokenUtil.setTokenHeader(token);
                let dataURL: string = `https://connectv.herokuapp.com/connect/images/${userId}`;
                let response = await axios.get(dataURL);
                dispatch({type:GET_IMAGES_BY_ID_SUCCESS,payload:response.data});
            }
    
        }
        catch(error)
        {
            dispatch({type:GET_IMAGES_BY_ID_FAILURE,payload:error.message});
        }
    }
}


export const updateUser = (updatedUser:any,history:any) =>
{
    return async(dispatch:any) =>
    {
        dispatch({type:UPDATE_USER_REQUEST});
        try
        {
            if(AuthUtil.isLoggedin())
            {
                let token = AuthUtil.getToken();
                TokenUtil.setTokenHeader(token);
                let dataURL: string = `https://connectv.herokuapp.com/connect/user/updateProfile`;
                let response = await axios.put(dataURL,updatedUser);
                dispatch({type:UPDATE_USER_SUCCESS,payload:response.data});
                dispatch(alertActions.setAlert(response.data.msg,"success"));
                history.push("/connect/profile");
                window.location.reload();
    
            }
    
        }
        catch(error)
        {
            dispatch({type:UPDATE_USER_FAILURE,payload:error.message});
        }
    }
}


export const postComments = (postComments:any,commentId:string) =>
{
    return async(dispatch:any) =>
    {
        dispatch({type:POST_COMMENTS_REQUEST});
        try
        {
            if(AuthUtil.isLoggedin())
            {
                let token = AuthUtil.getToken();
                TokenUtil.setTokenHeader(token);
                let dataURL: string = `https://connectv.herokuapp.com/connect/comments/post/${commentId}`;
                let response = await axios.post(dataURL,postComments);
                dispatch({type:POST_COMMENTS_SUCCESS,payload:response.data});
 
            }
    
        }
        catch(error)
        {
            dispatch({type:POST_COMMENTS_FAILURE,payload:error.message});
        }
    }
}

export const getComments = (commentId:string) =>
{
    return async(dispatch:any,history:any) =>
    {
        dispatch({type:GET_COMMENTS_REQUEST});
        try
        {
            if(AuthUtil.isLoggedin())
            {
                let token = AuthUtil.getToken();
                TokenUtil.setTokenHeader(token);
                let dataURL: string = `https://connectv.herokuapp.com/connect/comments/get/${commentId}`;
                let response = await axios.get(dataURL);
                dispatch({type:GET_COMMENTS_SUCCESS,payload:response.data});
                history.push(`/connect/comments/${commentId}`);
 
            }
    
        }
        catch(error)
        {
            dispatch({type:GET_COMMENTS_FAILURE,payload:error.message});
        }
    }
}
