import axios from '../apis/axios'
import { useState } from 'react'

export default function Register(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleRegister = async (e) =>{
        e.preventDefault()
        const payload = {email, password}
        try{
            const response = await axios({
                method:"POST",
                url:'/register',
                data: payload
            })
            if(response){
                props.changeRegModal(e)
            }
        }catch(error) {

        }
    }
    return (
    <div className='fixed z-40 bg-gray-500 bg-opacity-50 h-full w-full'>
       
        <div className='flex justify-center items-center h-full'>
            <div className='flex flex-col bg-white w-max h-4/6 rounded-md items-end'>
            <button class='text-center w-10 h-10 bg-red-500 text-white hover:bg-red-600 rounded-lg m-1' onClick={(e) => props.changeRegModal(e)}>X</button>
            <div className='flex flex-col bg-white w-max h-5/6 rounded-md justify-center items-center'>
            
                <p className='text-5xl font-bold px-10'>REGISTERATION</p>
                <p className='text-md'>register your information here !</p>
                <form onSubmit={(e) => handleRegister(e)} className='mt-20'>
                    <div className="flex flex-wrap items-stretch w-full relative h-15 bg-white items-center rounded mb-2 pr-10 border-2 border-green-700 focus:border-4">
                            <div className="flex -mr-px justify-center w-20 py-3 bg-gray-200">
                                <span className="flex items-center leading-normal bg-gray-200 px-3 border-0 rounded rounded-r-none text-2xl text-gray-600">
                                    <i className="fa fa-envelope text-gray-700"></i>
                                </span>
                            </div>
                            <input
                                type="email"
                                className="flex-shrink flex-grow flex-auto leading-normal  flex-1 border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-wrap items-stretch w-full mb-4 relative h-15 bg-white items-center rounded mb-6 pr-10 border-2 border-green-700 focus:border-4">
                            <div className="flex -mr-px justify-center w-20 py-3 bg-gray-200">
                                <span className="flex items-center leading-normal bg-gray-200 px-3 border-0 rounded rounded-r-none text-2xl text-gray-600">
                                    <i className="fas fas fa-lock text-gray-700"></i>
                                </span>
                            </div>
                            <input
                                type="password"
                                className="flex-shrink flex-grow flex-auto leading-normal  flex-1 border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='flex'>
                            <input type="submit" className='text-white py-3 text-xl bg-indigo-400 w-full mr-1 hover:bg-indigo-500 ' value='REGISTER'  />     
                        </div>
                    </form>
                    </div>
            </div>
        </div>
    </div>
    )
}