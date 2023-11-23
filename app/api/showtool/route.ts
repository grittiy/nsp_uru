
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const allactiveTools = await prisma.tools.findMany({
            where: {
                active: true,
            },
        });
        return NextResponse.json(allactiveTools);
    } catch (error) {
        console.error('Prisma Client Error:', error);
        return NextResponse.error()
    }
}
