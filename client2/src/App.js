import './App.css';
import {Redirect, Route, Switch} from 'react-router-dom';

import Navbar from './components/Navbar'
import Shop from './pages/Shop'
import Login from './pages/Login'
import FoodController from './pages/admin/food'
import UserController from './pages/admin/user'
import OrderController from './pages/admin/order';
import Transaction from './pages/Transaction';
import TransactionList from './pages/TransactionList';
import Order from './components/Order'
export default function App() {
  return (    
    <>
      <Switch>
        <Route path={'/login'}>
          <Login/>
        </Route>
        <Route path={'/transaction'}>
            <Transaction/>
        </Route>
        <div className="component">
          <Navbar />
          <Route path={'/admin/users'}>
            <UserController/>
          </Route>
          <Route path={'/admin/foods'}>
            <FoodController/>
          </Route>
          <Route path={'/admin/orders'}>
            <OrderController/>
          </Route> 
          <Route exact path={'/admin'}>
             <Redirect to="/admin/users" />
          </Route> 
          <Route exact path={'/usertransactions'}>
            <TransactionList/>
          </Route>
          <Route exact path={'/'}>
            <Shop/>
          </Route> 
        </div>  
      </Switch>    
    </>
  )
}


