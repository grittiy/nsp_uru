'use client'
import { Button, Grid, Paper, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { format, zonedTimeToUtc } from 'date-fns-tz';
import thLocale from 'date-fns/locale/th';
import React, { useEffect, useState } from 'react'
import { Mali } from 'next/font/google'
import Image from 'next/image';
import { useRouter } from 'next/navigation';


const prompt = Mali({
    weight: ["300", "400"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});


interface InfoProps {
    id: number;
    name: string;
    objective: string;
    startdate: Date;
    enddate: Date;
    details: string | null;
    note: string | null;
    roomId: number | null;
    userId: number;
    toolId: number | null;
}

const Info: React.FC<InfoProps> = ({ id, name, objective, startdate, enddate, details, note, roomId, userId, toolId }) => {
    const { data: session } = useSession()
    const router = useRouter();
    const [dataproduct, setDateProduct] = useState<any[]>([]);
    const [bookingRooms, setBookingRooms] = useState<any[]>([]);
    const [bookingTools, setBookingTools] = useState<any[]>([]);
    const [bookingUser, setBookingUser] = useState<any[]>([]);

    useEffect(() => {
        const fetchCartData = async () => {
            const bookingRoomPromises = [];
            const BookingToolPromises = [];
            const BookingUserPromises = [];

            if (roomId !== null) {
                bookingRoomPromises.push(fetch(`/api/rooms/${roomId}`).then((res) => res.json()));
            }

            if (toolId !== null) {
                BookingToolPromises.push(fetch(`/api/tools/${toolId}`).then((res) => res.json()));
            }
            if (userId !== null) {
                BookingUserPromises.push(fetch(`/api/users/${userId}`).then((res) => res.json()));
            }

            const roomData = await Promise.all(bookingRoomPromises);
            const toolData = await Promise.all(BookingToolPromises);
            const userData = await Promise.all(BookingUserPromises);

            setBookingRooms(roomData);
            setBookingTools(toolData);
            setBookingUser(userData);
        };

        fetchCartData();
    }, [roomId, toolId, userId]);


    const roomDataId = dataproduct.map((item) => item.roomId).filter((id) => id !== null)[0] as number | undefined;
    const toolDataId = dataproduct.map((item) => item.toolId).filter((id) => id !== null)[0] as number | undefined;

    if (bookingRooms.length === 0 && bookingTools.length === 0) {
        return (
            <div className='relative flex items-center justify-center'>
                <h1 className='absolute top-[80%] text-2xl text-purple-600'>Empty Cart</h1>
            </div>
        )
    }
    const filteredCartRooms = bookingRooms.filter(bookingRoom => bookingRoom !== null && bookingRoom?.id !== null);
    const filteredCartTools = bookingTools.filter(bookingTool => bookingTool !== null && bookingTool?.id !== null);


    return (
        <React.Fragment>
            <div>
                {filteredCartRooms.map((bookingRoom) => (
                    <Paper key={bookingRoom?.id}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <div className='p-5'>
                                    <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16, fontWeight: 'bold' }} variant="body2" gutterBottom>
                                        {bookingRoom?.name}
                                    </Typography>
                                    <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, fontWeight: 'bold', paddingLeft: 5 }} gutterBottom variant="subtitle1" component="div">
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                            {bookingRoom?.roomimage.split('')[0] !== undefined && (
                                                <Image
                                                    alt="complex"
                                                    src={bookingRoom.roomimage.split(',')[0]}
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
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <div className='p-5'>
                                    {bookingUser.length > 0 && (
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16, fontWeight: 'bold' }} variant="body2" gutterBottom>
                                            ชื่อผู้จอง   {bookingUser[0]?.name} ( {bookingUser[0]?.phone} )
                                        </Typography>
                                    )}
                                    <div className='p-5'>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                                    ชื่อโครงการ : {name}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                                    วัตถุประสังค์ : {objective}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                                    คำร้องขอใช้บริการ : {format(zonedTimeToUtc(startdate, 'Asia/Bangkok'), 'dd MMMM yyyy HH:mm', { locale: thLocale })} ถึง {format(zonedTimeToUtc(enddate, 'Asia/Bangkok'), 'dd MMMM yyyy HH:mm', { locale: thLocale })}                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                                    รายละเอียด : {details || '-'}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                                    หมายเหตุ :  {note || '-'}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className='mt-4'>
                                        <Button variant="outlined" sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }}
                                            onClick={() => router.back()}>
                                            กลับไปก่อนหน้า
                                        </Button>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
                {filteredCartTools.map((bookingTool) => (
                    <Paper key={bookingTool?.id}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <div className='p-5'>
                                    <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16, fontWeight: 'bold' }} variant="body2" gutterBottom>
                                        {bookingTool?.name}
                                    </Typography>
                                    <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, fontWeight: 'bold', paddingLeft: 5 }} gutterBottom variant="subtitle1" component="div">
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                            {bookingTool?.toolimage.split('')[0] !== undefined && (
                                                <Image
                                                    alt="complex"
                                                    src={bookingTool.toolimage.split(',')[0]}
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
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <div className='p-5'>
                                    {bookingUser.length > 0 && (
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16, fontWeight: 'bold' }} variant="body2" gutterBottom>
                                            ชื่อผู้จอง   {bookingUser[0]?.name} ( {bookingUser[0]?.phone} )
                                        </Typography>
                                    )}
                                    <div className='p-5'>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                                    ชื่อโครงการ : {name}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                                    วัตถุประสังค์ : {objective}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                                    คำร้องขอใช้บริการ : {format(zonedTimeToUtc(startdate, 'Asia/Bangkok'), 'dd MMMM yyyy HH:mm', { locale: thLocale })} ถึง {format(zonedTimeToUtc(enddate, 'Asia/Bangkok'), 'dd MMMM yyyy HH:mm', { locale: thLocale })}                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                                    รายละเอียด : {details || '-'}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                                    หมายเหตุ :  {note || '-'}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className='mt-4'>
                                        <Button variant="outlined" sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }}
                                            onClick={() => router.back()}>
                                            กลับไปก่อนหน้า
                                        </Button>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </div>
        </React.Fragment>
    )
}

export default Info
