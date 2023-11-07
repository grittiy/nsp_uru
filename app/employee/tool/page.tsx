import React from 'react'
import { Mali } from 'next/font/google';
import { Box, Paper, Typography } from '@mui/material';
import CustomizedDialogs from '@/app/components/pop-up/dialog';
import { AddtoolForm } from './form';
import ItemTools from '@/app/components/Manage/ItemTools';


const prompt = Mali({
    weight: ["300", "400"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});

export default function ToolPage() {
    return (
        <main className="mx-auto container">
            <title>เครื่องมือ | NSP URU</title>
            <Paper elevation={6} sx={{ borderRadius: '16px' }}>
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
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: prompt.style.fontFamily, paddingLeft: 5 }}>
                        เครื่องมือ
                    </Typography>
                    <div>
                        <div className="p-4">
                           <ItemTools/>
                        </div>
                        <br />
                        <div className="rightbottom">
                            <CustomizedDialogs title='เพิ่มห้อง'>
                                <AddtoolForm/>
                            </CustomizedDialogs>
                        </div>
                    </div>
                </Box>
            </Paper>
        </main>
    )
}
