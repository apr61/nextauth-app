"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import toast, {Toaster} from "react-hot-toast"
import axios from "axios"
import { useRouter } from 'next/navigation'

const LoginPage = () => {
    const router = useRouter()
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const isBtnDisabled = user.email.trim().length > 0 && user.password.trim().length > 0
    const handleLogin = async () => {
        try {
            setIsLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log("Login sucsess", response.data)
            toast.success("Login successful")
            router.push('/profile')
        } catch (error) {
            console.error(error.message);
            toast.error(error.message)
        }finally{
            setIsLoading(false)
        }
    }
    return (
        <div className='min-h-screen flex items-center justify-center flex-col gap-4'>
            <h1 className='text-2xl'>{isLoading? "Loading..." : "Login"}</h1>
            <div className='flex flex-col gap-2'>
                <label htmlFor='email' className='cursor-pointer'>Email</label>
                <input type='email' id='email' placeholder='you@example.com' onChange={(e) => setUser({...user, email: e.target.value})} className='p-4 focus:outline-none  rounded-md border' />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor='password' className='cursor-pointer'>Password</label>
                <input type='password' id='password' placeholder='Your password' onChange={(e) => setUser({...user, password: e.target.value})} className='p-4 focus:outline-none  rounded-md border' />
            </div>
            <button className='px-4 py-2 bg-emerald-400 text-white rounded-md hover:bg-opacity-90 disabled:bg-opacity-70' onClick={handleLogin} disabled={!isBtnDisabled}>Login</button>
            <Link href="/signup" className='hover:underline'>Create a new Account</Link>
            <Toaster position='top-right' />
        </div>
    )
}

export default LoginPage