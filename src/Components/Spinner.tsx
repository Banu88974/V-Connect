import React from 'react';
import spinnerImage from './../assets/images/spinner.gif';
interface IProps {

}
interface IState {

}

let Spinner: React.FC<IProps> = () => {
   return (
      <React.Fragment>
         <div>
             <img src={spinnerImage} alt="" className='m-auto d-block mt-5' height="100px;"/>
         </div>
      </React.Fragment>
   )
}

export default Spinner;