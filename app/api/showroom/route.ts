// pages/api/showroom.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const activeRooms = await prisma.rooms.findMany({
            where: {
                active: true,
            },
        });
        return NextResponse.json(activeRooms);
    } catch (error) {
        console.error('Prisma Client Error:', error);
        throw error; // rethrow the error to let Next.js handle it
    }
}
