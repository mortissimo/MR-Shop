import { useEffect, useState } from "react";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom"
import { setLoggedOff } from "../store/user/actions";

export default function Navbar(props){
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false)
  const location = useLocation()
  console.log(location.pathname);
  const signIn = (e) =>{
    e.preventDefault()
    history.push('/login')
  }
  const signOut =  (e) =>{
    e.preventDefault()
    localStorage.clear();
    if(location.pathname !== '/'){
      history.push('/')
    }else{
      history.go(0)
    }  
  }
  useEffect(() =>{
    if(localStorage.getItem('token')){
      setLoggedIn(true);
    }else{
      setLoggedIn(false);
    }
  })

    return (
        <nav className="flex items-center justify-between flex-wrap bg-green-500 p-3 w-full md:w-full ">

          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
            <span className="font-semibold text-xl tracking-tight">Tailwind CSS</span>
          </div>
          <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-green-500 border-green-400 hover:text-white hover:border-white">
              <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
          </div>
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
              
            </div>
            {localStorage.getItem('role') === 'customer' ? 
              <div>
                <NavLink exact to={'/usertransactions'} className="inline-block text-sm  p-5 leading-none   text-white  hover:border-transparent hover:text-green-500 hover:bg-white  lg:mt-0 ">MY HISTORY</NavLink>
              </div>: null }
            {loggedIn ? 
              <div>
                <NavLink exact to={'/login'} className="inline-block text-sm  p-5 leading-none border rounded text-white border-white hover:border-transparent hover:text-green-500 hover:bg-white  lg:mt-0" onClick={(e) =>{signOut(e)}}>Sign Out</NavLink>
              </div>
                : 
              <div>
                <NavLink exact to={'/login'} className="inline-block text-sm  p-5 leading-none border rounded text-white border-white hover:border-transparent hover:text-green-500 hover:bg-white  lg:mt-0" onClick={(e) =>{signIn(e)}}>Sign In</NavLink>
              </div>}
          </div>
        </nav>
    )
}