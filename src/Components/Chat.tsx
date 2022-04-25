import React, { useState } from "react";
import queryString from "query-string";
import { useEffect } from "react";
import { Socket } from "net";
import { io } from "socket.io-client";
import InfoBar from "./InfoBar";
import Messages from "./Messages";
import Input from "./Input";
import TextContainer from "./TextContainer";
import { NavLink } from "react-router-dom";

let socket;
interface IProps
{

}
let Chat:any = ({location}) =>
{
    const [name,setName] = useState("");
    const [room,setRoom] = useState("");
    const [message,setMessage]=useState("");
    const [messages,setMessages]=useState([]);
    const [users, setUsers] = useState('');
    const ENDPOINT = "127.0.0.1:5000";

    useEffect(()=>
    {
        const  {name, room}:any =queryString.parse(location.search);
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        console.log(socket);
        socket.emit("join",{name,room},()=>
        {
            
        })
        return () =>
        {
            socket.emit("Disconnect");
            socket.off();
        }

    },[ENDPOINT,location.search]);

    useEffect(() => {
        socket.on('message', message => {
          setMessages(messages => [ ...messages, message ]);
        });
        
        socket.on("roomData", ({ users }) => {
          setUsers(users);
        });
    }, []);


    const sendMessage = (event) => {
        event.preventDefault();
    
        if(message) {
          socket.emit("sendMessage", message, () => setMessage(''));
        }
      }
      console.log(message,messages);
      

      return (
        <div className="container" id="container">
        <div className="row mt-3">
            <div className="col-md-10 col-lg-8 col-sm-12 col-xl-8 mx-auto">
                <div className="card-header bg-info text-center">
                <h6>
                <span className="h2 mx-auto">{room}</span>
                </h6>
                </div>
                <div className="card-body btn-outline-primary">
                <Messages messages={messages} name={name}/>
                <input type="text" className="mx-4 my-3 form-control-md" style={{borderRadius:"10px",width:"300px",border:"3px solid grey"}} onChange={(event)=> setMessage(event.target.value)} onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} ></input><button style={{borderRadius:"10px"}} className="btn btn-sm btn-primary my-3" onClick={(e) => sendMessage(e)}>Send</button>
                </div>
            </div>
        </div>
    </div>            
      );
    }

export default Chat;