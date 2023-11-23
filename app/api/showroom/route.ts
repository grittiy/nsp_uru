import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const activeRooms = await prisma.rooms.findMany({
        where: {
            active: true,
        },
    });
    return NextResponse.json(activeRooms)
}
