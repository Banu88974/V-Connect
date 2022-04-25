import IUser from "../../../IModels/IUser";
import * as allActions from "./all.actions";


export interface IPost
{
    image:string;
    caption:string;
}
export interface Posts
{
    posts:IPost
}
export interface allState {
    loading: boolean;
    posts:IPost[];
    users:IUser[];
    search:IUser[];
    images:any;
    iuser:any;
    ifollowers:any[];
    ifollowing:any[];
    iimages:any[];
    responses:string;
    updatedUser:any[];
    unresponses:string;
    postComments:any[];
    getComments:any[];
    errorMessage: string;
}

let initialRegister:allState =
{
    loading:false,
    posts:[] as IPost[],
    users:[] as IUser[],
    search:[] as IUser[],
    images:[] as any[],
    iuser:{},
    ifollowers:[],
    ifollowing:[],
    iimages:[],
    responses:'',
    updatedUser:[] as any[],
    unresponses:'',
    postComments:[] as any[],
    getComments:[] as any[],
    errorMessage:''
}

export const reducer =(state:allState=initialRegister,action:any) =>
{
    switch(action.type){
        case allActions.UPLOAD_POST_FAILURE :
            return{
                ...state,
                loading:true
            }

        case allActions.UPLOAD_POST_SUCCESS :
            return{
                ...state,
                loading:false,
                posts:state.posts.concat(action.payload)
            }
        
        case allActions.UPLOAD_POST_FAILURE :
            return{
                ...state,
                loading:false,
                errorMessage:action.payload
            }
        case allActions.UPLOAD_POST_FAILURE :
            return{
                ...state,
                loading:true
            }

        case allActions.UPLOAD_POST_SUCCESS :
            return{
                ...state,
                loading:false,
                posts:state.posts.concat(action.payload)
            }
        
        case allActions.UPLOAD_POST_FAILURE :
            return{
                ...state,
                loading:false,
                errorMessage:action.payload
            }
        case allActions.GET_POSTS_REQUEST :
                return{
                    ...state,
                    loading:true
                }
    
        case allActions.GET_POSTS_SUCCESS :
                return{
                    ...state,
                    loading:false,
                    images:action.payload
                }
            
        case allActions.GET_POSTS_FAILURE :
                return{
                    ...state,
                    loading:false,
                    errorMessage:action.payload
                }
        case allActions.GET_ALL_POSTS_REQUEST :
                return{
                    ...state,
                    loading:true
                }
    
        case allActions.GET_ALL_POSTS_SUCCESS :
                return{
                    ...state,
                    loading:false,
                    images:action.payload
                }
            
        case allActions.GET_ALL_POSTS_FAILURE :
                return{
                    ...state,
                    loading:false,
                    errorMessage:action.payload
                }
                case allActions.GET_ALL_USERS_REQUEST :
                    return{
                        ...state,
                        loading:true
                    }
        
            case allActions.GET_ALL_USERS_SUCCESS :
                    return{
                        ...state,
                        loading:false,
                        users:action.payload
                    }
                
            case allActions.GET_ALL_USERS_FAILURE :
                    return{
                        ...state,
                        loading:false,
                        errorMessage:action.payload
                    }
                case allActions.FOLLOW_REQUEST :
                        return{
                            ...state,
                            loading:true
                        }
            
                case allActions.FOLLOW_SUCCESS :
                        return{
                            ...state,
                            loading:false,
                            responses:action.payload
                        }
                    
                case allActions.FOLLOW_FAILURE :
                        return{
                            ...state,
                            loading:false,
                            errorMessage:action.payload
                        }

                        case allActions.UNFOLLOW_REQUEST :
                            return{
                                ...state,
                                loading:true
                            }
                
                    case allActions.UNFOLLOW_SUCCESS :
                            return{
                                ...state,
                                loading:false,
                                unresponses:action.payload
                            }
                        
                    case allActions.UNFOLLOW_FAILURE :
                            return{
                                ...state,
                                loading:false,
                                errorMessage:action.payload
                            }

                    case allActions.SEARCH_USER_REQUEST:
                            return{
                                ...state,
                                loading:true
                            }
                            
                    case allActions.SEARCH_USER_SUCCESS :
                            return{
                                ...state,
                                loading:false,
                                search:action.payload
                            }
                        
                    case allActions.SEARCH_USER_FAILURE :
                            return{
                                ...state,
                                loading:false,
                                errorMessage:action.payload
                            }
                    case allActions.GET_USER_BY_ID_REQUEST:
                                return{
                                    ...state,
                                    loading:true
                                }
                    
                    case allActions.GET_USER_BY_ID_SUCCESS :
                                return{
                                    ...state,
                                    loading:false,
                                    iuser:action.payload
                                }
                            
                    case allActions.GET_USER_BY_ID_FAILURE :
                                return{
                                    ...state,
                                    loading:false,
                                    errorMessage:action.payload
                                }

                    case allActions.GET_FOLLOWERS_BY_ID_REQUEST:
                                return{
                                    ...state,
                                    loading:true
                                }
                    
                    case allActions.GET_FOLLOWERS_BY_ID_SUCCESS :
                                return{
                                    ...state,
                                    loading:false,
                                    ifollowers:action.payload
                                }
                            
                    case allActions.GET_FOLLOWERS_BY_ID_FAILURE :
                                return{
                                    ...state,
                                    loading:false,
                                    errorMessage:action.payload
                                }
                        case allActions.GET_FOLLOWING_BY_ID_REQUEST:
                                    return{
                                        ...state,
                                        loading:true
                                    }
                        
                            case allActions.GET_FOLLOWING_BY_ID_SUCCESS :
                                    return{
                                        ...state,
                                        loading:false,
                                        ifollowing:action.payload
                                    }
                                
                            case allActions.GET_FOLLOWING_BY_ID_FAILURE :
                                    return{
                                        ...state,
                                        loading:false,
                                        errorMessage:action.payload
                                    }
                                    case allActions.GET_IMAGES_BY_ID_REQUEST:
                                        return{
                                            ...state,
                                            loading:true
                                        }
                            
                                case allActions.GET_IMAGES_BY_ID_SUCCESS :
                                        return{
                                            ...state,
                                            loading:false,
                                            iimages:action.payload
                                        }
                                    
                                case allActions.GET_IMAGES_BY_ID_FAILURE :
                                        return{
                                            ...state,
                                            loading:false,
                                            errorMessage:action.payload
                                        }

                                    case allActions.UPDATE_USER_REQUEST:
                                            return{
                                                ...state,
                                                loading:true
                                            }
                                            
                                    case allActions.UPDATE_USER_SUCCESS :
                                            return{
                                                ...state,
                                                loading:false,
                                                updatedUser:state.updatedUser.concat(action.payload)
                                            }
                                        
                                    case allActions.UPDATE_USER_FAILURE :
                                            return{
                                                ...state,
                                                loading:false,
                                                errorMessage:action.payload
                                            }

                                        case allActions.POST_COMMENTS_REQUEST:
                                                return{
                                                    ...state,
                                                    loading:true
                                                }
                                                
                                        case allActions.POST_COMMENTS_SUCCESS :
                                                return{
                                                    ...state,
                                                    loading:false,
                                                    postComments:state.postComments.concat(action.payload)
                                                }
                                            
                                        case allActions.POST_COMMENTS_FAILURE :
                                                return{
                                                    ...state,
                                                    loading:false,
                                                    errorMessage:action.payload
                                                }
                                            
                                            case allActions.GET_COMMENTS_REQUEST:
                                                    return{
                                                        ...state,
                                                        loading:true
                                                    }
                                                    
                                            case allActions.GET_COMMENTS_SUCCESS :
                                                    return{
                                                        ...state,
                                                        loading:false,
                                                        getComments:action.payload
                                                    }
                                                
                                            case allActions.GET_COMMENTS_FAILURE :
                                                    return{
                                                        ...state,
                                                        loading:false,
                                                        errorMessage:action.payload
                                                    }
                    default: return state
    }
}