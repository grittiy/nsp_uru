'use client'
import React, { useEffect, useState } from 'react'
import { Mali } from 'next/font/google'
import { Button, Grid, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import AddBooking from './AddBooking';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const prompt = Mali({
    weight: ["300", "400"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});

const API_ENDPOINT = '/api/carts';

type Props = {
    userId: number
    roomId: number | null
    toolId: number | null
}

const ShowdataBooking = (props: Props) => {
    const { data: session } = useSession()
    const router = useRouter();
    const [userCartProducts, setUserCartProducts] = useState([]);
    const [allcartproduct, setAllCartProduct] = useState<any[]>([]);
    const [bookingData, setBookingData] = useState<any>(null);
    const [cartRooms, setCartRooms] = useState<any[]>([]);
    const [cartTools, setCartTools] = useState<any[]>([]);
    const [isBookingDataAvailable, setIsBookingDataAvailable] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
    const [selectedToolId, setSelectedToolId] = useState<number | null>(null);

    const handleBookingSubmit = async (data: any, roomId: number | null, toolId: number | null) => {
        setBookingData(data);
        setIsBookingDataAvailable(true);
        setSelectedRoomId(roomId);
        setSelectedToolId(toolId);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (session) {
                    const response = await fetch(`${API_ENDPOINT}?userId=${session.user.id}`);
                    const data = await response.json();
                    console.log("session", session)
                    setAllCartProduct(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [session]);

    const handleRequestService = () => {
        if (session?.user?.role === 'USER') {
            // นำทางไปยังหน้าที่ต้องการสำหรับผู้ใช้
            router.push('/');
        } else if (session?.user?.role === 'ADMIN') {
            // นำทางไปยังหน้าที่ต้องการสำหรับแอดมิน
            router.push('/admin-page');
        } else if (session?.user?.role === 'EMPLOYEE') {
            // นำทางไปยังหน้าที่ต้องการสำหรับพนักงาน
            router.push('/employee/statement');
        }
        // เพิ่มเงื่อนไขเพิ่มเติมตามต้องการ
    };


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


            setCartRooms(roomData);
            setCartTools(toolData);
        };

        fetchCartData();
    }, [allcartproduct]);

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
            <div>
                <Paper elevation={6}>
                    {filteredCartRooms.map((cartRoom) => (
                        <Paper key={cartRoom?.id}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <div className='p-5'>
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, fontWeight: 'bold', paddingLeft: 5 }} gutterBottom variant="subtitle1" component="div">
                                            ห้อง
                                        </Typography>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                            {cartRoom?.roomimage.split('')[0] !== undefined && (
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
                                <Grid item xs={12} sm={8}>
                                    <div className='p-5'>
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16, fontWeight: 'bold' }} variant="body2" gutterBottom>
                                            {cartRoom?.name}
                                        </Typography>
                                        <div className='p-5'>
                                            <AddBooking
                                                roomId={cartRoom?.id}
                                                toolId={null}
                                                userId={props.userId}
                                                onBookingSubmit={(data) => handleBookingSubmit(data, cartRoom?.id, null)}
                                            />
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
                    {filteredCartTools.map((cartTools) => (
                        <Paper key={cartTools?.id}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <div className='p-5'>
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, fontWeight: 'bold', paddingLeft: 5 }} gutterBottom variant="subtitle1" component="div">
                                            เครื่องมือ
                                        </Typography>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                            {cartTools?.toolimage.split('')[0] !== undefined && (
                                                <Image
                                                    alt="complex"
                                                    src={cartTools.toolimage.split(',')[0]}
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
                                <Grid item xs={12} sm={8}>
                                    <div className='p-5'>
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16, fontWeight: 'bold' }} variant="body2" gutterBottom>
                                            {cartTools?.name}
                                        </Typography>
                                        <div className='p-5'>
                                            <AddBooking
                                                roomId={null}
                                                toolId={cartTools?.id}
                                                userId={props.userId}
                                                onBookingSubmit={(data) => handleBookingSubmit(data, null, cartTools?.id)}
                                            />
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
                </Paper>
                <br />
                <Button
                    variant="outlined"
                    color="success"
                    sx={{ fontFamily: prompt.style.fontFamily, marginRight: 10 }}
                    onClick={handleRequestService}
                >
                    ส่งคำร้องขอใช้บริการ
                </Button>
            </div>
        </React.Fragment>
    )
}

export default ShowdataBooking