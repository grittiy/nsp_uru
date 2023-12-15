import React from 'react'
import { Mali } from 'next/font/google';
import { Box, Paper, Typography } from '@mui/material';
import ItemrequestRoom from '@/app/components/stementdata/ItemrequestRoom';
import Clickablestement from '@/app/components/Sidebar/Clickablestement';

const prompt = Mali({
    weight: ["300", "400"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});

export default function page() {
    return (
        <main className="mx-auto container">
            <title>รายงานการจองห้อง | NSP URU</title>
            <Clickablestement/>
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
                        รายงานการจองห้อง
                    </Typography>
                    <div>
                        <div  className="p-4">
                            <ItemrequestRoom />
                        </div>
                    </div>
                </Box>
            </Paper>
        </main>
    )
}
