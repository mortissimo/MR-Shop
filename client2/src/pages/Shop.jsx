import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Cart from '../components/Cart'
import { fetchFoods, setDetail } from '../store/food/actions'
import { insertOrder } from '../store/order/actions'
import Detail from '../components/Detail'

export default function Shop(){
    const dispatch = useDispatch()
    const history = useHistory();

    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token'))
    const [detailModal, setDetailModal] = useState(false);
    const {foods, loading, error} = useSelector((state) => state.food)

    const handleAddOrder = (e, data) =>{
        console.log(localStorage.getItem('token'));
        if(!localStorage.getItem('token')){
            history.push('/login')
        }else{
            e.preventDefault()
            const quantity = document.getElementById(`${data.id}quantity`).value;
            data.quantity = Number(quantity);
            data.totalPrice = quantity*data.price;
            dispatch(insertOrder(data));
        }
        
    }
    const handleShowDetail = async (e, data) =>{
        e.preventDefault();
        await dispatch(setDetail(data))
        if(detailModal){
            setDetailModal(false);
        }else{
            setDetailModal(true);
        }
        
    }
    
    useEffect(() =>{
        console.log(localStorage.getItem('token'));
        dispatch(fetchFoods());
    },[])
    return (
        <>
       
        {detailModal? <Detail handleShowDetail={handleShowDetail} /> : null}
        { loggedIn ? 
        <div className='flex flex-wrap lg:flex-nowrap '>
            <div className='w-full h-full m-3 lg:w-9/12'>
                <div className='flex flex-wrap justify-center '>
                    {!loading ? foods.map((data,index) =>{
                        return(
                            <> 
                            <div className='w-60 bg-white p-2 m-4 rounded-lg shadow-xl' key={index}>
                                <img className='w-60 object-cover rounded-lg h-36' onClick={(e) => handleShowDetail(e, data)} src={data.imageUrl} alt=""/>
                                <p className='mt-1 mx-1 text-lg text-gray-500 font-bold'>{data.name.toUpperCase()}</p>
                                <div className='flex m-1 justify-between items-center justify-center'>
                                    <p className='text-md text-gray-400 font-bold  '>Rp {data.price.toLocaleString('id')},-</p>
                                    <div class='flex hover:shadow-md rounded-2xl'>
                                        <input type="number" className='w-10 text-xs text-right border-t-2 border-l-2 border-b-2 border-green-500  hover:border-green-600 rounded-bl-2xl rounded-tl-2xl' placeholder='0' id={data.id+"quantity"}/>
                                        <button className='border-2 border-green-500 bg-green-500 hover:border-green-600 hover:bg-green-600 text-white px-1 rounded-br-2xl rounded-tr-2xl  text-sm' onClick={(e) => handleAddOrder(e, data)}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                            </>
                        )
                    }): null}
                </div>
            </div>
            <Cart/>
        </div>
        :
        <div className='flex flex-wrap lg:flex-nowrap '>
            <div className='w-full h-full m-3'>
                <div className='flex flex-wrap justify-center '>
                    {!loading ? foods.map((data,index) =>{
                        return(
                            <> 
                            <div className='w-60 bg-white p-2 m-4 rounded-lg shadow-xl' key={index}>
                                <img className='w-60 object-cover rounded-lg h-36' onClick={(e) => handleShowDetail(e, data)} src={data.imageUrl} alt=""/>
                                <p className='mt-1 mx-1 text-lg text-gray-500 font-bold'>{data.name.toUpperCase()}</p>
                                <div className='flex m-1 justify-between items-center justify-center'>
                                    <p className='text-md text-gray-400 font-bold  '>Rp {data.price.toLocaleString('id')},-</p>
                                    <div class='flex hover:shadow-md rounded-2xl'>
                                        <input type="number" className='w-10 text-sm text-right border-t-2 border-l-2 border-b-2 border-green-500  hover:border-green-600 rounded-bl-2xl rounded-tl-2xl' placeholder='0' id={data.id+"quantity"}/>
                                        <button className='border-2 border-green-500 bg-green-500 hover:border-green-600 hover:bg-green-600 text-white px-1 rounded-br-2xl rounded-tr-2xl  text-sm' onClick={(e) => handleAddOrder(e, data)}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                            </>
                        )
                    }): null}
                </div>
            </div>
        </div>
        }
        </>
    )
}