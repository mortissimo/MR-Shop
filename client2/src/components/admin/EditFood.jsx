import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editFoods, fetchFoods } from "../../store/food/actions";

export default function AddFood(props){
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const handleEditFood = (e) =>{
        e.preventDefault()
        if(name && stock && price && imageUrl && description){
            const payload = {id: props.editDetail.id , name, stock:Number(stock), description, price: Number(price), imageUrl};
            console.log(payload);
            dispatch(editFoods(payload));
            props.handleEditModal(e)
        }else{
            console.log("Fill all the information to Add")
        }
    }
    useEffect(() =>{
        setName(props.editDetail.name)
        setStock(props.editDetail.stock)
        setPrice(props.editDetail.price)
        setImageUrl(props.editDetail.imageUrl)
        setDescription(props.editDetail.description)
    },[])
    return(
        <>
            <div class='fixed z-40 top-0 bg-gray-500 bg-opacity-50 h-screen w-screen'>
                <div class='flex justify-center items-center h-full'>
                    <div className='flex flex-col bg-white rounded-md  bg-white p-4'>
                        <div className='flex flex-col items-end'>
                            <button className='absolute w-8 h-8 bg-red-500 text-white hover:bg-red-600 rounded-lg' onClick={(e) => props.handleEditModal(e)}>X</button> 
                        </div>
                        <div class='border-b border-black w-full text-center pb-4  py-2'>
                            <p class='font-bold text-3xl mx-auto'>{name.toUpperCase()}</p>
                        </div>
                        <div class='flex mt-2'>
                            {imageUrl? <img className='w-60 object-cover h-36 mr-5' src={imageUrl} alt=""/>
                            : null}
                            <div class='flex flex-col  justify-center items-center' >
                                <div class='flex'>
                                    <label class='w-16 font-bold text-gray-600'>Name</label>
                                    <input type="text"  class='text-center border-b-2 border-grey-700' placeholder="Food Name" onChange={(e) => setName(e.target.value)} defaultValue={name}/>
                                </div>
                                <div class='flex mt-2 '>
                                    <label class='w-16 font-bold text-gray-600'>Stock</label>
                                    <input type="number"  class='text-center border-b-2 border-grey-700' placeholder="Stock" onChange={(e) => setStock(e.target.value)} defaultValue={stock}/>
                                </div>
                                <div class='flex mt-2 '>
                                    <label class='w-16 font-bold text-gray-600'>Price</label>
                                    <input type="number"  class='text-center border-b-2 border-grey-700' placeholder="Price"  onChange={(e) => setPrice(e.target.value)} defaultValue={price}/>
                                </div>
                                <div class='flex mt-2 '>
                                    <label class='w-16 font-bold text-gray-600' >Image</label>
                                    <input type="text"  class='text-center border-b-2 border-grey-700' placeholder="Link" onChange={(e) => setImageUrl(e.target.value)} defaultValue={imageUrl}/>
                                </div>
                            </div>
                        </div>
                        <label class='w-16 font-bold text-gray-600 mt-2'>Description</label>
                        <textarea  class='w-full border border-gray-700 h-32 resize-none border rounded-md overflow-y-scroll text-center'  onChange={(e) => setDescription(e.target.value)} defaultValue={description}/>
                        <button class='w-full bg-blue-500 text-white text-2xl rounded-lg h-10 font-bold mt-4 hover:bg-blue-600 focus:bg-blue-700' onClick={(e) => handleEditFood(e)}>EDIT</button>
                    </div>
                </div>
            </div>
        </>
    )
}