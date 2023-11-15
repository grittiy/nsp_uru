'use client'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Mali } from 'next/font/google';
import { Button } from '@mui/material'
import { mutate } from 'swr'

const prompt = Mali({
    weight: ["300", "400"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});

type Props = {
    roomId?: number
    toolId?: number
}

const AddCarts = ({ roomId, toolId }: Props) => {
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
                    console.log(response.data);
                });
                mutate('/api/carts');
                router.refresh()
            } catch (error) {
                console.log(error);
            }
        } else {
            router.push('/login');
        }
    }

    return (
        <div>
            <Button size="small" onClick={handleCart} sx={{ fontFamily: prompt.style.fontFamily }}>เพิ่มใส่ในตะกร้า</Button>
        </div>
    )
}

export default AddCarts