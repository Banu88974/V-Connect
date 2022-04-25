import React from 'react';

import onlineIcon from './../assets/images/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    {
      users
        ? (
          <div>
            <h1>People currently chatting:</h1>
            <div className="">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="">
                    {name}
                    <img alt="Online Icon" src={onlineIcon} style={{width:"20px",height:"20px"}}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;