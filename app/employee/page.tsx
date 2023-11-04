import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { Mali } from 'next/font/google';
import CustomizedDialogs from '@/app/components/pop-up/dialog';
import AdduserForm from './user/form';
import ItemUser from '../components/Manage/ItemUser';


const prompt = Mali({
    weight: ["300", "400"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});

export default function UserPage() {
    return (
        <main className="mx-auto container">
              <title>จัดการข้อมูลผู้ใช้งานระบบ | NSP URU</title>
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
                    <Typography
                        gutterBottom variant="h5" component="div"
                        sx={{ fontFamily: prompt.style.fontFamily, paddingLeft: 5 }}
                    >
                        จัดการข้อมูลผู้ใช้งานระบบ
                    </Typography>
                    <div>
                        <div className="p-4">
                            <ItemUser/>
                        </div>
                        <br />
                        <div className="rightbottom">
                            <CustomizedDialogs title='เพิ่มผู้ใช้งานระบบ'>
                                <AdduserForm/>
                            </CustomizedDialogs>
                        </div>
                    </div>
                </Box>
            </Paper>
        </main>
    )
}
