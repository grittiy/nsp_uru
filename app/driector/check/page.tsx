import React from 'react'
import { Mali } from 'next/font/google';
import { Box, Paper, Typography } from '@mui/material';
import Clickablestement from '@/app/components/Sidebar/Clickablestement';
import ItemChecktRoom from '@/app/components/Manage/ItemChecktRoom';
import ItemchecktRoom from '@/app/components/stementdata/ItemchecktRoom';
;

const prompt = Mali({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function page() {
  return (
    <main className="mx-auto container">
      <title>รายงานการตรวจสอบสถานะการจองห้อง | NSP URU</title>
      <Clickablestement />
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
          รายงานการตรวจสอบสถานะการจองห้อง
          </Typography>
          <div>
            <div className="p-4">
            <ItemchecktRoom/>
            </div>
          </div>
        </Box>
      </Paper>
    </main>
  )
}
