import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as allActions from "./../Redux/User/ALL/all.actions";
import * as allReducer from "./../Redux/User/ALL/all.reducer";
import * as loginActions from "./../Redux/User/Login/login.actions";
import * as loginReducer from "./../Redux/User/Login/login.reducer";
import Spinner from "./Spinner";
interface IProps
{

}
interface IComment
{
    comments:string;
}
interface IState
{
    comment:IComment;
}

let Comments:React.FC<IProps> =()=>
{

    let id:any = useParams();
    let [commentState,setCommentState] = useState<IState>(
        {
            comment:{} as IComment
        }
    )

    let updateComment = (event:React.ChangeEvent<HTMLInputElement>) =>
    {
        setCommentState(
            {
                ...commentState,
                comment:
                {
                    ...commentState.comment,
                    [event.target.name] : event.target.value
                }
            }
        )
        
    }
    
    let dispatch = useDispatch();
    let commentsState: allReducer.allState = useSelector((
        state: { all: allReducer.allState }
    ) => {
        return state.all;
    })
     let {getComments,loading} = commentsState;


    useEffect(()=>
    {  
        dispatch(allActions.getComments(id.commentId));

        return() => {
            window.location.reload();
        }
    },[])

    let history = useHistory();
    let onComment = (event:React.FormEvent<HTMLFormElement>) =>
    {
        dispatch(allActions.postComments(commentState.comment,id.commentId)); 
        window.location.reload();
    }

    return(
        <React.Fragment>
            {
                loading ? <Spinner/> :
                getComments.length > 0 ?
                        <div className="container" id="container">
                        <div className="row">
                            <div className="col-md-10 mx-auto">
                                <div className="card">
                                    <div className="card-header bg-primary text-white text-center">
                                        <h1>Comments</h1>
                                    </div>
                                    <div className="card-body bg-light">

                                           {
                                               getComments.map((comments)=>
                                               {
                                                   return(
                                                    <div className="bg-white mx-3 my-3" style={{width:"300px",borderRadius:"10px"}}>
                                                        <span className="h5 mx-3 text-primary" style={{ display:"inline-block",marginTop:"10px"}}>{comments.sName}  : -</span><br/>
                                                        <h6 className="h5 mb-2 mx-4">{comments.comments}</h6>
                                                        <h6 className="mx-2">{comments.createdAt.slice(0,10)} {comments.createdAt.slice(11,20)}</h6>
                                                    </div>
                                                   )
                                               })
                                           }
                                        <form className="bg-light" onSubmit={onComment}>
                                            <input type="text" placeholder="Comment Here...." name="comments" value={commentState.comment.comments} onChange={updateComment} className="form-control-lg mx-3 my-3" style={{width:"350px"}}></input><input type="submit" value="Post" className="mt-1 btn btn-success btn-md" style={{borderRadius:"10px"}}></input>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div> :  
                <form className="bg-light" onSubmit={onComment}>
                    <h3 className="text-success container">No Comments yet,be the First One to Comment this Post</h3>
                    <input type="text" placeholder="Comment Here...." name="comments" value={commentState.comment.comments} onChange={updateComment} className="form-control-lg mx-3 my-3" style={{width:"350px"}}></input><input type="submit" value="Post" className="mt-1 btn btn-success btn-md" style={{borderRadius:"10px"}}></input>
                </form>
                }
        </React.Fragment>
    )
}

export default Comments;