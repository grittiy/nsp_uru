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
    tool: string
    num: string
    name: string
    band: string
    number: number
    balance: number | null
    toolimage: string
    toolrate: string | null
    internal: number | null
    external: number | null
    rate: string | null
    details: string | null
    breakdown: number | null
    repair: number | null
    lost: number | null
    active: boolean
}

const Info: React.FC<InfoProps> = ({ id, tool, num, name, band, number, balance, toolrate, internal, external, details, rate, breakdown, repair, lost, toolimage }) => {
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
                                    {toolimage && toolimage.split(',')[0] !== undefined && (
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                            <Image
                                                alt="complex"
                                                src={toolimage.split(',')[0]}
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
                            </div>
                            <div className='p-5'>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                            จำนวนเครื่องมือ : {balance} เครื่อง
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                            อัตราค่าบริการ:    {toolrate === 'SAMPLE' ? (
                                                <>
                                                    ราคาต่อตัวอย่าง: {rate} บาท
                                                    <br />
                                                    บุคลากรภายใน: {internal} บาท
                                                    <br />
                                                    บุคลากรภายนอก: {external} บาท
                                                </>
                                            ) : toolrate === 'HOUR' ? (
                                                <>
                                                    ราคาต่อชั่วโมง: {rate} บาท
                                                    <br />
                                                    บุคลากรภายใน: {internal} บาท
                                                    <br />
                                                    บุคลากรภายนอก: {external} บาท
                                                </>
                                            ) : toolrate === 'DAY' ? (
                                                <>
                                                    ราคาต่อวัน: {rate} บาท
                                                    <br />
                                                    บุคลากรภายใน: {internal} บาท
                                                    <br />
                                                    บุคลากรภายนอก: {external} บาท
                                                </>
                                            ) : (
                                                <> {rate} บาท</>
                                            )}
                                        </Typography>

                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                            รายละเอียด:  {details ? details : 'ไม่ได้ระบุ'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                        จำนวนเครื่องมือที่ชำรุด: {breakdown ? breakdown : 'ไม่มี'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                        จำนวนเครื่องมือที่ส่งซ่อม: {repair ? repair : 'ไม่มี'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                        จำนวนเครื่องมือที่สูญหาย: {lost ? lost : 'ไม่มี'}
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
