import actionType from './actionType'

const initState = {
    user: [],
    loading:'',
    error:'',
    loggedIn: false
}

export default function reducer(state = initState, action) {
    // console.log('reducer work first time', state, action)
    switch(action.type){
        case actionType.SET_ALLUSER:{
            return {
                ...state,
                user: action.payload
            }
        }
        case actionType.SET_LOGIN:{
            return{
                ...state,
                loggedIn: true
            }
        }
        case actionType.SET_LOGOFF:{
            return{
                ...state,
                loggedIn: false
            }
        }
        case actionType.SET_LOADING:{
            return {
                ...state,
                loading: !state.loading
            }
        }
        default: 
            return state
    }
}