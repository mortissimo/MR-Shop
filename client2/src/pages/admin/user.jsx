import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory } from "react-router-dom"
import Sidenav from '../../components/Sidenav'
import { fetchUsers } from "../../store/user/actions"

export default function User(){
    const dispatch = useDispatch();
    const history = useHistory()
    const {user, loading, error} = useSelector((state) => state.user)
    useEffect(() =>{
        if(!localStorage.getItem('token') || localStorage.getItem('role') !== 'admin'){
            history.push('/')
        }else{
            dispatch(fetchUsers());
        }      
    },[])
    return(
        <>
           <Sidenav/> 
           <div className='ml-80 w-9/12 mt-5'>
            <div class="flex flex-col items-center ">
                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 w-full">
                    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg ">
                            <table class="min-w-full divide-y divide-gray-200 ">
                            <thead class="bg-gray-50">
                                <tr>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Account
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created At
                                </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                {user ? user.map(data =>{
                                    return(
                                        <tr>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="flex items-center">
                                            <div class="">
   
                                                <div class="text-sm text-gray-500">
                                                {data.email}
                                                </div>
                                            </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">{data.role}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Active
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {data.createdAt}
                                        </td>
                                        </tr>  
                                    )
                                })
                                :null}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}