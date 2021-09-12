import actionType from './actionType'
import axios from '../../apis/axios'
export const insertOrder = (data) =>{
    return{
        type: actionType.ADD_ORDER,
        payload: data
    }
}

export const setDetail = (data) =>{
    return{
        type: actionType.SET_DETAIL,
        payload: data
    }
}

export const deleteOrder = (data) =>{
    return {
        type: actionType.DELETE_ORDER,
        payload: data
    }
}

export const fetchOrdered = (data) =>{
    console.log("ENTERRINGNG",data);
    return async (dispatch) =>{
        try{
            dispatch({type: actionType.SET_LOADING})
            await axios({
                method:"GET",
                url:`/orders/${data}`,
                headers:{
                    access_token: localStorage.getItem('token')
                },
            })
            .then(async ({data}) =>{
                console.log(data);
                await dispatch(setDetail(data));
            }) 
            .finally(() =>{
                dispatch({type: actionType.SET_LOADING})
            })
        } catch(error) {
            console.log(error)
        } 
    }
    
}
