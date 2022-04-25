import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import Login from './Components/Login';
import Otp from './Components/Otp';
import Posts from './Components/Posts';
import Profile from './Components/Profile';
import Search from './Components/Search';
import AddFriend from './Components/AddFriend';
import UpdateProfile from './Components/updateProfile';
import Friends from './Components/Friends';
import Following from './Components/Following';
import Followers from './Components/Followers';
import UserProfile from './Components/UserProfile';
import Chat from './Components/Chat';
import Join from './Components/Join';
import UploadPhoto from './Components/UploadPhoto';
import ChangePassword from './Components/ChangePassword';
import SendOtp from './Components/SendOtp';
import Alerts from './Components/Alerts';
import AddProfilePhoto from './Components/AddProfilePhoto';
import * as allActions from "./Redux/User/ALL/all.actions"
import { useDispatch } from 'react-redux';
import Comments from './Components/Comments';
import Forgot from './Components/Forgot';
import { AuthUtil } from './Util/AuthUtil';

function App() {
 
  return (
  <React.Fragment>
    <Router>
      <Navbar/>
      <Alerts/>
     <div className='container' id="containerMain">
     <h4 className='text-success text-center'>V-Connect is a place where we can connect with the everyone.<br/>Thanks For Choosing</h4>
      
     </div>
      {
        AuthUtil.isLoggedin() ? 
      <switch>
      
        <Route exact path="/connect/posts" component={Posts} />
        <Route exact path="/connect/profile" component={Profile} />
        <Route exact path="/connect/otp" component={Otp} />
        <Route exact path="/connect/search" component={Search} />
        <Route exact path="/connect/addFriend" component={AddFriend} />
        <Route exact path="/connect/updateProfile" component={UpdateProfile} />
        <Route exact path="/connect/uploadPhoto" component={UploadPhoto} />
        <Route exact path="/connect/friends" component={Friends} />
        <Route exact path="/connect/following" component={Following} />
        <Route exact path="/connect/followers" component={Followers} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/connect/join" component={Join} />
        <Route exact path="/connect/changePassword" component={ChangePassword}/>
        <Route exact path="/connect/userProfile/:userId" component={UserProfile} />
        <Route exact path="/connect/comments/:commentId" component={Comments} />
        <Route exact path="/connect/updateProfilePhoto" component={AddProfilePhoto} />
      </switch>:
      <switch>
      <Route exact path="/connect/register" component={Register} />
      <Route exact path="/connect/login" component={Login} />
      <Route exact path="/connect/forgot" component={Forgot} />
      <Route exact path="/connect/sendOtp" component={SendOtp} />
    </switch>
  }
    </Router>
  </React.Fragment>
  );
}

export default App;


