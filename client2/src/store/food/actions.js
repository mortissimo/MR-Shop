import actionType from './actionType'
import axios from '../../apis/axios'

export const setFoods = (data) => {
    return {
        type: actionType.SET_FOODS,
        payload: data
    }
}

export const setDetail = (data) =>{
    return{
        type: actionType.SET_DETAILS,
        payload: data
    }
}

export const fetchFoods = () =>{
    console.log("ENTER");
    return async (dispatch) =>{
        try{
            console.log("ENTER HERE");
            dispatch({type: actionType.SET_LOADING})
            await axios({
                    method:"GET",
                    url:'/foods'
            })
            .then(({data}) =>{
                console.log(data);
                dispatch(setFoods(data));
            })
            .finally(() =>{
                dispatch({type: actionType.SET_LOADING})
            })
        }catch(error){
            console.log(error);
        }  
    }
}



export const deleteFoods = (data) =>{
    return async (dispatch) =>{
        try{
            await axios({
                    method:"DELETE",
                    url:`/foods/${data.id}`,
                    headers:{
                        access_token: localStorage.getItem('token')
                    }
            })
            .then( async({data}) =>{
                console.log(data);
                await dispatch(fetchFoods())
            })
        }catch(error){
            console.log(error);
        }  
    }
}

export const addFoods = (data) =>{
    return async (dispatch) =>{
        try{
            await axios({
                    method:"POST",
                    url:'/foods',
                    headers:{
                        access_token: localStorage.getItem('token')
                    },
                    data
            })
            .then(async ({data}) =>{
                await dispatch(fetchFoods());
            })
        }catch(error){
            console.log(error);
        }  
    }
}

export const editFoods = (data) =>{
    const payload = {name: data.name, stock: data.stock, description: data.description, price: data.price, imageUrl: data.imageUrl};
    console.log(payload)
    return async (dispatch) =>{
        try{
            dispatch({type: actionType.SET_LOADING})
            await axios({
                    method:"PATCH",
                    url:`/foods/${data.id}`,
                    headers:{
                        access_token: localStorage.getItem('token')
                    },
                    data: payload
            })
            .then( async ({data}) =>{
                console.log("SUCCESSS")
                await dispatch(fetchFoods());
            })
            .catch(err =>{
                console.log("FAILED")
            })
            .finally(() =>{
                dispatch({type: actionType.SET_LOADING})
            })
        }catch(error){
            console.log(error);
        }  
    }
}