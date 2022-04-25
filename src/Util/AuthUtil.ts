export class AuthUtil
{
    public static isLoggedin():boolean
    {
        if(localStorage.getItem("v-connect"))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    public static getToken():string
    {
        return localStorage.getItem("v-connect");
    }
}