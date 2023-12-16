import { prisma } from '@/lib/prisma'
import React from 'react'
import Info from '../Info';

type Props = {}

export default async function Page({ params }: { params: { slug: string } }) {
    const checkId = parseInt(params.slug, 10);

    if (isNaN(checkId)) {
        return <div>Error: Invalid check ID</div>;
    }

    const chack = await prisma.checks.findUnique({
        where: {
            id: checkId,
        },
    });
    return (
        <div className='max-w-[1280px] mx-auto px-5 py-5'>
            <div className='font-semibold text-2xl mb-2'>
                แสดงข้อมูลสถานะการจองห้องและยืม-คืนอุปกรณ์
            </div>
            <hr />
            <br />
            <br />
            <div>
                {chack && (
                    <div className='p-5'>
                        <Info id={chack.id}                       
                        ch={chack.ch} 
                        status={chack.status} 
                        toolId={chack.toolId} 
                        roomId={chack.roomId} 
                        bookingId={chack.bookingId} 
                        details={chack.details} 
                        note={chack.note}
                        userId={chack.userId}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}