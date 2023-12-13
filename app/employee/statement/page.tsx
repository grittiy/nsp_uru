import React from 'react'
import { Mali } from 'next/font/google';
import { Box, Paper, Typography } from '@mui/material';
import ItemStatementRoom from '@/app/components/Manage/ItemStatementRoom';
import Clickablebooking from '@/app/components/Sidebar/Clickablebooking';

const prompt = Mali({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function page() {
  return (
    <main className="mx-auto container">
      <title>รายงานการจองห้อง | NSP URU</title>
      <Clickablebooking />
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
            การจองห้อง
          </Typography>
          <div>
            <div className="p-4">
              <ItemStatementRoom />
            </div>
          </div>
        </Box>
      </Paper>
    </main>
  )
}
