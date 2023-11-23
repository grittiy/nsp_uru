
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const allactiveRooms = await prisma.rooms.findMany({
            where: {
                active: true,
            },
        });
        return NextResponse.json(allactiveRooms);
    } catch (error) {
        console.error('Prisma Client Error:', error);
        return NextResponse.error()
    }
}
