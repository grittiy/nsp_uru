
import { Box, Paper, Typography } from "@mui/material";
import { AddroomForm } from "./form";
import { Mali } from 'next/font/google';
import CustomizedDialogs from "@/app/components/pop-up/dialog";
import Item from "@/app/components/Manage/Item";

const prompt = Mali({
    weight: ["300", "400"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});

export default function RoomPage() {
    return (
        <main className="mx-auto container">
            <Paper elevation={6} sx={{ borderRadius: '16px' }}>
                <Box sx={{
                    p: 2,
                    width: 'auto',
                    border: 5,
                    borderColor: "#3182cde6",
                    borderRadius: '16px',
                    flexGrow: 2
                }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: prompt.style.fontFamily, paddingLeft: 5 }}>
                        ห้อง
                    </Typography>
                    <div>
                        <div className="p-4">
                        <Item />
                        </div>
                        <br />
                        <div className="rightbottom">
                            <CustomizedDialogs title='เพิ่มห้อง'>
                                <AddroomForm />
                            </CustomizedDialogs>
                        </div>
                    </div>
                </Box>
            </Paper>
        </main>
    )
}