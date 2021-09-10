import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export default function Order(props){
    const {detail, loading, error} = useSelector((state) => state.order)
    return(
        <div className='fixed z-40 top-0 bg-gray-500 bg-opacity-50 h-screen w-screen'>
             <div class='flex justify-center items-center h-full'>
                <div className='flex flex-col bg-white rounded-md  bg-white p-4 w-7/12'>
                    <div className='flex flex-col items-end'>
                        <button className='absolute w-10 h-10 bg-red-500 text-white hover:bg-red-600 rounded-lg m-1' onClick={(e) => props.handleShowOrder(e)}>X</button> 
                    </div>
                    <div class='border-b border-black w-full  pb-4  py-2'>
                        <p class='font-bold text-3xl mx-auto'>ORDER</p>
                    </div>
                    {detail ? detail.map(data =>{
                        return(
                        <>
                            <div class='flex justify-between mx-1'>
                                <p>{data.Food.name} x {data.quantity}</p>
                                <p>Rp {(data.quantity* data.price).toLocaleString('id')},00</p>
                            </div>
                            
                        </>
                        )
                    }): null}
                    <div class='flex justify-between border-t border-black my-2  '>
                                <p class='ml-1 '>Total</p>
                                <p class='mr-1'>Rp {(props.transactionDetail.totalPrice).toLocaleString('id')},00 </p>
                            </div>
                </div>
            </div>
        </div>
    )
}