'use client'
import React, { useEffect, useState } from 'react'
import { Mali } from 'next/font/google'
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const prompt = Mali({
    weight: ["300", "400"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});

interface InfoProps {
    id: number
    room: string
    name: string
    details: string
    no: string
    building: string
    location: string
    roomimage: string

}

const Info: React.FC<InfoProps> = ({ id, room, name, details, no, building, location, roomimage }) => {
    const { data: session } = useSession()
    const router = useRouter();
    return (
        <React.Fragment>
            <div>
                <Paper>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <div className='p-5'>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                    {roomimage && roomimage.split(',')[0] !== undefined && (
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                            <Image
                                                alt="complex"
                                                src={roomimage.split(',')[0]}
                                                width={200}
                                                height={200}
                                                style={{
                                                    maxWidth: '100%',
                                                    maxHeight: '100%',
                                                    width: 'auto',
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <div className='p-5'>
                                <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 20, fontWeight: 'bold' }} variant="body2" gutterBottom>
                                    {name}
                                </Typography>
                                <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                    {building}
                                </Typography>
                            </div>
                            <div className='p-5'>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                            จำนวนที่นั่ง : {no}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                            รายละเอียด: {details}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                            ตำแหน่ง: {location ? (
                                                <Link href={location} style={{ color: 'red'}} >
                                                    {location}
                                                </Link>
                                            ) : 'ไม่ระบุ'}
                                        </Typography>
                                    </Grid>
                                </Grid>
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
            </div>
        </React.Fragment>
    )
}

export default Info
