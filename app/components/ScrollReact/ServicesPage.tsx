'use client'
import { Badge, Box, Button, Card, CardActions, CardContent, CardMedia, Fab, Grid, Paper, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Mali } from 'next/font/google'
import Link from 'next/link';
import AddCarts from '../ui/AddCarts';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';

const prompt = Mali({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

interface Tool {
  id: number
  num: string
  name: string,
  toolimage: string
  balance: number
  toolrate: string; // Add 'toolrate' property
  internal: number;
  external: number;
  rate: string
}
interface Room {
  id: number
  num: string
  name: string,
  roomimage: string
  no: string
  details: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())



export default function ServicesPage() {
  const { data: session } = useSession();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [filter, setFilter] = useState('all');

  const { data: carts } = useSWR('/api/carts', fetcher);

  const badgeContent = carts ? carts.length : 0;

  useEffect(() => {
    // Use fetch to retrieve data from the API.
    fetch('/api/showroom')
      .then((res) => res.json())
      .then((data: Room[]) => {
        setRooms(data); // Store the fetched data in the 'rooms' state
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
      });

    // Use fetch to retrieve data from the API.
    fetch('/api/showtool')
      .then((res) => res.json())
      .then((data: Tool[]) => {
        setTools(data); // Store the fetched data in the 'tools' state
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
      });
  }, []);



  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224, flexDirection: 'column', alignItems: 'center' }}>
        <Typography align="center" sx={{ fontFamily: prompt.style.fontFamily, fontSize: 20 }}>บริการต่าง ๆ</Typography>
        <br />
        <Grid container spacing={2}>
          <Grid item md={2}>
            <Paper elevation={0}>
              <Box sx={{
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                maxWidth: '100%'
              }}>
                <Grid container spacing={2}>
                  <Grid item xs={4} sm={12}>
                    <Box
                      sx={{
                        p: 2,
                        width: 'auto',
                        border: 7,
                        borderColor: "#dae0a0",
                        borderRadius: '16px',
                        flexGrow: 2,
                        color: 'black',
                        textAlign: 'center'
                      }}
                    >
                      <Button
                        sx={{
                          fontFamily: prompt.style.fontFamily, fontSize: 15, fontWeight: 'bold', color: filter === 'all' ? 'gray' : 'black'
                        }}
                        onClick={() => setFilter('all')}

                      >
                        ทั้งหมด
                      </Button>

                    </Box>
                  </Grid>
                  <Grid item xs={4} sm={12}>
                    <Box
                      sx={{
                        p: 2,
                        width: 'auto',
                        border: 7,
                        borderColor: "#dae0a0",
                        borderRadius: '16px',
                        flexGrow: 2,
                        color: 'black',
                        textAlign: 'center'
                      }}
                    >
                      <Button
                        sx={{
                          fontFamily: prompt.style.fontFamily, fontSize: 15, fontWeight: 'bold', color: filter === 'rooms' ? 'gray' : 'black',

                        }}
                        onClick={() => setFilter('rooms')}
                      >
                        ห้อง
                      </Button>

                    </Box>
                  </Grid>
                  <Grid item xs={4} sm={12}>
                    <Box
                      sx={{
                        p: 2,
                        width: 'auto',
                        border: 7,
                        borderColor: "#dae0a0",
                        borderRadius: '16px',
                        flexGrow: 2,
                        color: 'black',
                        textAlign: 'center'
                      }}
                    >
                      <Button
                        sx={{
                          fontFamily: prompt.style.fontFamily, fontSize: 15, fontWeight: 'bold', color: filter === 'tools' ? 'gray' : 'black',

                        }}
                        onClick={() => setFilter('tools')}
                      >
                        เครื่องมือ
                      </Button>

                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid item md={10} >
            <Paper elevation={0} sx={{ borderRadiPaperus: '15px', maxWidth: 1000 }}>
              <Box
                sx={{
                  p: 2,
                  width: 'auto',
                  height: 800,
                  border: 7,
                  borderColor: "#dae0a0",
                  borderRadius: '16px',
                  flexGrow: 2,
                  overflowY: 'scroll',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)'
                }}
              >
                <Grid container spacing={2}>
                  {filter === 'all' && (
                    <>
                      {rooms.map(room => (
                        <Grid item xs={12} sm={6} md={4} key={room.id}>
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
                              <AddCarts roomId={room.id} />
                              <Link href={"/room/" + room.id}>
                                <Button size="small" sx={{ fontFamily: prompt.style.fontFamily }}>รายละเอียด</Button>
                              </Link>
                            </CardActions>
                          </Card>
                        </Grid>
                      ))}
                      {tools.map(tool => (
                        <Grid item xs={12} sm={12} md={4} key={tool.id}>
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
                              <AddCarts toolId={tool.id} />                              <Link href={"/tool/" + tool.id}>
                                <Button size="small" sx={{ fontFamily: prompt.style.fontFamily }}>รายละเอียด</Button>
                              </Link>
                            </CardActions>
                          </Card>
                        </Grid>
                      ))}
                    </>
                  )}

                  {filter === 'rooms' && (
                    <>
                      {rooms.map(room => (
                        <Grid item xs={12} sm={6} md={4} key={room.id}>
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
                              <AddCarts roomId={room.id} />
                              <Link href={"/room/" + room.id}>
                                <Button size="small" sx={{ fontFamily: prompt.style.fontFamily }}>รายละเอียด</Button>
                              </Link>
                            </CardActions>
                          </Card>
                        </Grid>
                      ))}
                    </>
                  )}
                  {filter === 'tools' && (
                    <>
                      {tools.map(tool => (
                        <Grid item xs={12} sm={12} md={4} key={tool.id}>
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
                              <AddCarts toolId={tool.id} />
                              <Link href={"/tool/" + tool.id}>
                                <Button size="small" sx={{ fontFamily: prompt.style.fontFamily }}>รายละเอียด</Button>
                              </Link>
                            </CardActions>
                          </Card>
                        </Grid>
                      ))}
                    </>
                  )}

                </Grid>
                <div className="rightbottom">

                  {session ? (
                    <Link href="/carts">
                      <Badge color="primary" badgeContent={badgeContent} >
                        <Fab className="primary" aria-label="card">
                          <ShoppingBasketIcon />
                        </Fab>
                      </Badge>
                    </Link>
                  ) : (
                    <Link href="/login">
                      <Fab className="primary-fab" aria-label="card">
                        <ShoppingBasketIcon />
                      </Fab>
                    </Link>
                  )}
                </div>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  )
}
