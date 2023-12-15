import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    const check = await prisma.checks.findMany({})
    return NextResponse.json(check)
}

export async function POST(request: Request) {
    const body = await request.json();
    const { status, toolId, roomId, bookingId, userId, details, note } = body

    try {
        let checkData;

        if (roomId) {
            const checkRoomItem = await prisma.checks.findFirst({
                where: {
                    roomId,
                    bookingId
                }
            })

            if (!checkRoomItem) {
                checkData = {
                    status,
                    roomId,
                    bookingId,
                    details,
                    note,
                    userId
                }
            }
        } else if (toolId) {
            const checkToolItem = await prisma.checks.findFirst({
                where: {
                    toolId,
                    bookingId
                }
            })

            if (!checkToolItem) {
                checkData = {
                    status,
                    toolId,
                    bookingId,
                    details,
                    note,
                    userId
                }
            }
        }

        if (checkData) {
            const check = await prisma.checks.create({
                data: checkData
            })
            return NextResponse.json(check);
        }

    } catch (error) {
        console.log("Error creating check", error);
        return NextResponse.error();
    }
}