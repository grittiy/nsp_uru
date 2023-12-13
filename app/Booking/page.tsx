import { getServerSession } from 'next-auth'
import React, { useState } from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { Mali } from 'next/font/google';
import { Box, Paper, Toolbar, Typography } from '@mui/material';
import DataUser from '../components/ui/DataUser';
import ShowdataBooking from '../components/ui/ShowdataBooking';

const prompt = Mali({
    weight: ["300", "400"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});

type Props = {}

const BookingPage = async (props: Props) => {
    const session = await getServerSession(authOptions)
   
    return (
        <main className="mx-auto container">
            <title>สรุปการจองห้องและยืมคืนอุปกรณ์ | NSP URU</title>
            <Toolbar />
            <Paper elevation={6} sx={{ borderRadius: '1Paper6px' }}>
                <Box
                    sx={{
                        p: 2,
                        width: 'auto',
                        border: 5,
                        borderColor: "#3182cde6",
                        borderRadius: '16px',
                        flexGrow: 2
                    }}
                >
                    <Typography
                        gutterBottom variant="h5" component="div"
                        sx={{ fontFamily: prompt.style.fontFamily, paddingLeft: 5 }}
                    >
                        สรุปการจองห้องและยืมคืนอุปกรณ์
                    </Typography>
                    <div className='mx-auto container'>
                        <Box paddingTop={5}>
                            <DataUser userId={session?.user?.id} />
                        </Box>
                        <Box paddingTop={5}>
                            <ShowdataBooking userId={session?.user?.id} roomId={null} toolId={null} />
                        </Box>
                    </div>
                </Box>
            </Paper>
        </main>
    )
}

export default BookingPage