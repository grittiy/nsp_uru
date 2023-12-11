import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request)  {
    const booking = await prisma.reservations.findMany({})
    return NextResponse.json(booking)
}

export async function POST(request: Request) {
    const body = await request.json();
    const { name, objective, startdate, enddate, status, details, note, toolId, roomId, userId } = body;

    try {
        let reservationData;

        if (roomId) {
            const roomItem = await prisma.reservations.findFirst({
                where: {
                    roomId,
                    userId,
                    AND: [
                        {
                            startdate: { lte: enddate },
                            enddate: { gte: startdate },
                        },
                    ]
                },
            });

            if (!roomItem) {
                reservationData = {
                    name,
                    objective,
                    startdate,
                    enddate,
                    status,
                    details,
                    note,
                    roomId,
                    userId,
                };
            }
        } else if (toolId) {
            const toolItem = await prisma.reservations.findFirst({
                where: {
                    toolId,
                    userId,
                    AND: [
                        {
                            startdate: { lte: enddate },
                            enddate: { gte: startdate },
                        },
                    ]
                },
            });

            if (!toolItem) {
                reservationData = {
                    name,
                    objective,
                    startdate,
                    enddate,
                    status,
                    details,
                    note,
                    toolId,
                    userId,
                };
            }
        }

        if (reservationData) {
            // Create reservation
            const reservation = await prisma.reservations.create({
                data: reservationData,
            });

            // Delete cart item
            await prisma.carts.deleteMany({
                where: {
                    userId,
                    roomId: reservation.roomId, // or toolId depending on the case
                    toolId: reservation.toolId,
                },
            });

            return NextResponse.json(reservation);
        }
    } catch (error) {
        console.log("Error creating reservation", error);
        return NextResponse.error();
    }
}
