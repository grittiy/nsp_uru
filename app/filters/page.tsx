'use client'

import axios from 'axios'
// tsrafce
import React, { useEffect, useState } from 'react'
import Filter from './Filter'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Paper, Toolbar, Typography } from '@mui/material'
import { Mali } from 'next/font/google'
import Link from 'next/link'


const prompt = Mali({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});


type Props = {}

const FiltersPage = (props: Props) => {
  const [selectedAllProducts, setSelectAllProducts] = useState<string[]>([])
  const [selectedAllRooms, setSelectAllRooms] = useState<string[]>([])
  const [selectedAllTools, setSelectAllTools] = useState<string[]>([])
  const [response, setResponse] = useState<any[]>([])

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get('/api/filterAll', {
          params: {
            allproducts: selectedAllProducts,
            allrooms: selectedAllRooms,
            alltools: selectedAllTools
          },
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then((response) => {
            console.log("response", response.data)
            setResponse(response.data)
          })
      } catch (error) {
        console.log('error', error)
      }
    }
    fetchdata()
  }, [selectedAllProducts, selectedAllRooms, selectedAllTools])

  return (
    <div className="px-5 max-w-[1280px] mx-auto">
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224, flexDirection: 'column', alignItems: 'center' }}>
        <Toolbar />
        <Typography align="center" sx={{ fontFamily: prompt.style.fontFamily, fontSize: 20 }}>บริการต่าง ๆ</Typography>
        <br />
        <Grid container spacing={2}>
          <Grid item md={2}>
            <div>
              <Filter
                selectedAllProducts={selectedAllProducts}
                setSelectAllProducts={setSelectAllProducts}
                selectedAllRooms={selectedAllRooms}
                setSelectAllRooms={setSelectAllRooms}
                selectedAllTools={selectedAllTools}
                setSelectAllTools={setSelectAllTools}
              />
            </div>
          </Grid>
          <Grid item md={10}>
            <Paper elevation={6} sx={{ borderRadiPaperus: '16px', maxWidth: 1000 }}>
              <Box sx={{
                p: 2,
                width: 'auto',
                border: 7,
                borderColor: "#dae0a0",
                borderRadius: '16px',
                flexGrow: 2,
                overflowY: 'scroll',
                maxHeight: 800,
              }}>
                <Grid container spacing={2}>
                  {response.map((room: any) => (
                    <Grid item xs={12} sm={4} key={room.id}>
                      <Link href={`/dashboard/${room.id}`}>
                        <>
                          <Card>
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
                        </>
                      </Link>
                    </Grid>
                  ))}
                  {response.map((tool: any) => (
                    <Grid item xs={12} sm={4} key={tool.id}>
                      <Link href={`/dashboard/${tool.id}`}>

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
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default FiltersPage