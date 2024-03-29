import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth';
function SignUp() {
  const [formData,setFormData]=useState({});
  const [error,setError]=useState(null);
  const [loading,setLoading]=useState(null);
  const navigate=useNavigate();
  const handleChange=(e)=>{

    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    })
  }

  const handleSubmit=async (e)=>{
    e.preventDefault();

    try{
      setLoading(true);
      const res= await fetch("api/auth/signup",{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
       })

       const data=await res.json();
       console.log('data',data);
       if(data.success==false){
        setLoading(false);
        setError(data.message)
       return;
       }
       setLoading(false)
       setError(null);
       navigate("/signin")
    }catch(error){
      setLoading(false)
      setError(error.message)
    }

   console.log(data);

  }
  useEffect(()=>{
    console.log("loading",loading)
  })
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <input id="username" type='text' placeholder='username' className='border p-3 rounded-lg' onChange={handleChange}/>
      <input id="email" type='text' placeholder='email' className='border p-3 rounded-lg'  onChange={handleChange}/>
      <input id="password" type='password' placeholder='password' className='border p-3 rounded-lg'  onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? "Loading...": "Sign up"}</button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
       <Link to="/signin">
          <span className='text-blue-700'>Sign in</span>
       </Link>
      </div>
    {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignUp