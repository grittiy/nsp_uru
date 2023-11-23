// import { prisma } from '@/lib/prisma';
'use client'
import { Grid, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Mali } from 'next/font/google'


const prompt = Mali({
    weight: ["300", "400"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});

const API_ENDPOINT = '/api/carts';

type Props = {
    userId: number;
    roomId: string | null;
    toolId: string | null;
}

const ShowdataBooking = (props: Props) => {
    const [allcartproduct, setAllCartProduct] = useState<any[]>([]);
    const [cartRooms, setCartRooms] = useState<any[]>([]);
    const [cartTools, setCartTools] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_ENDPOINT}?userId=${props.userId}`);
                const data = await response.json();

                setAllCartProduct(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [props.userId]);


    useEffect(() => {
        const fetchCartData = async () => {
            const cartRoomPromises = allcartproduct.map((cartRoom) => {
                if (cartRoom.roomId !== null) {
                    return fetch(`/api/rooms/${cartRoom.roomId}`).then((res) => res.json());
                }
                return null;
            });

            const cartToolPromises = allcartproduct.map((cartTool) => {
                if (cartTool.toolId !== null) {
                    return fetch(`/api/tools/${cartTool.toolId}`).then((res) => res.json());
                }
                return null;
            });

            const roomData = await Promise.all(cartRoomPromises);
            const toolData = await Promise.all(cartToolPromises);

            console.log('roomData:', roomData);
            console.log('toolData:', toolData);

            setCartRooms(roomData);
            setCartTools(toolData);
        };

        fetchCartData();
    }, [allcartproduct]);

    // const allcartproduct = await prisma.carts.findMany({
    //     where: {
    //         userId: props.userId
    //     }
    // })
    // const cartRoomPromises = allcartproduct.map((cartRoom) => {
    //     if (cartRoom.roomId !== null) {
    //         return prisma.rooms.findUnique({
    //             where: {
    //                 id: cartRoom.roomId
    //             }
    //         });
    //     }
    //     return null;
    // });
    // const cartToolPromises = allcartproduct.map((cartTool) => {
    //     if (cartTool.toolId !== null) {
    //         return prisma.tools.findUnique({
    //             where: {
    //                 id: cartTool.toolId
    //             }
    //         });
    //     }
    //     return null;
    // });

    // // console.log(allcartproduct)
    // const cartRooms = await Promise.all(cartRoomPromises)
    // const cartTools = await Promise.all(cartToolPromises)

    const roomId = allcartproduct.map((item) => item.roomId).filter((id) => id !== null)[0] as number | undefined;
    const toolId = allcartproduct.map((item) => item.toolId).filter((id) => id !== null)[0] as number | undefined;
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
            <div >
                <Paper elevation={6} >
                    {filteredCartRooms.map((cartRoom) => (
                        <Paper key={cartRoom?.id}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <div className='p-5 ml-20' >
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, fontWeight: 'bold' }} gutterBottom variant="subtitle1" component="div">
                                            ห้อง
                                        </Typography>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
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
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={8} >
                                    <div className='p-4'>
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16, fontWeight: 'bold' }} variant="body2" gutterBottom>
                                            {cartRoom?.name}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
                </Paper>
            </div>
        </React.Fragment>
    )
}

export default ShowdataBooking