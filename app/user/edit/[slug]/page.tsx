import { prisma } from '@/lib/prisma'
import React from 'react'
import EditBooking from '../Edit'

type Props = {
    id: number
    userId: number
    toolId: number | null
    roomId: number | null
    name: string
    objective: string
    startdate: Date;
    enddate: Date;
    details: string | null
    note: string | null
}

const EditStatement = async ({ params }: { params: { slug: string } }) => {
    const bookingId = parseInt(params.slug, 10)

    if (isNaN(bookingId)) {
        return <main>
            Invalid room ID</main>
    }

    try {
        const booking = await prisma.reservations.findUnique({
            where: {
                id: bookingId
            }
        })

        if (!bookingId) {
            return <div>Product id not fount</div>
        }

        const bookingProps: Props = {
            id: booking?.id ?? 0,
            userId: booking?.userId ?? 0,
            toolId: booking?.toolId ?? null,
            roomId: booking?.roomId ?? null,
            name: booking?.name ?? "",
            objective: booking?.objective ?? "",
            startdate: booking?.startdate ?? new Date(),
            enddate: booking?.enddate ?? new Date(),
            details: booking?.details ?? null,
            note: booking?.note ?? null
        }

        return (
            <div>
                <title>แก้ไขข้อมูลการจองห้องและการยืมคืนอุปกรณ์ | NSP URU</title>
                <EditBooking {...bookingProps} />
            </div>
        )

    } catch (error) {
        console.log("Error", error)
        return <div>Error fetching reservations</div>
    }

}

export default EditStatement