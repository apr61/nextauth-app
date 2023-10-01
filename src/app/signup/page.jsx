"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import axios from "axios"
import toast, {Toaster} from "react-hot-toast"

const userIntialState = {
    username: '',
    email: '',
    password: ''
}

const SignupPage = () => {
    const router = useRouter()
    const [user, setUser] = useState(userIntialState)
    const [isLoading, setIsLoading] = useState(false)
    const btnIsDisabled = user.username.trim().length > 0 && user.email.trim().length > 0 && user.password.trim().length > 0 

    const handleSignup = async () => {
        try {
            setIsLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup success", response.data);
            router.push("/login")
        } catch (error) {
            toast.error(error.message)
        }finally{
            setIsLoading(false)
            setUser(userIntialState)
        }
    }
    return (
        <div className='min-h-screen flex items-center justify-center flex-col gap-4'>
            <h1 className='text-2xl'>{isLoading ? 'Loading...' : 'Sign Up'}</h1>
            <div className='flex flex-col gap-2'>
                <label htmlFor='username' className='cursor-pointer'>Username</label>
                <input type='text' id='username' placeholder='Your username' onChange={(e) => setUser({...user, username: e.target.value})} className='p-4 focus:outline-none  rounded-md border' />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor='email' className='cursor-pointer'>Email</label>
                <input type='email' id='email' placeholder='you@example.com' onChange={(e) => setUser({...user, email: e.target.value})} className='p-4 focus:outline-none  rounded-md border' />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor='password' className='cursor-pointer'>Password</label>
                <input type='password' id='password' placeholder='Your password' onChange={(e) => setUser({...user, password: e.target.value})} className='p-4 focus:outline-none  rounded-md border' />
            </div>
            <button className='px-4 py-2 bg-emerald-400 text-white rounded-md hover:bg-opacity-90 disabled:bg-opacity-70' onClick={handleSignup} disabled={!btnIsDisabled}>Sign Up</button>
            <Link href="/login" className='hover:underline'>Have an account?</Link>
            <Toaster position='top-right'/>
        </div>
    )
}

export default SignupPage