import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { deleteOrder } from "../store/order/actions";
export default function Cart(){
    const dispatch = useDispatch()
    const history = useHistory()
    const {order, totalPrice, loading, error} = useSelector((state) => state.order)

    const handleToConfirmation = (e, data) =>{
        history.push('/transaction');
    }

    const handleDelete = (e, data) =>{
        e.preventDefault();
        dispatch(deleteOrder(data))   
    }
    return(
        <div className='lg:fixed mt-2 w-full bg-green-500 shadow-lg lg:w-96 rounded-xl lg:right-0'>     
        <p className="p-5 bg-green-500 text-center text-3xl text-white rounded-xl"><i className="fas fa-shopping-cart "></i>  Keranjang</p>
        <div className='h-96 overflow-y-scroll mx-1 bg-gray-200 '>
            {order ? order.map(data =>{
                return(
                    <div className='bg-white p-1 m-2 rounded-lg'>
                    <div className='flex items-center'>
                        <img className='w-20 object-cover rounded-lg' src={data.imageUrl} alt="" />
                        <div className='flex flex-col  justify-center w-5/12 text-xs  p-2'>
                            <p className='font-bold text-gray-500 text-xs'>Name</p>
                            <p className='text-xs'>{data.name}</p>
                        </div>
                        <div className='flex flex-col items-center justify-center w-3/12 text-xs  p-2'>
                            <p className='font-bold text-gray-500 text-xs'>Quantity</p>
                            <p className='text-xs'>{data.quantity}</p>
                        </div>
                        <div className='flex flex-col justify-center w-4/12 text-xs p-2'>
                            <p className='font-bold text-gray-500 text-xs'>Price</p>
                            <p className='text-xs'>Rp.{data.totalPrice.toLocaleString('id')},-</p>
                        </div>
                        <button className='p-2 font-bold text-sm text-red-500' onClick={(e) =>{handleDelete(e, data)}}>X</button>
                    </div>
                </div>
                )  
            }): null}     
        </div>
        <div className='bg-gray-100 mx-1 p-4 border-t-4 border-b-4 border-green-500'>
            <p className='text-center font-bold text-xl'>TOTAL</p>
            {totalPrice? 
            <p className='text-gray-500 text-3xl font-bold text-center'>Rp {totalPrice.toLocaleString('id')},-</p>
            :
            <p className='text-gray-500 text-3xl font-bold text-center'>----</p>
            }
        </div>
        <div className='flex bg-gray-100 rounded-br-lg rounded-bl-lg mx-1 mb-1 border-t-2'>
             <button className='m-1 bg-green-500 h-16 w-full font-bold text-2xl rounded-lg hover:bg-green-600 focus:bg-green-700 text-white' onClick={(e) => handleToConfirmation(e)}> ORDER</button>  
        </div>
    </div>
    )
}