import { prisma } from '@/lib/prisma';
import React from 'react'
import Info from '../Info';

type Props = {}

export default async function page({ params }: { params: { slug: string } }) {
    const roomId = parseInt(params.slug, 10);

    if (isNaN(roomId)) {
        return <div>Error: Invalid room ID</div>;
    }

    const room = await prisma.rooms.findUnique({
        where: {
            id: roomId,
        },
    });

    return (
        <div className='max-w-[1280px] mx-auto px-5 py-5'>
            <div className='font-semibold text-2xl mb-2'>
                แสดงข้อมูลห้อง
            </div>
            <hr />
            <br />
            <br />
            <div>
                {
                    room && (
                        <div className='p-5'>
                            <Info id={room.id}
                                room={room.room}
                                name={room.name}
                                details={room.details}
                                no={room.no}
                                building={room.building}
                                location={room.location}
                                roomimage={room.roomimage}
                            />

                        </div>
                    )
                }
            </div>
        </div>
    )
}
