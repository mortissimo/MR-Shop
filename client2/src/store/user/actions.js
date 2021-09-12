import actionType from './actionType'
import axios from '../../apis/axios'

export const setLoggedIn = () =>{
    return{
        type: actionType.SET_LOGIN,
    }
}

export const setLoggedOff = () =>{
    return {
        type: actionType.SET_LOGOFF,
    }
}

export const setUsers = (data) =>{
    return {
        type: actionType.SET_ALLUSER,
        payload: data
    }
}

export const fetchUsers = () =>{
    return (dispatch) =>{
        dispatch({type: actionType.SET_LOADING})
        axios({
            method:"GET",
            url:'/users',
            headers:{
                access_token: localStorage.getItem('token')
            }
        })
        .then(async ({data}) =>{
            console.log(data);
            await dispatch(setUsers(data));
        })
        .finally(() =>{
            dispatch({type: actionType.SET_LOADING})
        })
    }
}

