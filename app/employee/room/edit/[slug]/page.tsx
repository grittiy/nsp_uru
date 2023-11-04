import React from 'react'
import { prisma } from '@/lib/prisma'
import Edit from '../Edit'


type Props = {
}

const EditRoom = async ({ params }: { params: { slug: string } }) => {
    const roomId = parseInt(params.slug, 10)

    if (isNaN(roomId)) {
        return <main>
            Invalid room ID</main>
    }


    try {
        const room = await prisma.rooms.findUnique({
            where: {
                id: roomId
            }
        })

        if (!room) {
            return <div>Product id not fount</div>
        }

        return (
            <div>
                   <title>แก้ไขข้อมูลห้อง | NSP URU</title>
                <Edit {...room} />
            </div>
        )
    } catch (error) {
        console.log("Error", error)
        return <div>Error fetching room</div>
    }
}


export default EditRoom