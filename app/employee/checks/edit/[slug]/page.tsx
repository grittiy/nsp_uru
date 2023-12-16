import { prisma } from '@/lib/prisma'
import React from 'react'
import Edit from '../Edit'

type Props = {
    id: number
    ch: string
    userId: number | null
    toolId: number | null
    roomId: number | null 
    bookingId: number | null 
    status: string
    details: string  | null
    note: string  | null
}

const EditCheckRoom = async ({ params }: { params: { slug: string } }) => {
    const checkId = parseInt(params.slug, 10)

    if (isNaN(checkId)) {
        return <main>
            Invalid Checkroom ID
        </main>
    }

    try {
        const check = await prisma.checks.findUnique({
            where: {
                id: checkId
            }
        })

        if (!checkId) {
            return <div>Product id not fount</div>
        }

        const checkProp: Props = {
            id: check?.id ?? 0,
            ch: check?.ch ?? "",
            status: check?.status ?? "",
            toolId: check?.toolId ?? null,
            roomId: check?.roomId ?? null,
            bookingId: check?.bookingId ?? null,
            userId: check?.userId ?? 0,
            details: check?.details ?? null,
            note: check?.note ?? null
        }

        return (
            <div>
                <title>แก้ไขข้อมูลการตรวจสอบสถานะการจองห้อง | NSP URU</title>
                <Edit {...checkProp}/>
            </div>
        )
        
    } catch (error) {
        
    }


    return (
        <div>page</div>
    )
}

export default EditCheckRoom