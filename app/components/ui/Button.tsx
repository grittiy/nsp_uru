'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
  roomId?: number | null
  toolId?: number | null
  userId: number
}

const Button = (props: Props) => {
  const { data: session } = useSession()
  const router = useRouter()

  const handlebooking = () => {
    
   if (session?.user) {
    const id = session?.user.id
    router.push('/Booking'); // Update with the actual route
   } else {
    router.push('/login');
   }
  };



  return (
    <div className='flex items-center justify-center mt-20 cursor-pointer'>
      <span className='px-10 p-2 text-white bg-purple-600 rounded-full' onClick={handlebooking}>
        Checkout
      </span>
    </div>
  )
}

export default Button