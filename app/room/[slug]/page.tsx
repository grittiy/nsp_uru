
import { prisma } from '@/lib/prisma'
import React from 'react'
import ImageGallery from '../ImageGallery'
import Info from '../Info';

type Props = {}

export default async function Page({ params }: { params: { slug: string } }) {
    const roomId = parseInt(params.slug, 10);
    
  if (isNaN(roomId)) {
    return <div>Error: Invalid Room ID</div>;
  }
    
    const room = await prisma.rooms.findUnique({
        where: {
            id: roomId,
        },
    });
    const urlString = room?.roomimage;
    return (
        <div className='max-w-[1280px] mx-auto px-5 py-5'>
            <div className='font-semibold text-2xl mb-2'>
                <a href="/">บริการต่างๆ</a>
            </div>
            <hr />
            <div>
                {room && (
                    <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-14'>
                        {urlString && (
                            <ImageGallery imageUrls={urlString} />
                        )}
                        <Info id={room.id} room={room.room} name={room.name} details={room.details} no={room.no} building={room.building} location={room.location} />
                    </div>
                )}
            </div>
        </div>
    )
}
