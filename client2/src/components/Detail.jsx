import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { insertOrder } from "../store/order/actions";

export default function Detail(props){
    const {details} = useSelector((state) => state.food)
    const history = useHistory()
    const dispatch = useDispatch()
    const handleAddOrder = async (e, data) =>{
        console.log(localStorage.getItem('token'));
        if(!localStorage.getItem('token')){
            history.push('/login')
        }else{
            e.preventDefault()
            const quantity = document.getElementById(`quantity`).value;
            data.quantity = Number(quantity);
            data.totalPrice = quantity*data.price;
            await dispatch(insertOrder(data));
            props.handleShowDetail(e)
        }   
    }
    return(
        <>
            <div className='fixed z-40 top-0 bg-gray-500 bg-opacity-50 h-screen w-screen'>
            {details ?
                <div className='flex justify-center items-center h-full'>
                    <div className='flex flex-col bg-white rounded-md justify-start w-4/12 bg-white p-2'>
                        <div className='flex flex-col items-end'>
                            <button className='absolute w-10 h-10 bg-red-500 text-white hover:bg-red-600 rounded-lg m-1' onClick={(e) => props.handleShowDetail(e)}>X</button> 
                        </div>
                        <img className='w-full' src={details.imageUrl} alt="" /> 
                        <p className='py-2 text-gray-500 text-4xl text-center font-bold'>{details.name}</p> 
                        <p className='text-gray-500 text-md text-center'>{details.description}</p> 

                        <div className='flex justify-between items-centers text-gray-500 m-3 bg-gray-200 py-2'>
                                <div className='flex items-center text-lg mx-5'>
                                    <p className='font-bold '> Rp{details.price.toLocaleString('id')},-</p>
                                </div>
                                <div className='flex items-center text-lg mx-5'>
                                    <p className='font-bold '>STOK {details.stock}</p>
                                </div>
                                <div className='flex items-center mx-5'>
                                    <input type="number" className='border-2 border-green-600 w-12 text-center p-1 text-md font-bold rounded-bl-lg rounded-tl-lg' id='quantity' placeholder={0}/>
                                <button className='p-1 px-4 bg-green-600 text-xl font-bold text-white rounded-br-lg rounded-tr-lg' onClick={(e) =>{handleAddOrder(e, details)}}>ADD</button>
                                </div>
                        </div>
                    </div>   
                </div>
                 :null}
            </div>
        </>
    )
}