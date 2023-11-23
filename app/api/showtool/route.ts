import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const activeRooms = await prisma.tools.findMany({
        where: {
            active: true,
        },
    });
    return NextResponse.json(activeRooms)
}
