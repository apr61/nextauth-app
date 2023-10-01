import React from 'react'

const UserProfile = ({params}) => {
  return (
    <div className='min-h-screen flex items-center justify-center flex-col gap-4'>
        <h1 className='text-2xl'>Profile page</h1>
        <p>Hello <span className='font-bold'>{params.id}</span> !!!</p>
    </div>
  )
}

export default UserProfile