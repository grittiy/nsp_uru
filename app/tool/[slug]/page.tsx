
import ImageGallery from '@/app/room/ImageGallery';
import { prisma } from '@/lib/prisma'
import React from 'react'
import Info from '../Info';

type Props = {}

export default async function Page({ params }: { params: { slug: string } }) {
    const toolId = parseInt(params.slug, 10);
    
  if (isNaN(toolId)) {
    return <div>Error: Invalid Room ID</div>;
  }
    
    const tool = await prisma.tools.findUnique({
        where: {
            id: toolId,
        },
    });
    const urlString = tool?.toolimage;
    return (
        <div className='max-w-[1280px] mx-auto px-5 py-5'>
            <div className='font-semibold text-2xl mb-2'>
                <a href="/">บริการต่างๆ</a>
            </div>
            <hr />
            <div>
                {tool && (
                    <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-14'>
                        {urlString && (
                            <ImageGallery imageUrls={urlString} />
                        )}
                        <Info 
                        id={tool.id} 
                        num={tool.num} 
                        tool={tool.tool} 
                        name={tool.name} 
                        details={tool.details} 
                        balance={tool.balance} 
                        toolrate={tool.toolrate}  
                        internal={tool.internal} 
                        external={tool.external} 
                        rate={tool.rate}/>
                    </div>
                )}
            </div>
        </div>
    )
}
