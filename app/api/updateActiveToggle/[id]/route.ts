import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request, { params }: { params: { id: string } }
) {
    const id = params.id
    const json = await req.json()
    const updated = await prisma.tools.update({
        where: {
            id: parseInt(id, 10)
        },
        data: json
    })
    return NextResponse.json(updated)
}