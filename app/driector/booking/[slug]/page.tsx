import { prisma } from '@/lib/prisma'
import React from 'react'
import Info from '../Info';

type Props = {}

export default async function Page({ params }: { params: { slug: string } }) {
    const bookingId = parseInt(params.slug, 10);

    if (isNaN(bookingId)) {
        return <div>Error: Invalid booking ID</div>;
    }

    const booking = await prisma.reservations.findUnique({
        where: {
            id: bookingId,
        },
    });
    return (
        <div className='max-w-[1280px] mx-auto px-5 py-5'>
            <div className='font-semibold text-2xl mb-2'>
                แสดงข้อมูลการจองห้องและยืม-คืนอุปกรณ์
            </div>
            <hr />
            <br />
            <br />
            <div>
                {booking && (
                    <div className='p-5'>
                        <Info id={booking.id} 
                        name={booking.name} 
                        objective={booking.objective} 
                        startdate={booking.startdate} 
                        enddate={booking.enddate} 
                        details={booking.details} 
                        note={booking.note}
                        roomId={booking.roomId}
                        userId={booking.userId}
                        toolId={booking.toolId}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}