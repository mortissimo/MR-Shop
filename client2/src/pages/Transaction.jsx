import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import axios from '../apis/axios'

export default function Transaction(){
    const history = useHistory()
    const {order, totalPrice, loading, error} = useSelector((state) => state.order)
    useEffect(() =>{
        if(order.length <=0 ){
            history.push('/')
        }
    },[])

    const handleTransaction = (e) =>{
        e.preventDefault()
        let description = order.map((data, index) =>{
                return data.name+"x"+data.quantity+":"+data.price
        })
        description = description.join(',');
        console.log(description)
        let orders = order.map(data =>{
            return {id: data.id, name: data.name, quantity: data.quantity, price: data.price}
        })
        orders = JSON.stringify(orders);
        const payload = {description, totalPrice, orders}
        console.log(payload)
        try{
            axios({
                method:"POST",
                url:"/transactions",
                headers:{
                    access_token: localStorage.getItem('token'),
                },
                data: payload     
            })
            .then(({data}) =>{
                console.log(data, "SUCCESS")
                history.push('/')
            })
            .catch(err =>{
                console.log(err);
            })
        }catch(error) {
            console.log(error);
        }
        
    }
    return(
        <>
            <div className=' w-8/12 min-h-screen h-full mx-auto bg-white shadow-lg rounded-xl'>
                <nav className='flex h-16 w-full bg-green-700 items-center'>
                    <button className='px-10 text-white text-3xl h-full font-bold'>MR Shop</button>
                </nav>
                <div class='flex px-10 mt-16'>
                    <div class=' w-8/12 mr-4'>
                        <p class='text-2xl py-2 text-gray-500 font-bold'>INVOICE</p>
                        <div class='flex justify-between border-b-2 border-gray-400 '>
                            <p class='text-gray-400'>Description</p>
                            <p class='text-gray-400'>Amount</p>
                        </div>
                        {order ? order.map(data =>{
                            return(
                                <div class='flex justify-between mx-1'>
                                    <p>{data.name} x {data.quantity}</p>
                                    <p>Rp {data.totalPrice.toLocaleString('id')},00</p>
                                </div>
                            )   
                        })  
                        : null } 
                        {order ? 
                            <div class='flex justify-between border-t-2 border-gray-400 my-2  '>
                                <p class='ml-1 '>Total</p>
                                <p class='mr-1'>Rp {totalPrice.toLocaleString('id')},00</p>
                            </div>
                        : null}
                        <div class='flex justify-end'>
                            <button class=' mt-2 bg-indigo-500 text-white text-lg text-right px-10 py-1 rounded-md hover:bg-indigo-600' onClick={(e) => handleTransaction(e)}>Confirm</button>
                        </div>
                    </div>
                    <div class=' w-4/12 ml-4'>
                        <p class='text-2xl py-3 text-gray-500 font-bold'>Credit Card</p>
                        <button class='flex justify-between border-2 border-gray-500 rounded-md items-center hover:shadow-lg text-gray-500 focus:bg-gray-400 focus:bg-opacity-50 focus:text-white w-full'>
                            <p class='mx-5 text-xl font-bold '>Using</p>
                            <img class=' w-20 m-2' src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="" />
                        </button>
                        <p class='text-center font-bold text-3xl m-4 '>OR</p>
                        <p class='text-2xl pb-2 text-gray-500 font-bold'>Bank Transfer</p>
                        <div class='flex justify-between border-2 border-gray-500 rounded-md items-center w-full'>
                            <p class='mx-5 text-md font-bold text-gray-500'>6860-1485-77 Stevanus Kurniawan</p>
                            <img class=' w-20 m-2' src="https://www.freepnglogos.com/uploads/logo-bca-png/bank-central-asia-logo-bank-central-asia-bca-format-cdr-png-gudril-1.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

