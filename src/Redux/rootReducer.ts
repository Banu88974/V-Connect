import {combineReducers} from "redux";
import * as registerReducer from "./User/Register/register.reducer";
import * as loginReducer from "./User/Login/login.reducer";
import * as logoutReducer from "./User/Logout/logout.reducer";
import * as sendotpReducer from "./User/SendOtp/sendotp.reducer";
import * as validateotpReducer from "./User/ValidateOTP/validateotp.reducer";
import * as alertReducer from "./Alerts/alerts.reducer";
import * as allReducer from "./User/ALL/all.reducer"
export const rootReducer=combineReducers(
    {
        register:registerReducer.reducer,
        sendotp:sendotpReducer.reducer,
        validateotp:validateotpReducer.reducer,
        login:loginReducer.reducer,
        logout:logoutReducer.reducer,
        alerts:alertReducer.reducer,
        all:allReducer.reducer

    }
)
