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
    ch: string;
    status: string;
    details: string | null;
    note: string | null;
    roomId: number | null;
    userId: number | null;
    toolId: number | null;
    bookingId: number;
}

const Info: React.FC<InfoProps> = ({ id, ch, details, note, roomId, userId, toolId, bookingId }) => {
    const { data: session } = useSession()
    const router = useRouter();
    const [dataproduct, setDateProduct] = useState<any[]>([]);
    const [checkBooking, setCheckBooking] = useState<any[]>([]);
    const [checkRooms, setCheckRooms] = useState<any[]>([]);
    const [checkTools, setCheckTools] = useState<any[]>([]);
    const [checkUser, setCheckUser] = useState<any[]>([]);

    useEffect(() => {
        const fetchCartData = async () => {
            const CheckRoomPromises = [];
            const CheckToolPromises = [];
            const CheckUserPromises = [];
            const CheckBookingPromises = [];

            if (roomId !== null) {
                CheckRoomPromises.push(fetch(`/api/rooms/${roomId}`).then((res) => res.json()));
            }

            if (toolId !== null) {
                CheckToolPromises.push(fetch(`/api/tools/${toolId}`).then((res) => res.json()));
            }
            if (userId !== null) {
                CheckUserPromises.push(fetch(`/api/users/${userId}`).then((res) => res.json()));
            }
            if (bookingId !== null) {
                CheckBookingPromises.push(fetch(`/api/reservations/${bookingId}`).then((res) => res.json()));
            }

            const roomData = await Promise.all(CheckRoomPromises);
            const toolData = await Promise.all(CheckToolPromises);
            const userData = await Promise.all(CheckUserPromises);
            const bookingData = await Promise.all(CheckBookingPromises);

            setCheckRooms(roomData);
            setCheckTools(toolData);
            setCheckUser(userData);
            setCheckBooking(bookingData);
        };

        fetchCartData();
    }, [roomId, toolId, userId, bookingId]);


    const roomDataId = dataproduct.map((item) => item.roomId).filter((id) => id !== null)[0] as number | undefined;
    const toolDataId = dataproduct.map((item) => item.toolId).filter((id) => id !== null)[0] as number | undefined;

    if (checkRooms.length === 0 && checkTools.length === 0) {
        return (
            <div className='relative flex items-center justify-center'>
                <h1 className='absolute top-[80%] text-2xl text-purple-600'>Empty Cart</h1>
            </div>
        )
    }
    const filteredCheckRooms = checkRooms.filter(checkRoom => checkRoom !== null && checkRoom?.id !== null);
    const filteredCartTools = checkTools.filter(checkTool => checkTool !== null && checkTool?.id !== null);


    return (
        <React.Fragment>
            <div>
                {filteredCheckRooms.map((checkRoom) => (
                    <Paper key={checkRoom?.id}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <div className='p-5'>
                                    <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16, fontWeight: 'bold' }} variant="body2" gutterBottom>
                                        {checkRoom?.name}
                                    </Typography>
                                    <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, fontWeight: 'bold', paddingLeft: 5 }} gutterBottom variant="subtitle1" component="div">
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                            {checkRoom?.roomimage.split('')[0] !== undefined && (
                                                <Image
                                                    alt="complex"
                                                    src={checkRoom.roomimage.split(',')[0]}
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
                                    {checkUser.length > 0 && (
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16, fontWeight: 'bold' }} variant="body2" gutterBottom>
                                            ชื่อผู้จอง   {checkUser[0]?.name} ( {checkUser[0]?.phone} )
                                        </Typography>
                                    )}
                                    <div className='p-5'>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={12}>
                                                <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                                    หมายเลขสถานะ : {ch}
                                                </Typography>
                                            </Grid>
                                    
                                            <Grid item xs={12} sm={6}>
                                                <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                                ผลการตรวจสอบ : {note === 'no_damage' ? 'ไม่มีการเสียหาย' : (note === 'damage' ? 'มีการเสียหาย' : 'ไม่ระบุ')}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                                    รายละเอียด : {details || 'ไม่ได้ระบุ'}
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
                {filteredCartTools.map((cartTool) => (
                    <Paper key={cartTool?.id}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <div className='p-5'>
                                    <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16, fontWeight: 'bold' }} variant="body2" gutterBottom>
                                        {cartTool?.name}
                                    </Typography>
                                    <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, fontWeight: 'bold', paddingLeft: 5 }} gutterBottom variant="subtitle1" component="div">
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                            {cartTool?.toolimage.split('')[0] !== undefined && (
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
                                        </div>
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <div className='p-5'>
                                    {checkUser.length > 0 && (
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16, fontWeight: 'bold' }} variant="body2" gutterBottom>
                                            ชื่อผู้จอง   {checkUser[0]?.name} ( {checkUser[0]?.phone} )
                                        </Typography>
                                    )}
                                    <div className='p-5'>
                                        <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12}>
                                                <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                                    หมายเลขสถานะ : {ch}
                                                </Typography>
                                            </Grid>
                                    
                                            <Grid item xs={12} sm={6}>
                                                <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                                    ผลการตรวจสอบ :  {note || 'ไม่ได้ระบุ'}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                                    รายละเอียด : {details || 'ไม่ได้ระบุ'}
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
