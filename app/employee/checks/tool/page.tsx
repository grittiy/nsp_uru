import React from 'react'
import { Mali } from 'next/font/google';
import { Box, Paper, Typography } from '@mui/material';
import Clickablecheck from '@/app/components/Sidebar/Clickablecheck';
import ItemChecktTool from '@/app/components/Manage/ItemChecktTool';


const prompt = Mali({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function page() {
  return (
    <main className="mx-auto container">
      <title>รายงานการตรวจสอบสถานะการการยืม-คืนเครื่องมือ | NSP URU</title>
      <Clickablecheck />
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
          รายงานการตรวจสอบสถานะการการยืม-คืนเครื่องมือ
          </Typography>
          <div>
            <div className="p-4">
            <ItemChecktTool/>
            </div>
          </div>
        </Box>
      </Paper>
    </main>
  )
}
