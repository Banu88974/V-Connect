import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./Login.css";
import * as allActions from "./../Redux/User/ALL/all.actions"

interface IProps
{

}
interface IState
{

}
export interface Post
{
    image:string;
    caption:string;
}
interface IPost
{
    posts:Post
}

let UploadPhoto:React.FC<IProps> = () =>
{

    
    let [postsState,setPostsState] = useState<IPost>(
        {
            posts:{} as Post
        }
    )


    let dispatch = useDispatch();
    let uploadPost = async (event: React.ChangeEvent<HTMLInputElement | any>) => {
        let imageFile: Blob = event.target.files[0];
        let base64Image: string | ArrayBuffer = await convertBase64String(imageFile);
        // alert(base64Image);
        setPostsState(
            {
            ...postsState,
            posts: {
                ...postsState.posts,
                image: base64Image.toString()
            }
        });
    };

    let convertBase64String = (imageFile: Blob): Promise<string | ArrayBuffer> => {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.addEventListener('load', () => {
                if (fileReader.result) {
                    resolve(fileReader.result);
                }
                else {
                    reject('Error Occurred');
                }
            })
        });
    };

    let updateInput = (event:React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        setPostsState(
            {
                ...postsState,
            posts:
            {
                ...postsState.posts,
                [event.target.name]:event.target.value
            }
            }
            
        )
    }

    let history = useHistory();
    let onUpload =(event:React.FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();
        dispatch(allActions.uploadPosts(postsState.posts,history))
    }
    
    return(
        <React.Fragment>
            <div className="container" id="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 mx-auto">
                        <div className="card">
                            <div className="card-header bg-dark text-white text-center">
                                <h2>Upload Photo</h2>
                            </div>
                            <div className="card-body bg-warning">
                                <form onSubmit={onUpload}>
                                <label className="m-3">Choose Photo</label>
                                    <input type="file" style={{display:"block"}} className="form-control btn btn-primary" id="formFile" name="image" onChange={uploadPost}></input><br/>
                                    <label>Add Caption:</label><br/>
                                    <textarea rows={2} cols={30} className="mt-3" style={{border:"5px solid lightblue"}} value={postsState.posts.caption} name="caption" onChange={updateInput}></textarea><br/>
                                    <input type="submit" value="Upload" className="btn btn-sm btn-success mx-5"></input>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default UploadPhoto;