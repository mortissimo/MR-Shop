import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import AddForm from '../../components/admin/AddFood'
import EditForm from '../../components/admin/EditFood'

import Sidenav from '../../components/Sidenav'
import { deleteFoods, fetchFoods } from '../../store/food/actions';
export default function Food(){
    const dispatch = useDispatch()
    const history = useHistory();

    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token'))
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editDetail, setEditDetail] = useState(true);
    const {foods, loading, error} = useSelector((state) => state.food)

    const handleEditModal = async (e, data) =>{
        e.preventDefault();
        if(editModal){
            setEditModal(false);
        }else{
            await setEditDetail(data);
            setEditModal(true);
        }      
    }
    const handleAddModal = (e) =>{
        e.preventDefault();
        if(addModal){
            setAddModal(false);
        }else{
            setAddModal(true);
        }
    }
    const handleDeleteFood = (e, data) =>{
        e.preventDefault();
        dispatch(deleteFoods(data))
    }
    useEffect(() =>{
        if(!localStorage.getItem('token') || localStorage.getItem('role') !== 'admin'){
            history.push('/')
        }else{
            dispatch(fetchFoods());
        }
    },[])
    return(
        <>
        {editModal? <EditForm handleEditModal={handleEditModal} editDetail={editDetail} /> : null}
        {addModal? <AddForm handleAddModal={handleAddModal}/> : null}
        <div className='flex flex-wrap lg:flex-nowrap'>
            <Sidenav/>
            <div className='h-full ml-80 w-9/12'>
                <div className='flex flex-wrap justify-center '>
                    {!loading ? foods.map((data,index) =>{
                        return(
                            <> 
                            <div className='w-60 bg-white p-2 m-4 rounded-lg shadow-xl' key={index}>
                            <div className='flex flex-col items-end'>
                            <button className='absolute w-8 h-8 bg-red-500 text-white hover:bg-red-600 rounded-lg m-1' onClick={(e) => handleDeleteFood(e, data)}>X</button> 
                        </div>
                                <img className='w-60 object-cover rounded-lg h-36' src={data.imageUrl} alt=""/>
                                <p className='mt-1 mx-1 text-lg text-gray-500 font-bold text-center'>{data.name.toUpperCase()}</p>
                                <div className='flex m-1 justify-center items-center justify-center'>
                                        <button className='border-2 border-green-500 bg-green-500 hover:border-green-600 hover:bg-green-600 text-white px-1 rounded-lg w-full text-sm' onClick={(e) => handleEditModal(e, data)}>Edit</button>
                                </div>
                            </div>
                            </>
                        )
                    }): null}
                    <button className='flex justify-center items-center w-60 border-8 border-green-500 p-2 m-4 rounded-lg min-h-36' onClick={(e) =>{handleAddModal(e)}}>
                        <div className='flex justify-center items-center w-16 h-16 bg-green-500 rounded-full' ><i class="fas fa-plus text-white text-4xl rounded-full "></i></div>    
                    </button>
                </div>
            </div>
        </div>
        </>
    )   
}