import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Allpurchased from "../components/ui/Allpurchased";
import { Box, Paper, Toolbar, Typography } from "@mui/material";
import { Mali } from 'next/font/google';
import AllCartProduct from "../components/ui/AllCartProduct";

const prompt = Mali({
    weight: ["300", "400"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});

type Props = {}

const Carts = async (props: Props) => {
    const session = await getServerSession(authOptions)
    return (
        <main className="mx-auto container">
            <title>ตะกร้าของฉัน | NSP URU</title>
            <Toolbar/>
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
                        ตะกร้าการจองห้องและยืม-คืนเครื่องมือ
                    </Typography>
                    <div className="max-w-[1280px] mx-auto px-5">
                        <AllCartProduct userId={session?.user?.id} roomId={null} toolId={null} />
                      

                        <hr className="mt-10 mb-10" />
                        {/* <Allpurchased userId={session?.user?.id} /> */}
                    </div>
                </Box>
            </Paper>
        </main>
    )
}
export default Carts