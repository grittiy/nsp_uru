import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    try {
        const roomsOnly = await prisma.rooms.findMany({
            where: {
                active: true,
            },
        });

        const toolsOnly = await prisma.tools.findMany({
            where: {
                active: true,
            },
        });
        

        return NextResponse.json({ message: "API route is working", roomsOnly, toolsOnly });    } catch (error) {
        console.error("Error selecting product", error);
        return NextResponse.error();
    }
}
