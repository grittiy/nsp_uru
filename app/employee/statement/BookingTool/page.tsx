import React from 'react'
import { Mali } from 'next/font/google';
import { Box, Paper, Typography } from '@mui/material';
import Clickablebooking from '@/app/components/Sidebar/Clickablebooking';
import ItemStatementTool from '@/app/components/Manage/ItemStatementTool';

const prompt = Mali({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function page() {
  return (
    <main className="mx-auto container">
      <title>รายงานการยืม-คืนเครื่องมือ | NSP URU</title>
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
            การยืม-คืนเครื่องมือ
          </Typography>
          <div>
            <div className="p-4">
              <ItemStatementTool />
            </div>
          </div>
        </Box>
      </Paper>
    </main>
  )
}
