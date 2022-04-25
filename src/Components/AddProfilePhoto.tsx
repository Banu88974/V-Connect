import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./Login.css";
import IUser from "../IModels/IUser";
import ProfilePicture from "./../assets/images/dhoni2.jpg";
import * as loginActions from "./../Redux/User/Login/login.actions";
import * as loginReducer from "./../Redux/User/Login/login.reducer";
import { useDispatch, useSelector } from "react-redux";
import UploadPhoto from "./UploadPhoto";
import { loadavg } from "os";
import Spinner from "./Spinner";

interface IProps
{

}
interface IState
{

}
interface ProfileState
{
    users: IUser
}

let AddProfilePhoto:React.FC<IProps> = () =>
{

    let [usersState,setUsersState] = useState<ProfileState>(
        {
            users:{} as IUser
        }
    )


    let dispatch = useDispatch();
    let updateProfile = async (event: React.ChangeEvent<HTMLInputElement | any>) => {
        let imageFile: Blob = event.target.files[0];
        let base64Image: string | ArrayBuffer = await convertBase64String(imageFile);
        // alert(base64Image);
        setUsersState(
            {
            ...usersState,
            users: {
                ...usersState.users,
                profilePicture: base64Image.toString()
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
    let history = useHistory();
    let onUpload =(event:React.FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();
        dispatch(loginActions.updateProfile(usersState.users,history))
    }

    let updatedUserState: loginReducer.loginState = useSelector((
        state: { login: loginReducer.loginState }
    ) => {
        return state.login;
    })

    let {loading} = updatedUserState;
    return(
        <React.Fragment>
            {
                loading ? <Spinner/> :
                <div className="container" id="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 mx-auto">
                        <div className="card">
                            <div className="card-header bg-dark text-white text-center">
                                <h2>Upload Profile Photo</h2>
                            </div>
                            <div className="card-body bg-warning">
                                <form onSubmit={onUpload}>
                                    <label className="m-3">Choose Photo</label>
                                    <input type="file" style={{display:"block"}} className="form-control btn btn-primary" id="formFile" name="profilePicture" onChange={updateProfile}></input><br/>
                                    <input type="submit" value="Upload" className="btn btn-sm btn-success mx-5"></input>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </React.Fragment>
    )
}

export default AddProfilePhoto;