import React from "react";
import { useSelector } from "react-redux";
import * as alertReducer from "./../Redux/Alerts/alerts.reducer" 

interface IProps
{

} 
interface IState
{

}
   

let Alerts:React.FC<IProps> = () =>
{
    let alertState:alertReducer.AlertState = useSelector(
        (state:{alerts:alertReducer.AlertState})=>
        {
            return state.alerts;
        }
    )
    let {alerts} = alertState;


    return(
        <React.Fragment>
           <div className="container mx-5">
           {
                alerts.length > 0 && 
                <div className={`alert alert-${alerts[0].color} m-3 alert-dismissable animated slideIn fixed-top`}>
                    <button className="btn-close"></button>
                    {
                        alerts.length>0 ?
                        alerts.map((alert)=>
                        {
                            return(
                                <h4>{alert.message}</h4>
                            )
                        }):null
                    }
                </div>
            }
           </div>
        </React.Fragment>
    )
}
 export default Alerts;