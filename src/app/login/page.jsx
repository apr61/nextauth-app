"use client"

import Link from 'next/link'
import React, { useState } from 'react'

const LoginPage = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const handleLogin = async () => {
        console.log(user)
    }
    return (
        <div className='min-h-screen flex items-center justify-center flex-col gap-4'>
            <h1 className='text-2xl'>Login</h1>
            <div className='flex flex-col gap-2'>
                <label htmlFor='email' className='cursor-pointer'>Email</label>
                <input type='email' id='email' placeholder='you@example.com' onChange={(e) => setUser({...user, email: e.target.value})} className='p-4 focus:outline-none  rounded-md border' />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor='password' className='cursor-pointer'>Password</label>
                <input type='password' id='password' placeholder='Your password' onChange={(e) => setUser({...user, password: e.target.value})} className='p-4 focus:outline-none  rounded-md border' />
            </div>
            <button className='px-4 py-2 bg-emerald-400 text-white rounded-md hover:bg-opacity-90' onClick={handleLogin}>Login</button>
            <Link href="/signup" className='hover:underline'>Create a new Account</Link>
        </div>
    )
}

export default LoginPage