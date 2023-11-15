'use client'

import React from 'react'
import AddCart from '../components/AddCart'

type Props = {
    id: number
    room: string
    name: string
    details: string
    no: string
    building: string
    location: string
}

const Info: React.FC<Props> = ({ id, name, details, no, building, location }) => {
    return (
        <div className='relative info '>
            <div className='p-3'>
            <h1 className='text-3xl font-bold'>{name}</h1>
            <h3 className='text-lg text-zinc-500 font-semibold'>{building}</h3>
            <h3 className='font-bold mt-8 mb-3 text-xl'>จำนวนที่นั่ง</h3>
            <div className='flex items-center '>
                <h3 className='text-lg text-zinc-500 font-semibold  ml-5'>{no}</h3>
                <h3 className='text-lg text-zinc-500 font-semibold  ml-5'>ที่นั่ง</h3>
            </div>
            <h3 className='font-bold mt-8 mb-3 text-xl'>รายละเอียด</h3>
            <div className='flex items-center '>
                <h3 className='text-lg text-zinc-500 font-semibold  ml-5'>{details}</h3>
            </div>
            <h3 className='font-bold mt-8 mb-3 text-xl'>ตำแหน่ง</h3>
            <div className='flex items-center '>
                <a
                    href={location}
                    target='_blank'
                    className='text-lg  font-semibold text-amber-700 ml-5 underline cursor-pointer text-ellipsis'
                >
                    {location}
                </a>
            </div>
            <div className='flex items-center mt-7 space-x-10'>
                <div className='ml-10'>
                    <AddCart roomId={id} />
                </div>
            </div>
            </div>
        </div>
    );
};
export default Info