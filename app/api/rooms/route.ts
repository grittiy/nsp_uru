import { prisma } from "@/lib/prisma";
import { dividerClasses } from "@mui/material";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    const rooms = await prisma.rooms.findMany({})
    // console.log(room)
    return NextResponse.json(rooms)
}

// export async function POST(request: Request) {
//     const body = await request.json()
//     const {
//         name,
//         details,
//         sit_no,
//         building,
//         location,
//         roomimage
//     } = body

//     try {
//         const room = await prisma.room.create({
//             data:{
//                 name,
//                 details,
//                 sit_no,
//                 building,
//                 location,
//                 roomimage
//             }
//         })
//         return NextResponse.json(room)
        
//     } catch (error) {
//         console.log('Error creating the room', error)
//         return NextResponse.error
//     }
// }

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

// export async function POST(request: Request) {
//     const json = await request.json()

//     const created = await prisma.rooms.create({
//         data: json
//     })

//     return new NextResponse(JSON.stringify(created), {status: 201})
    
// }

// export async function DELETE(request:Request) {
//     const body = await request.json()
//     const {roomId} =body

//     try {
//         const deleteRoom = await prisma.rooms.delete({
//             where: {
//                 id: roomId
//             }
//         })
//         console.log(deleteRoom)
//         return NextResponse.json(deleteRoom)
//     } catch (error) {
//         console.log('Error deleting the room', error)
//         return NextResponse.error()
//     }
// }