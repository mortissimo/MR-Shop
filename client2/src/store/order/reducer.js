import actionType from './actionType'

const initState = {
    order: [],
    detail:{},
    totalPrice: 0,
    loading: '',
    error:''
}

export default function reducer(state = initState, action) {
    // console.log('reducer work first time', state, action)
    switch(action.type){
        case actionType.ADD_ORDER :{
            console.log(state.order);
            if(state.order.length >=1){
                let isExist = false;
                let newOrder = [...state.order]
                for (let i = 0; i<newOrder.length; i++){
                    if(action.payload.id === newOrder[i].id) {
                        isExist= true;
                    }
                }
                if(isExist){
                    return {
                        ...state,
                        order: state.order.map(data =>{
                            if(data.id === action.payload.id){
                                return {...data, totalPrice: data.totalPrice + action.payload.totalPrice, quantity: data.quantity + action.payload.quantity}
                            }else{
                                return data;
                            }
                        }),
                        totalPrice: state.totalPrice + action.payload.totalPrice
                    }
                }else{
                    return {
                        ...state,
                        order: [...state.order, action.payload],
                        totalPrice: state.totalPrice + action.payload.totalPrice
                        
                    }
                }  
            }else{
                return {
                    ...state,
                    order: [...state.order, action.payload],
                    totalPrice: state.totalPrice + action.payload.totalPrice
                }
            }
        }
        case actionType.SET_DETAIL:{
            return{
                ...state,
                detail: action.payload
            }
        }
        case actionType.DELETE_ORDER: {
            return {
                ...state,
                order: state.order.filter(order =>{
                    return order.id !== action.payload.id
                }),
                totalPrice: state.totalPrice - action.payload.totalPrice
            }
        }
        default: 
            return state
    }
}