import React from 'react'
import { prisma } from '@/lib/prisma'
import Edit from '../Edit'

enum PriceType {
    Null = "NULL",
    sample = "SAMPLE",
    day = "DAY",
    rates = "RATES"
}

type Props = {
    id: number
    tool: string
    num: string
    name: string
    band: string
    number: number
    toolimage: string
    toolrate: PriceType
    internal: number | 0
    external: number | 0
    rate: string | null
    details: string | null
    breakdown: number | 0
    repair: number | 0
    lost: number | 0
}

const EditTool = async ({ params }: { params: { slug: string } }) => {
    const toolId = parseInt(params.slug, 10)
    if (isNaN(toolId)) {
        return (
            <main>  Invalid tool ID</main>
        )
    }

    try {
        const tool = await prisma.tools.findUnique({
            where: {
                id: toolId
            }
        })

        if (!tool) {
            return <div>Product id not fount</div>
        }

        const toolProps: Props = {
            id: tool.id,
            tool: tool.tool,
            num: tool.num,
            name: tool.name,
            band: tool.band,
            number: tool.number,
            toolimage: tool.toolimage,
            toolrate: tool.toolrate as PriceType,
            internal: tool.internal ?? 0,
            external: tool.external ?? 0,
            rate: tool.rate,
            details: tool.details,
            breakdown: tool.breakdown ?? 0,
            repair: tool.repair ?? 0 ,
            lost: tool.lost ?? 0
        }

        return (
            <div>
                <title>แก้ไขข้อมูลเครื่องมือ | NSP URU</title>
                <Edit {...toolProps}/>
            </div>
        )
    } catch (error) {
        console.log("Error", error)
        return <div>Error fetching tool</div>
    }
}

export default EditTool