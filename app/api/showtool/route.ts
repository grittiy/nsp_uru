// pages/api/showtool.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const activeTools = await prisma.tools.findMany({
            where: {
                active: true,
            },
        });
        return NextResponse.json(activeTools);
    } catch (error) {
        console.error('Prisma Client Error:', error);
        throw error; // rethrow the error to let Next.js handle it
    }
}
