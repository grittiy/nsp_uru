'use client'
import React, { useEffect, useState } from 'react'
import { Mali } from 'next/font/google'
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const prompt = Mali({
    weight: ["300", "400"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});

enum UserRole {
    Admin = "ADMIN",
    Director = "DIRECTOR",
    Employee = "EMPLOYEE",
    User = "USER"
}

enum PersonType {
    Null = "NULL",
    Internal = "INTERNAL",
    External = "EXTERNAL"
}

enum InternalType {
    Null = "NULL",
    Lecturer = "LECTURER",
    Student = "STUDENT",
    Staff = "STAFF"
}

enum ExternalType {
    Null = "NULL",
    Government = "GOVERNMENT",
    Private = "PRIVATE"
}

interface InfoProps {
    id: number
    usr: string
    name: string
    email: string | null
    avatar: string | null
    pname: string | null
    fname: string | null
    sex: string | null
    position: string | null
    person: string | null
    phone: string | null
    fax: string | null
    organizationName: string | null
    type: string | null
    internalType: string | null
    externalType: string | null
}

const Info: React.FC<InfoProps> = ({ id, name, email, avatar, pname, fname, sex, person, position, phone, fax, organizationName, type, internalType, externalType }) => {
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
                                    {avatar && avatar.split(',')[0] !== undefined && (
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                            <Image
                                                alt="complex"
                                                src={avatar.split(',')[0]}
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
                                <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16, fontWeight: 'bold' }} variant="body2" gutterBottom>
                                    {pname !== '-' && pname} {fname ? fname : 'ไม่ระบุ'}  [{name}]
                                </Typography>
                            </div>
                            <div className='p-5'>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                            อีเมล์ : {email}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                            เพศ: {sex === 'male' ? 'ผู้ชาย' : 'ไม่ระบุ' || sex === 'female' ? 'ผู้หญิง' : 'ไม่ระบุ'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                            ตำแหน่ง: {position ? position : 'ไม่ระบุ'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                            หน่วยงาน/ผู้ประกอบการ: {person ? person : 'ไม่ระบุ'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                            หมายเลขโทรศัพท์: {phone ? phone : 'ไม่ระบุ'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                            โทรสาร: {fax ? fax : 'ไม่ระบุ'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Typography sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }} variant="body2" gutterBottom>
                                            ประเภทบุคลากร: {type === 'INTERNAL' ? (
                                                <>
                                                    บุคคลากรภายใน [ {internalType === 'LECTURER' ? 'อาจารย์' : internalType === 'STUDENT' ? 'นักศึกษา' : internalType === 'STAFF' ? 'เจ้าหน้าที่' : 'ไม่ระบุ'} ]
                                                </>
                                            ) : type === 'EXTERNAL' ? (
                                                <>
                                                    บุคคลากรภายนอก
                                                    <br />
                                                    <div className='p-4'>

                                                        {externalType === 'GOVERNMENT' ? 'หน่วยงานรัฐ' : externalType === 'PRIVATE' ? 'หน่วยงานเอกชน' : 'ไม่ระบุ'}
                                                        {externalType && organizationName ? ` (${organizationName})` : ''}
                                                    </div>
                                                </>
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
