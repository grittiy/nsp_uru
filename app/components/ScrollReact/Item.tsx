import { prisma } from '@/lib/prisma'
import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { Mali } from 'next/font/google'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Paper, Typography } from '@mui/material';
import Link from 'next/link';

const prompt = Mali({
    weight: ["300", "400"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});

type Props = {}

const Item = async (props: Props) => {
    
    const rooms = await prisma.rooms.findMany({
        where: {
            active: true
        }
    })
    const tools = await prisma.tools.findMany({
        where: {
            active: true
        }
    })
    // console.log(rooms)
    // console.log(tools)

    if (rooms.length === 0 && tools.length === 0) {
        return (
            <>
                <React.Fragment>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper elevation={6} sx={{ borderRadius: '16px', maxWidth: 1000 }}>
                                <Box
                                    sx={{
                                        p: 2,
                                        width: 'auto',
                                        border: 7,
                                        borderColor: "#dae0a0",
                                        borderRadius: '16px',
                                        flexGrow: 2

                                    }}
                                >
                                    <div>empty</div>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </React.Fragment>
            </>
        )
    }
    
    return (
        <>
            <React.Fragment>
                <Paper elevation={6} sx={{ borderRadiPaperus: '16px', maxWidth: 1000 }}>
                    <Box
                        sx={{
                            p: 2,
                            width: 'auto',
                            border: 7,
                            borderColor: "#dae0a0",
                            borderRadius: '16px',
                            flexGrow: 2,
                            overflowY: 'scroll', // เพิ่มการเลื่อนในแนวดิ่ง
                            maxHeight: 800, // กำหนดความสูงสูงสุดของ Grid
                        }}
                    >
                        <Grid container spacing={2}>
                            {rooms.map(room => (
                                <Grid item xs={12} sm={4} key={room.id}>
                                    <Card >
                                        <CardMedia
                                            sx={{ height: 140 }}
                                            image={room.roomimage.split(',')[0]}
                                            title={room.name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: prompt.style.fontFamily }}>
                                                {room.name}
                                            </Typography>
                                            <Typography variant="body2" align="center" sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }}>
                                                จำนวน   {room.no}  ที่นั่ง
                                            </Typography>

                                            <Typography variant="body2" sx={{ fontFamily: prompt.style.fontFamily, fontSize: 15, fontWeight: 'bold' }}>
                                                รายละเอียด
                                            </Typography>
                                            <Typography align="left" sx={{ fontFamily: prompt.style.fontFamily, fontSize: 14 }} >
                                                {room.details}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" sx={{ fontFamily: prompt.style.fontFamily }}>เพิ่มใส่ในตะกร้า</Button>
                                            <Link href={"/room/" + room.id}>
                                                <Button size="small" sx={{ fontFamily: prompt.style.fontFamily }}>รายละเอียด</Button>
                                            </Link>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}

                            {tools.map(tool => (
                                <Grid item xs={12} sm={4} key={tool.id}>
                                    <Card>
                                        <CardMedia
                                            sx={{ height: 140 }}
                                            image={tool.toolimage.split(',')[0]}
                                            title={tool.name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: prompt.style.fontFamily }}>
                                                {tool.name}
                                            </Typography>
                                            <Typography variant="body2" align="center" sx={{ fontFamily: prompt.style.fontFamily, fontSize: 16 }}>
                                                จำนวน   {tool.balance}  เครื่อง
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontFamily: prompt.style.fontFamily, fontSize: 15, fontWeight: 'bold' }}>
                                                อัตราค่าบริการ
                                            </Typography>
                                            {tool.toolrate === 'SAMPLE' && (
                                                <Typography variant="body2" align="center" sx={{ fontFamily: prompt.style.fontFamily, fontSize: 14 }}>
                                                    บุคลากรภายใน   {tool.internal}  บาทต่อตัวอย่าง
                                                    <br />
                                                    บุคลากรภายนอก {tool.external} บาทต่อตัวอย่าง
                                                </Typography>
                                            )}
                                            {tool.toolrate === 'HOUR' && (
                                                <Typography variant="body2" align="center" sx={{ fontFamily: prompt.style.fontFamily, fontSize: 14 }}>
                                                    บุคลากรภายใน   {tool.internal}  บาทต่อชั่วโมง
                                                    <br />
                                                    บุคลากรภายนอก {tool.external} บาทต่อชั่วโมง
                                                </Typography>
                                            )}
                                            {tool.toolrate === 'DAY' && (
                                                <Typography variant="body2" align="center" sx={{ fontFamily: prompt.style.fontFamily, fontSize: 14 }}>
                                                    บุคลากรภายใน   {tool.internal}  บาทต่อวัน
                                                    <br />
                                                    บุคลากรภายนอก {tool.external} บาทต่อวัน
                                                </Typography>
                                            )}
                                            {tool.toolrate === 'RATES' && (
                                                <Typography variant="body2" align="center" sx={{ fontFamily: prompt.style.fontFamily, fontSize: 14 }}>
                                                    {tool.rate}
                                                </Typography>
                                            )}

                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" sx={{ fontFamily: prompt.style.fontFamily }}>เพิ่มใส่ในตะกร้า</Button>
                                            <Link href={"/tool/" + tool.id}>
                                                <Button size="small" sx={{ fontFamily: prompt.style.fontFamily }}>รายละเอียด</Button>
                                            </Link>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Paper>
            </React.Fragment>
        </>
    )
}

export default Item