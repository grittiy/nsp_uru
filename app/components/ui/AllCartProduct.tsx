import { prisma } from '@/lib/prisma'
import React from 'react'
import Image from 'next/image'
import DeleteCart from './DeleteCart'
import Link from 'next/link'
import Button from './Button'
import { ButtonBase, Card, CardMedia, Grid, Paper, Typography } from '@mui/material'
import { Mali } from 'next/font/google'

const prompt = Mali({
    weight: ["300", "400"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});

type Props = {
    userId: number
    roomId: number | null
    toolId: number | null
}



const AllCartProduct = async (props: Props) => {
    

    const allcartproduct = await prisma.carts.findMany({
        where: {
            userId: props.userId
        }
    })

    const cartRoomPromises = allcartproduct.map((cartRoom) => {
        if (cartRoom.roomId !== null) {
            return prisma.rooms.findUnique({
                where: {
                    id: cartRoom.roomId
                }
            });
        }
        return null;
    });
    const cartToolPromises = allcartproduct.map((cartTool) => {
        if (cartTool.toolId !== null) {
            return prisma.tools.findUnique({
                where: {
                    id: cartTool.toolId
                }
            });
        }
        return null;
    });

    // console.log(allcartproduct)
    const cartRooms = await Promise.all(cartRoomPromises)
    const cartTools = await Promise.all(cartToolPromises)

    const roomIds = allcartproduct.map((item) => item.roomId);
    const toolIds = allcartproduct.map((item) => item.toolId);

    if (cartRooms.length === 0 && cartTools.length === 0) {
        return (
            <div className='relative flex items-center justify-center'>
                <h1 className='absolute top-[80%] text-2xl text-purple-600'>Empty Cart</h1>
            </div>
        )
    }
    const filteredCartRooms = cartRooms.filter(cartRoom => cartRoom !== null && cartRoom?.id !== null);
    const filteredCartTools = cartTools.filter(cartTool => cartTool !== null && cartTool?.id !== null);
    return (
        <React.Fragment>
            <div className='mt-14'>
                {filteredCartRooms.map((cartRoom) => (
                    <Paper
                        key={cartRoom?.id}
                        sx={{
                            p: 2,
                            margin: 'auto',
                            maxWidth: 600,
                            flexGrow: 1,
                            mb: 2,
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase sx={{ width: 150, height: 128 }}>
                                    <Link href={`/room/${cartRoom?.id}`}>
                                        {cartRoom?.roomimage.split(',')[0] !== undefined && (
                                            <Image
                                                alt="complex"
                                                src={cartRoom.roomimage.split(',')[0]}
                                                width={200}
                                                height={200}
                                                style={{
                                                    maxWidth: '100%',
                                                    maxHeight: '100%',
                                                    width: 'auto',
                                                }}
                                            />
                                        )}
                                    </Link>
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, fontWeight: 'bold' }} gutterBottom variant="subtitle1" component="div">
                                            {cartRoom?.name}
                                        </Typography>
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                            {cartRoom?.building}
                                        </Typography>
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 15 }} variant="body2" color="text.secondary">
                                            จำนวน {cartRoom?.no} ที่นั่ง
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <DeleteCart roomId={cartRoom?.id} userId={props.userId} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
                {filteredCartTools.map((cartTool) => (
                    <Paper
                        key={cartTool?.id}
                        sx={{
                            p: 2,
                            margin: 'auto',
                            maxWidth: 600,
                            flexGrow: 1,
                            mb: 2,
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase sx={{ width: 150, height: 128 }}>
                                    <Link href={`/tool/${cartTool?.id}`}>
                                        {cartTool?.toolimage.split(',')[0] !== undefined && (
                                            <Image
                                                alt="complex"
                                                src={cartTool.toolimage.split(',')[0]}
                                                width={200}
                                                height={200}
                                                style={{
                                                    maxWidth: '100%',
                                                    maxHeight: '100%',
                                                    width: 'auto',
                                                }}
                                            />
                                        )}
                                    </Link>
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, fontWeight: 'bold' }} gutterBottom variant="subtitle1" component="div">
                                            {cartTool?.name}
                                        </Typography>
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 15 }} variant="body2" color="text.secondary">
                                            อัตราค่าบริการ
                                        </Typography>
                                        {cartTool?.toolrate === 'SAMPLE' && (
                                            <Typography variant="body2" align="center" sx={{ fontFamily: prompt.style.fontFamily, fontSize: 14 }}>
                                                บุคลากรภายใน   {cartTool.internal}  บาทต่อตัวอย่าง
                                                <br />
                                                บุคลากรภายนอก {cartTool.external} บาทต่อตัวอย่าง
                                            </Typography>
                                        )}
                                        {cartTool?.toolrate === 'HOUR' && (
                                            <Typography variant="body2" align="center" sx={{ fontFamily: prompt.style.fontFamily, fontSize: 14 }}>
                                                บุคลากรภายใน   {cartTool.internal}  บาทต่อชั่วโมง
                                                <br />
                                                บุคลากรภายนอก {cartTool.external} บาทต่อชั่วโมง
                                            </Typography>
                                        )}
                                        {cartTool?.toolrate === 'DAY' && (
                                            <Typography variant="body2" align="center" sx={{ fontFamily: prompt.style.fontFamily, fontSize: 14 }}>
                                                บุคลากรภายใน   {cartTool.internal}  บาทต่อวัน
                                                <br />
                                                บุคลากรภายนอก {cartTool.external} บาทต่อวัน
                                            </Typography>
                                        )}
                                        {cartTool?.toolrate === 'RATES' && (
                                            <Typography variant="body2" align="center" sx={{ fontFamily: prompt.style.fontFamily, fontSize: 14 }}>
                                                {cartTool.rate}
                                            </Typography>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <DeleteCart toolId={cartTool?.id} userId={props.userId} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
                <Button roomIds={roomIds} toolIds={toolIds} userId={props.userId} />
            </div>
        </React.Fragment >
    )
}

export default AllCartProduct