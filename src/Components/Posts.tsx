import React from "react";
import { useEffect } from "react";
import Profile from "./../assets/images/dhoni2.jpg";
import  "./Posts.css";
import * as allActions from "./../Redux/User/ALL/all.actions";
import * as allReducer from "./../Redux/User/ALL/all.reducer";
import * as loginActions from "./../Redux/User/Login/login.actions";
import * as loginReducer from "./../Redux/User/Login/login.reducer";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Spinner from "./Spinner";

interface IProps
{

}
interface IState
{

}

let Posts:React.FC<IProps>=()=>
{
    let dispatch = useDispatch();
    let postsState: allReducer.allState = useSelector((
        state: { all: allReducer.allState }
    ) => {
        return state.all;
    })
    let {loading} = postsState;

    useEffect(()=>
    {
        
        dispatch(allActions.getAllPosts());
        dispatch(allActions.getAllUsers());
        return() => {
            window.location.reload();
        }
       
        
    },[])
    let {images,users} = postsState;
    return(
        <React.Fragment>
           {
               loading ? <Spinner/> :
               images.map((image)=>
               {
                   return(
                    <div className="container" id="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-col-12">
                            <div className="card">
                                <div className="card-header bg-light">
                                    {
                                        users.map((user)=>
                                        {
                                            return(
                                                user.email === image.email ? 
                                                <img src={user.profilePicture} id="#profile" className="mx-4 mt-3" style={{height:"80px",width:"80px",border:"2px solid white",boxShadow:"none"}}></img>:null
                                            )
                                        })
                                    }
                                    <div className="profile">
                                        <span className="h5">{image.name}</span><span className="h6 mx-1">Added Photo</span>
                                        <span className="h6">on 🌎 {image.createdAt.slice(0,10)} {image.createdAt.slice(11,20)}</span>
                                    </div>
                                    <h4 className="mx-4 mt-5 h6">{image.caption}</h4>
                                </div>
                                <div className="card-body bg-light">
                                    <img src={image.image} className="h-100 w-100"></img>
                                </div>
                                <div className="row" >
                                    <div className="col">
                                        <div className="card" >
                                            <div className="card-header bg-light" style={{border:"2px solid black"}}>
                                                <div className="row">
                                                    <div className="col-md-6"><button className="btn btn-sm btn-info mx-5"><i className="fa fa-thumbs-up mx-1"></i><span className="h4 mx-1">Like</span></button></div>
                                                    <div className="col-md-6"><NavLink to={`/connect/comments/${image._id}`} className="btn btn-sm btn-success mx-1"><i className="fa fa-envelope-open mx-1"></i><span className="h4 mx-1">Comments</span></NavLink></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                   )
               })
           } 
        </React.Fragment>
    )
}

export default Posts;