import * as alertActions from "./../../Alerts/alerts.actions";

export const LOGOUT_USER:string = "LOGOUT_USER";

export const logoutUser = () =>
{
    return async(dispatch:any,history:any) =>
    {
        dispatch({type:LOGOUT_USER});
        dispatch(alertActions.setAlert("Logout Success","success"));
    }
}