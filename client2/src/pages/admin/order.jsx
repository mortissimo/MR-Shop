import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from '../../apis/axios'
import Order from '../../components/Order'
import Sidenav from '../../components/Sidenav'
import { fetchOrdered } from "../../store/order/actions";

export default function UserTrasaction() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [orderModal, setOrderModal] = useState(false)
    const [transactions, setTransactions] = useState('')
    const [transactionDetail, setTransactionDetail] = useState('')
    
    const handleComplete = async(e, id) =>{
        e.stopPropagation();
        e.preventDefault();
        await axios({
            method:"PATCH",
            url:`/transactions/${id}`,
            headers:{
                access_token: localStorage.getItem('token')
            }
        })
        .then(async () =>{
           await  getAllTransaction();
        })
        .catch(err =>{
            console.log(err);
        })
    }

    const handleShowOrder = async (e, data) =>{
        e.preventDefault();
        if(orderModal){
            setOrderModal(false);
        }else{
            console.log(data.Orders[0].TransactionId);
            await setTransactionDetail(data);
            await dispatch(fetchOrdered(data.Orders[0].TransactionId));
            setOrderModal(true);
        }   
    }
    const getAllTransaction = async () =>{
        await axios({
            method:"GET",
            url:'/transactions',
            headers:{
                access_token: localStorage.getItem('token')
            }
        })
        .then(async ({data}) =>{
            console.log(data);
            await setTransactions(data)
        })
    }
    useEffect(() =>{
        if(!localStorage.getItem('token') || localStorage.getItem('role') !== 'admin'){
            history.push('/')
        }else{
            getAllTransaction()
        }
    },[])
    return(
        <>
        <Sidenav/> 
        {orderModal ?<Order handleShowOrder={handleShowOrder} transactionDetail={transactionDetail}/>: null }
        
        {transactions? transactions.map(data =>{
            return(
            <div class='mx-auto ml-96 w-8/12 bg-white my-5 p-5 border-2 border-gray-400 border rounded-md' onClick={(e) => handleShowOrder(e, data)}>
            <p class=''>{data.createdAt}</p>
            <div class="grid grid-cols-5 gap-4 border-b border-gray-400 ">
                <p class='text-gray-600'>Email</p>
                <p class='text-gray-600'>Created Date</p>
                
                <p class='text-gray-600'>Updated Date</p>
                <p class='text-gray-600'>Status</p>
                <p class='text-gray-600'>Action</p>
            </div>
            <div class="flex items-center grid grid-cols-5 gap-4 my-1">
                <p>{data.User.email}</p>
                <p>{data.createdAt}</p>
                <p>{data.updatedAt}</p>
                <span class="px-2 w-max inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {data.status}
                </span>
                <button class='flex py-1 px-2 text-white w-max items-center bg-green-500 rounded-md' onClick={(e) => handleComplete(e, data.id)}>Complete</button>
            </div>
        </div>
            )
        }): null}   
        </>
    )
}