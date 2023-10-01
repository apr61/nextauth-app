"use client"

import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from 'next/navigation'

const ProfilePage = () => {
  const router = useRouter()
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const logout = async () => {
    try {
      await axios.get("/api/users/logout")
      toast.success("Logout successful")
      router.push("/login")
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/login")
      setUser(res.data.user)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [])
  if(isLoading) return <h1>Loading...</h1>
  return (
    <div className='min-h-screen flex items-center justify-center flex-col gap-4'>
      <h1>Profile</h1>
      <p>Username : {user.username}</p>
      <p>Email : {user.email}</p>
      <p>Is Verified : {user.isVerified ? "Yes" : "No"}</p>
      <p>Is Admin : {user.isAdmin ? "Yes" : "No"}</p>
      <button className='px-4 py-2 bg-emerald-500 hover:bg-opacity-90 rounded-md text-white' onClick={logout}>Logout</button>
    </div>
  )
}

export default ProfilePage