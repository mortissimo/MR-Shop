import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk';
import orderReducer from './order/reducer'
import foodReducer from './food/reducer'
import userReducer from './user/reducer'

const allReducer = combineReducers({
    order: orderReducer,
    food: foodReducer,
    user: userReducer
})

const store = createStore(allReducer, applyMiddleware(thunk))

export default store;