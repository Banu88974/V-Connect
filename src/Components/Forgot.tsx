import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

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

let Forgot:React.FC<IProps> = () => {
    return(
        <React.Fragment>
                <div className="container" id="container">
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-lg-6 col-md-9 col-sm-12">
                        <div className="card bg-warning">
                        <h5 className="m-3">Sorry for the trouble,we are working on the Forgot Password Page.You can able to open this page shortly.</h5>
                        </div>
                        </div>
                    <div className="col-3"></div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Forgot;
