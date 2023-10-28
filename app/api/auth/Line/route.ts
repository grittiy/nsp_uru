import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request, res: Response) {
    try {
        //code
        console.log(req.body)
        // const {} = req.body
        
    //    const user = await prisma.user.upsert({
    //     where: {
    //         lineId: profile.userId,

    //     },
    //     create: {
    //         email: profile.email,
    //         name: profile.displayName,
    //         avatar: (profile as any).pictureUrl,
    //         lineId: profile.userId,
    //         statusMessage: profile.statusMessage,
    //         password: profile.displayName,
    //     },
    //     update:{
    //         email: profile.email,
    //         name: profile.displayName,
    //         avatar: (profile as any).pictureUrl,
    //         statusMessage: profile.statusMessage,
    //     }
    //    })
       
    } catch (err: any) {
        return new NextResponse(JSON.stringify({
            error: err.massage
        }), {
            status: 500
        })
    }
}
    
