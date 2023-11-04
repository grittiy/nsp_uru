import { prisma } from "@/lib/prisma";
import { dividerClasses } from "@mui/material";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    const rooms = await prisma.rooms.findMany({})
    // console.log(room)
    return NextResponse.json(rooms)
}


export async function POST(request: Request){
    const body = await request.json()
    const {
        name,
        details,
        no,
        building,
        location,
        roomimage
    } = body

    try{
        const room = await prisma.rooms.create({
            data:{
                name,
                details,
                no,
                building,
                location,
                roomimage
            }
        })
        console.log(room)
        return NextResponse.json(room)
    }
    catch(error){
        console.log('Error creating the room', error)
        return NextResponse.error()
    }
}
