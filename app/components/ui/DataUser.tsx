import React from 'react'
import { Mali } from 'next/font/google'
import { prisma } from '@/lib/prisma';
import { Box, Grid, Paper, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from 'next/link';

const prompt = Mali({
    weight: ["300", "400"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});


type Props = {
    userId: number
}

const DataUser = async (props: Props) => {

    const allDatauser = await prisma.user.findMany({
        where: {
            id: props.userId
        }
    })
    const allData = await Promise.all(allDatauser)
    const userId = allDatauser.map((item) => item.id).filter((id) => id !== null)[0] as number | undefined;
    if (allData.length === 0) {
        return (
            <div className='relative flex items-center justify-center'>
                <h1 className='absolute top-[80%] text-2xl text-purple-600'>Empty Cart</h1>
            </div>
        )
    }
    const filteredData = allData.filter(allData => allData !== null && allData?.id !== null);

    if (filteredData.some(data => data.fname === null || data.phone === null)) {
        window.alert('กรุณากรอกข้อมูลส่วนตัวของคุณ');
        // Redirect to the profile page or any other desired page
        return (
            <Link href={`/Profile/${userId}`}>

                <Paper elevation={6}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: prompt.style.fontFamily, paddingLeft: 5 ,textAlign: 'center', color: 'red'}}>
                        กรุณากรอกข้อมูลส่วนตัวของคุณโดยคลิกที่นี่
                    </Typography>
                </Paper>
            </Link>
        );
    }

    return (
        <React.Fragment>
            <Link href={`/Profile/${userId}`}>
                <Paper elevation={6}>
                    <Box paddingLeft={5}>
                        <LocationOnIcon sx={{ width: 70, height: 70 }} />
                        {filteredData.map((allData) => (
                            <Grid container spacing={2} key={allData?.id} >
                                <Grid item xs={12}>
                                    <Typography gutterBottom variant="h6" component="div" sx={{ fontFamily: prompt.style.fontFamily, paddingLeft: 5 }}>
                                        คุณ {allData.fname}  (+66) {allData.phone}
                                        <br />
                                        {allData.email}
                                    </Typography>
                                </Grid>
                            </Grid>
                        ))}
                    </Box>
                </Paper>
            </Link>
        </React.Fragment>
    )
}

export default DataUser