export interface IUser
{
    _id ?:string;
    name:string;
    email:string;
    password:string;
    mobileNumber:string;
    gender:string;
    dateOfBirth:string;
    city:string;
    state:string;
    country:string;
    profilePicture:string;
}

export default IUser;