import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
    req: Request, {params}:{params: {id:string}}
    ) {
        
    const id = params.id
    const room = await prisma.rooms.findUnique({
        where: {
            id: parseInt(id, 10)
        }
    })
    return NextResponse.json(room)
}

export async function PUT(
    req: Request, {params}:{params: {id:string}}
) {
    const id = params.id
    const json = await req.json()
    const updated = await prisma.rooms.update({
        where: {
            id: parseInt(id, 10 )
        },
        data: {
            name: json.name || null,
            details: json.details || null,
            no: json.no || null, // Corrected field name
            building: json.building || null,
            location: json.location || null,
            roomimage: json.roomimage || null
             
        }
    })
    return NextResponse.json(updated)
}

export async function PATCH(
    req: Request, {params}:{params: {id:string}}
) {
    const id = params.id
    const json = await req.json()
    const updated = await prisma.rooms.update({
        where: {
            id: parseInt(id, 10 )
        },
        data:json
    })
    return NextResponse.json(updated)
}

export async function DELETE(
    req: Request, { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const deleted = await prisma.rooms.delete({
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
    } catch (error : any) {
        return new NextResponse(JSON.stringify({
            status: 500,
            error: error.toString()
        }), { status: 500 });
    }
}
