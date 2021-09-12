import actionType from './actionType'


const initState = {
    foods:[],
    details:{},
    loading: false,
    error:''
    
}

export default function reducer(state = initState, action){
    // console.log('reducer work first time', state, action)
    switch(action.type){
        case actionType.SET_FOODS :{
            return {
                ...state,
                foods: action.payload
            }
        }
        case actionType.SET_LOADING:{
            return {
                ...state,
                loading: !state.loading
            }
        }
        case actionType.SET_DETAILS:{
            return{
                ...state,
                details: action.payload
            }
        }
        default: 
            return state
    }
}