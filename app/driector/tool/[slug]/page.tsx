import { prisma } from '@/lib/prisma';
import React from 'react'
import Info from '../Info';



type Props = {}

export default async function page({ params }: { params: { slug: string } }) {
    const toolId = parseInt(params.slug, 10);

    if (isNaN(toolId)) {
        return <div>Error: Invalid tool ID</div>;
    }

    const tool = await prisma.tools.findUnique({
        where: {
            id: toolId,
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
                    tool && (
                        <div className='p-5'>
                            <Info id={tool.id}
                                tool={tool.tool}
                                num={tool.num}
                                name={tool.name}
                                band={tool.band}
                                number={tool.number}
                                balance={tool.balance}
                                toolrate={tool.toolrate}
                                internal={tool.internal}
                                external={tool.external} 
                                rate={tool.rate}
                                details={tool.details}
                                breakdown={tool.breakdown}
                                repair={tool.repair}
                                lost={tool.lost}
                                toolimage={tool.toolimage}
                                active={tool.active}
                            />

                        </div>
                    )
                }
            </div>
        </div>
    )
}
