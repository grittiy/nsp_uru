import { prisma } from "@/lib/prisma"
import {  NextResponse } from "next/server"

export async function GET(req: Request) {
    const carts = await prisma.carts.findMany({})
    // console.log(room)
    return NextResponse.json(carts)
}

export async function POST(request: Request) {
    const body = await request.json()
    const { roomId, toolId, userId } = body
    

    try {
        if (roomId) {
            const existingCartItem = await prisma.carts.findFirst({
                where: {
                    roomId,
                    userId
                }
            })

            if (!existingCartItem) {
                const rooms = await prisma.carts.create({
                    data: {
                        roomId,
                        userId
                    }
                })
                return NextResponse.json(rooms)
            }
        } else if (toolId) {
            const existingCartItem2 = await prisma.carts.findFirst({
                where: {
                    toolId,
                    userId
                }
            })

            if (!existingCartItem2) {
                const tool = await prisma.carts.create({
                    data: {
                        userId,
                        toolId
                    }
                })
                return NextResponse.json(tool)
            }
        }
    } catch (error) {
        console.log('Error adding product to cart', error)
        return NextResponse.error()
    }
}

export async function DELETE(request:Request) {
    const body = await request.json()
    const {roomId,toolId, userId} = body

    try {
        const deleteCart = await prisma.carts.deleteMany({
            where:{
                roomId,
                toolId,
                userId
            }
        })
        return NextResponse.json(deleteCart)
    } catch (error) {
        console.log("Error deleting product", error)
        return NextResponse.error()
    }
}