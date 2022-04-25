import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="container sender">
          <div className="text-secondary font-weight-bold mt-2" style={{padding:"3px 0px",borderRadius:"10px"}}>
           {trimmedName.length>30 ? (<React.Fragment><span className="mx-3 h6">{trimmedName}</span><br/></React.Fragment> ) : (<React.Fragment><span className="mx-3 h6">{trimmedName}</span></React.Fragment>)}
          </div>
          <div className="bg-light text-dark" style={{padding:"3px 0px",borderRadius:"10px"}}>
            <span className="mx-5">{ReactEmoji.emojify(text)}</span>
          </div>  
        </div>
        )
        : (
          <div className="container receiver">
              <div className="text-primary font-weight-bold mt-2" style={{borderRadius:"10px",padding:"3px 0px"}}>
                <span className="mx-3 h6">{user}</span>
              </div>
              <div className="bg-light text-dark" style={{borderRadius:"10px",padding:"3px 0px"}}>
                <span className="mx-5">{ReactEmoji.emojify(text)}</span>
              </div>
              
          </div>
        )
  );
}

export default Message;