import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from '../apis/axios';
import Register from '../components/Register'
export default function Login(){
    const [regModal, setRegModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleToHome = (e) =>{
        e.preventDefault();
        history.push('/')
    }

    const changeRegModal = (e) =>{
        e.preventDefault();
        if(regModal){
            setRegModal(false);
        }else{
            setRegModal(true);
        }
        console.log(regModal)
    }

    const handleLogin = (e) =>{
        e.preventDefault();
        const payload = {email, password};
        console.log(payload);
        if(email && password){
            axios({
                method:"POST",
                url:'/login',
                data: payload
            })
            .then(({data})=>{
                console.log(data);
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role);

                if(localStorage.getItem('role') === 'admin'){
                    history.push('/admin')
                }else{
                    history.push('/')
                }
                
            })
        }
    }
    return (
        <div className='flex justify-center items-center h-screen bg-login'>
        {regModal? <Register changeRegModal={changeRegModal}/> : null}
        <div className='w-9/12  h-5/6 '>
          <div className='flex h-full rounded-xl shadow-login'>
              <div className='flex flex-col justify-center items-center w-5/12 bg-green-700 h-full rounded-bl-3xl rounded-tl-3xl text-center'>
                  <p className='text-white  text-4xl'>Not Have Account yet ?</p>
                  <p className='text-white m-10 '>REGISTER NEW ACCOUNT HERE</p>
                  <button className='mt-10 px-10 py-2 text-3xl border-2 border-white rounded-3xl text-white hover:shadow-lg' onClick={(e) => changeRegModal(e)}>REGISTER</button>
              </div>
               <div className='flex flex-col justify-center items-center w-7/12 bg-white h-full rounded-br-3xl rounded-tr-3xl text-center'>
                  <p className='p-5 text-5xl'>Welcome Back !</p>
                  <p className='mb-10 '>Login Your Account Here</p>
                  <form onSubmit={(e) => handleLogin(e)}>
                     <div className="flex flex-wrap items-stretch w-full relative h-15 bg-white items-center rounded mb-2 pr-10 border-2 border-green-700 focus:border-4">
                          <div className="flex  justify-center w-20 py-3 bg-gray-200">
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
                          <div className="flex justify-center w-20 py-3 bg-gray-200">
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
                          <input type="submit" className='text-white py-3 text-xl bg-indigo-400 w-1/2 mr-1 hover:bg-indigo-500' value='Login'/>
                          <button className='text-white bg-red-400 text-xl w-1/2 ml-1  hover:bg-red-500' onClick ={(e) => handleToHome(e)}>Cancel</button>
                      </div>
                  </form>
              </div>
          </div>    
        </div>
    </div>
    )
}