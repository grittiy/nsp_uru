'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import {GoTrash} from "react-icons/go"

type Props = {
  roomId?:number
  toolId?:number
  userId?: number
}

const DeleteCart = (props: Props) => {
  const router = useRouter()
  const handleDelete =async() => {
    try{
      await axios.delete('/api/carts', {
        data:{
          roomId:props.roomId,
          toolId:props.toolId,
          userId:props.userId
        }
      })
      router.refresh()
    }catch(error) {
      console.log(error)
    }
  }
  return (
    <div className='cursor-pointer' onClick={handleDelete}>
    <GoTrash className='text-red-500' size={20}/>
</div>
  )
}

export default DeleteCart