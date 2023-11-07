import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
    req: Request, { params }: { params: { id: string } }
) {

    const id = params.id
    const tool = await prisma.tools.findUnique({
        where: {
            id: parseInt(id, 10)
        }
    })
    return NextResponse.json(tool)
}

export async function PUT(
    req: Request, { params }: { params: { id: string } }
) {
    const id = params.id
    const json = await req.json()
    const { number, breakdown, repair, lost } = json
    const nonNullNumber = number || 0;
    const nonNullBreakdown = breakdown || 0;
    const nonNullRepair = repair || 0;
    const nonNullLost = lost || 0;
    const balance = nonNullNumber - (nonNullBreakdown + nonNullRepair + nonNullLost);
    const updated = await prisma.tools.update({
        where: {
            id: parseInt(id, 10)
        },
        data: {
            num: json.num || null,
            name: json.name || null,
            band: json.band || null,
            number: nonNullNumber || null,
            toolimage: json.toolimage || null,
            toolrate: json.toolrate || null,
            internal: json.internal || null,
            external: json.external || null,
            rate: json.rate || null,
            details: json.details || null,
            breakdown: nonNullBreakdown || null,
            repair: nonNullRepair || null,
            lost: nonNullLost || null,
            balance
        }
    })
    return NextResponse.json(updated)
}

export async function PATCH(
    req: Request, { params }: { params: { id: string } }
) {
    const id = params.id
    const json = await req.json()

    // ดึงค่าเดิมจากฐานข้อมูล
    const existingTool = await prisma.tools.findUnique({
        where: {
            id: parseInt(id, 10)
        }
    });

    if (!existingTool) {
        return NextResponse.error();
    }

    // ตรวจสอบการเปลี่ยนแปลงของ breakdown, repair และ lost
    const hasBreakdownChanged = json.breakdown !== existingTool.breakdown;
    const hasRepairChanged = json.repair !== existingTool.repair;
    const hasLostChanged = json.lost !== existingTool.lost;

    // Set default values for repair and lost if they are undefined
    const updatedRepair = json.repair ?? existingTool.repair;
    const updatedLost = json.lost ?? existingTool.lost;

    // คำนวณ balance ใหม่
    const balance = existingTool.number - (
        hasBreakdownChanged ? json.breakdown : existingTool.breakdown
    ) - (
            hasRepairChanged ? updatedRepair : existingTool.repair
        ) - (
            hasLostChanged ? updatedLost : existingTool.lost
        );

    const updated = await prisma.tools.update({
        where: {
            id: parseInt(id, 10)
        },
        data: {
            ...json,
            balance
        }
    })
    return NextResponse.json(updated)
}


export async function DELETE(
    req: Request, { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const deleted = await prisma.tools.delete({
            where: {
                id: parseInt(id, 10)
            }
        });

        if (deleted) {
            return new NextResponse(JSON.stringify({
                message: "success",
                status: 200,
                id: id
            }), { status: 200 });
        } else {
            return new NextResponse(JSON.stringify({
                message: "error",
                status: 404,
                id: id
            }), { status: 404 });
        }
    } catch (error: any) {
        return new NextResponse(JSON.stringify({
            status: 500,
            error: error.toString()
        }), { status: 500 });
    }
}
