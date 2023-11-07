import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function GET(req: Request) {
    const tools = await prisma.tools.findMany({})
    // console.log(room)
    return NextResponse.json(tools)
}

export async function POST(request: Request) {
    const body = await request.json();
    const {
       num,
       name,
       band,
       number,
       toolimage,
       toolrate,
       internal,
       external,
       rate,
       details,
       breakdown,
       repair,
       lost
    } = body;

    // Check if any of the values is null and provide default values
    const nonNullNumber = number || 0;
    const nonNullBreakdown = breakdown || 0;
    const nonNullRepair = repair || 0;
    const nonNullLost = lost || 0;

    // Calculate the balance
    const balance = nonNullNumber - (nonNullBreakdown + nonNullRepair + nonNullLost);

    try {
        const tool = await prisma.tools.create({
            data: {
                num,
                name,
                band,
                number: nonNullNumber,
                balance,
                toolimage,
                toolrate,
                internal,
                external,
                rate,
                details,
                breakdown: nonNullBreakdown,
                repair: nonNullRepair,
                lost: nonNullLost
            }
        });
        console.log(tool);
        return NextResponse.json(tool);
    } catch (error) {
        console.log('Error creating the tool', error);
        return NextResponse.error();
    }
}
