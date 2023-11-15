'use client'
import React from 'react'
import AddCart from '../components/AddCart';

type Props = {
    id: number;
    num: string;
    tool: string;
    name: string;
    details: string | null;
    balance: number | null;
    toolrate: string | null;
    internal: number | null;
    external: number | null;
    rate: string | null;
}

const Info: React.FC<Props> = ({ id, name, details, balance, toolrate, internal, external, rate }) => {
    
    return (
        <div className='relative info '>
            <div className='p-3'>
                <h1 className='text-3xl font-bold'>{name}</h1>
                <h3 className='font-bold mt-8 mb-3 text-xl'>จำนวนเครื่องมือ</h3>
                <div className='flex items-center '>
                    <h3 className='text-lg text-zinc-500 font-semibold  ml-5'>{balance}</h3>
                    <h3 className='text-lg text-zinc-500 font-semibold  ml-5'>เครื่อง</h3>
                </div>
                <h3 className='font-bold mt-8 mb-3 text-xl'>อัตราค่าบริการ</h3>
                
                <div className='flex items-center'>
                    <div className='flex items-center'>
                        {toolrate === 'SAMPLE' && toolrate !== null && (
                            <>
                            
                                <h3 className='text-lg text-zinc-500 font-semibold ml-5'> บุคลากรภายใน {internal} บาทต่อตัวอย่าง</h3>
                                <br />
                                <h3 className='text-lg text-zinc-500 font-semibold ml-5'> บุคลากรภายนอก {external} บาทต่อตัวอย่าง</h3>
                            </>
                        )}
                        {toolrate === 'HOUR' && toolrate !== null && (
                            <>
                                <h3 className='text-lg text-zinc-500 font-semibold ml-5'> บุคลากรภายใน {internal} บาทต่อชั่วโมง</h3>
                                <br />
                                <h3 className='text-lg text-zinc-500 font-semibold ml-5'> บุคลากรภายนอก {external} บาทต่อชั่วโมง</h3>
                            </>
                        )}
                        {toolrate === 'DAY' && toolrate !== null && (
                            <>
                                <h3 className='text-lg text-zinc-500 font-semibold ml-5'> บุคลากรภายใน {internal} บาทต่อวัน</h3>
                                <br />
                                <h3 className='text-lg text-zinc-500 font-semibold ml-5'> บุคลากรภายนอก {external} บาทต่อวัน</h3>
                            </>
                        )}
                        {toolrate === 'RATES' && toolrate !== null && rate !== null && (
                            <>
                                <h3 className='text-lg text-zinc-500 font-semibold ml-5'> {rate} </h3>
                            </>
                        )}
                    </div>


                </div>
                <h3 className='font-bold mt-8 mb-3 text-xl'>รายละเอียด</h3>
                <div className='flex items-center '>
                    <h3 className='text-lg text-zinc-500 font-semibold  ml-5'>{details}</h3>
                </div>
                <div className='flex items-center mt-7 space-x-10'>
                <div className='ml-10'>
                    <AddCart toolId={id} />
                </div>
            </div>
            </div>
        </div>
    )
}

export default Info