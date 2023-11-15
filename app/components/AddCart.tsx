'use client'
import { CiShoppingCart, CiCreditCard1 } from "react-icons/ci"
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    roomId?: number
    toolId?: number
}

const AddCart = ({ roomId,toolId }: Props) => {
    const { data: session } = useSession()
 

    const router = useRouter()

    const handleCart = async () => {
        if (session?.user) {
            const id = session?.user.id
            try {
                const response = await axios.post('/api/carts', {
                    roomId: roomId,
                    toolId: toolId,
                    userId: session.user.id,
                }).then((response) => {
                    router.push('/carts');
                    console.log(response.data);
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            router.push('/login');
        }
    }
    
    
    return (
        <div onClick={handleCart} className='flex items-center space-x-4 bg-green-700 text-white px-6 p-2 rounded-full cursor-pointer'>
            <span>
                <CiShoppingCart size={24} />
            </span>
            <span className='text-wm font-bold'>เพิ่มตะกร้า</span>
        </div>
    )
}

export default AddCart