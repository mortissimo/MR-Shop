import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import axios from '../apis/axios'
import Order from '../components/Order'
import { fetchOrdered } from "../store/order/actions";

export default function UserTrasaction() {
    const dispatch = useDispatch()

    const [orderModal, setOrderModal] = useState(false)
    const [transactions, setTransactions] = useState([])
    const [transactionDetail, setTransactionDetail] = useState('')

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
    const getAllTransaction = () =>{
        axios({
            method:"GET",
            url:'/transactions',
            headers:{
                access_token: localStorage.getItem('token')
            }
        })
        .then(({data}) =>{
            // data.forEach(data =>{
            //     data.createdAt = new Date(data.createdAt).getDay()+"-"+new Date(data.createdAt).getMonth()+"-"+new Date(data.createdAt).getFullYear()+" "+new Date(data.createdAt).getHours()+":"+new Date(data.createdAt).getMinutes()+":"+new Date(data.createdAt).getSeconds()
            //     data.updatedAt = new Date(data.updatedAt).getDay()+"-"+new Date(data.updatedAt).getMonth()+"-"+new Date(data.updatedAt).getFullYear()+" "+new Date(data.updatedAt).getHours()+":"+new Date(data.updatedAt).getMinutes()+":"+new Date(data.updatedAt).getSeconds()
            // })
            setTransactions(data)
        })
    }
    useEffect(() =>{
        getAllTransaction()
    },[])
    return(
        <>
        {orderModal ?<Order handleShowOrder={handleShowOrder} transactionDetail={transactionDetail}/>: null }
        
        {transactions? transactions.map(data =>{
            return(
                <div class='mx-auto w-10/12 bg-white my-5 p-5 border-2 border-gray-400 border rounded-md' onClick={(e) => handleShowOrder(e, data)}>
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
                <button class='flex py-1 px-2 text-white w-max items-center bg-green-500 rounded-md '>Upload Image</button>
            </div>
        </div>
            )
        }): null}   
        </>
    )
}