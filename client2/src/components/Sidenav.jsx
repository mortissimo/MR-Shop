import { NavLink } from "react-router-dom"

export default function Sidenav(){
    return(
        <>
            <div className=' fixed top-0 h-full min-h-screen  w-80 bg-gray-800 shadow-xl'>
                <p class='pt-14 text-white text-4xl font-bold text-center'>DASHBOARD</p>
                <p class='text-white pb-14 border-b-2 border-white text-center '>Welcome Admin !</p>
                <NavLink exact to={'/admin/users'} class='flex h-20 w-full border-b-2 border-white items-center hover:bg-gray-900' activeClassName='flex h-20 w-full border-b-2 bg-black items-center '>
                        <div class='ml-20'>
                            <i class="fas fa-user text-2xl text-white"></i>
                        </div>
                        <div class='px-5'>
                            <p class='text-white text-2xl'>USER</p>
                        </div>              
                </NavLink>
                <NavLink exact to={'/admin/foods'}  class='flex h-20 w-full border-b-2 border-white items-center hover:bg-gray-900' activeClassName='flex h-20 w-full border-b-2 bg-black items-center ' >
                        <div class='ml-20'>
                            <i class="fas fa-user text-2xl text-white"></i>
                        </div>
                        <div class='px-5'>
                            <p class='text-white text-2xl'>FOOD</p>
                        </div>
                </NavLink>
                <NavLink exact to={'/admin/orders'} class='flex h-20 w-full border-b-2 border-white items-center hover:bg-gray-900' activeClassName='flex h-20 w-full border-b-2 bg-black items-center ' >
                        <div class='ml-20'>
                            <i class="fas fa-user text-2xl text-white"></i>
                        </div>
                        <div class='px-5'>
                            <p class='text-white text-2xl'>ORDER</p>
                        </div>

                </NavLink>
            </div>
        </>
    )
}