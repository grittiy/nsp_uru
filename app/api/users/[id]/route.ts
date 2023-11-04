import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function GET(
    req: Request, { params }: { params: { id: string } }
) {
    const id = params.id
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id, 10)
        }
    })
    return NextResponse.json(user)

}

export async function PUT(
    req: Request, { params }: { params: { id: string } }
) {
    const id = params.id
    const json = await req.json()
    const updated = await prisma.user.update({
        where: {
            id: parseInt(id, 10)
        },
        data: {
            name: json.name || null,
            email: json.email || null,
            avatar: json.avatar || null,
            password: json.password || null,
            lineId: json.lineId || null,
            role: json.role || null,
            pname: json.pname || null,
            fname: json.fname || null,
            sex: json.sex || null,
            position: json.position || null,
            person: json.person || null,
            phone: json.phone || null,
            fax: json.fax || null,
            type: json.type || null,
            organizationName: json.organizationName || null,
            internalType: json.internalType || null,
            externalType: json.externalType || null,
        }
    })
    return NextResponse.json(updated)
}

export async function PATCH(
    req: Request, { params }: { params: { id: string } }
) {
    const id = params.id
    const json = await req.json()
    const updated = await prisma.user.update({
        where: {
            id: parseInt(id, 10)
        },
        data: json
    })
    return NextResponse.json(updated)
}

export async function DELETE(
    req: Request, { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const deleted = await prisma.user.delete({
            where: {
                id: parseInt(id, 10)
            }
        })

        if (deleted) {
            return new NextResponse(JSON.stringify({
                message: "success",
                status: 200,
                id: id
            }), { status: 200 })
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