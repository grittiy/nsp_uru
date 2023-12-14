import { prisma } from '@/lib/prisma';
import React from 'react'
import Info from '../Info';

type Props = {}

export default async function page({ params }: { params: { slug: string } }) {
    const userId = parseInt(params.slug, 10);

    if (isNaN(userId)) {
        return <div>Error: Invalid user ID</div>;
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    return (
        <div className='max-w-[1280px] mx-auto px-5 py-5'>
            <div className='font-semibold text-2xl mb-2'>
                แสดงข้อมูลผู้ใช้งาน
            </div>
            <hr />
            <br />
            <br />
            <div>
                {
                    user && (
                        <div className = 'p-5'>

                            <Info id = { user.id } 
                                usr = { user.usr }
                                name = { user.name }
                                email = { user.email }
                                pname = { user.pname }
                                fname = { user.fname }
                                sex = { user.sex }
                                position = { user.position }
                                person = { user.person }
                                phone = { user.phone }
                                fax = { user.fax }
                                organizationName = { user.organizationName }
                                type = { user.type }
                                internalType = { user.internalType }
                                externalType = { user.externalType }
                                avatar = { user.avatar }
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}
