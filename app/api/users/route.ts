import { prisma } from "@/lib/prisma"
import { hash } from "bcrypt"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const users = await prisma.user.findMany({})
    // console.log(room)
    return NextResponse.json(users)
}

export async function POST(request: Request) {
    try {
        const {
            email,
            password,
            name,
            avatar,
            pname,
            fname,
            sex,
            position,
            person,
            phone,
            fax,
            organizationName,
            role,
            type,
            internalType,
            externalType
        } = await request.json()
        const hashed = await hash(password, 20)

        const user = await prisma.user.create({
            data: {
                email,
                password: hashed,
                name,
                avatar,
                pname,
                fname,
                sex,
                position,
                person,
                phone,
                fax,
                organizationName,
                role,
                type,
                internalType,
                externalType
            }
        })

        return NextResponse.json({
            user: {
                email: user.email,
            }
        })
    } catch (error: any) {
        return new NextResponse(JSON.stringify({
            error: error.massage
        }), {
            status: 500
        })

    }
}