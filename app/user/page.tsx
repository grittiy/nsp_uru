import React from 'react'
import { Mali } from 'next/font/google';
import { getServerSession } from "next-auth";
import { Box, Paper, Typography } from '@mui/material';
import Allbookinguser from '../components/Manage/Allbookinguser';
import { authOptions } from '../api/auth/[...nextauth]/route';

const prompt = Mali({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});
type Props = {}

const Page = async (props: Props) => {
  const session = await getServerSession(authOptions)
  return (
    <main className="mx-auto container">
      <title>คำร้องขอใช้บริการ | NSP URU</title>
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
            คำร้องขอใช้บริการ
          </Typography>
          <div>
            <div className="p-4">
              <Allbookinguser userId={session?.user?.id} roomId={null} toolId={null}/>
            </div>
          </div>
        </Box>
      </Paper>
    </main>
  )
}
export default Page
