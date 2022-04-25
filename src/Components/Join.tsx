import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";


interface IProps
{

}
let Join:React.FC<IProps> = () =>
{

    const[name,setName] = useState("");
    const [room,setRoom] = useState(""); 
    return(
        <React.Fragment>
            <div className="container" id="container">
                <div className="row">
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-10 mx-auto">
                        <div className="card-header bg-dark text-white text-center">
                            <h1>Join</h1>
                        </div>
                        <div className="card-body bg-info">
                        <h6 className=" h5 text-white m-3">Note : Please type room name which is known to both users.Or use room name as User1+User2 or User2+User1 (i.e. SenderName+Receivername or ReceiverName+SenderName).Example BanuNithish or NithishBanu.</h6>
                            <div>
                                <input type="text" placeholder="Name" onChange={(event)=> setName(event.target.value)} className="mt-3 form-control"/>
                            </div>
                            <div>
                                <input type="text" placeholder="Room" onChange={(event)=> setRoom(event.target.value)} className="mt-3 form-control"/>
                            </div>
                            <Link onClick={event => (!name || !room) ? event.preventDefault(): null} to={`/chat?name=${name}&room=${room}`} className="btn btn-sm btn-danger mt-4"> Sign In</Link>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Join;