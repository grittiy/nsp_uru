'use client'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BsSliders2Vertical, BsChevronUp } from 'react-icons/bs'
import { Mali } from 'next/font/google';
import axios from 'axios';

const prompt = Mali({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

type Props = {}

const Filter = ({ selectedType, onFilterChange }) => {
  // const [selectedAllProducts, setSelectAllProducts] = useState<string[]>([])
  // const [selectedAllRooms, setSelectAllRooms] = useState<string[]>([])
  // const [selectedAllTools, setSelectAllTools] = useState<string[]>([])

  // const toggleAllProduct = (allproduct: string) => {
  //   setSelectAllProducts((prevAllProduct) =>
  //     prevAllProduct.includes(allproduct)
  //       ? prevAllProduct.filter((c) => c !== allproduct)
  //       : [...prevAllProduct, allproduct]
  //   );
  // };

  // const toggleRoom = (allRoom: string) => {
  //   setSelectAllRooms((prevRoom) =>
  //     prevRoom.includes(allRoom)
  //       ? prevRoom.filter((c) => c !== allRoom)
  //       : [...prevRoom, allRoom]
  //   );
  // };


  // const toggleTool = (allTool: string) => {
  //   setSelectAllTools((prevTool) =>
  //     prevTool.includes(allTool)
  //       ? prevTool.filter((c) => c !== allTool)
  //       : [...prevTool, allTool]
  //   );
  // };

  // useEffect(() => {
  //   axios.get('/api/filterAll', {
  //     params: {
  //       allproducts: selectedAllProducts,
  //       allrooms: selectedAllRooms,
  //       alltools: selectedAllTools
  //     },
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then((response) => {
  //       console.log("response", response.data)
  //     })
  //     .catch((error) => {
  //       console.log("Error", error)
  //     })
  // })

  return (
    <>
      <Paper elevation={0} >
        <Box
          sx={{
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            maxWidth: '100%'
          }}
        >
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
                }}
              >
                <Button
                 onClick={() => onFilterChange('all')}
                 style={{ fontWeight: selectedType === 'all' ? 'bold' : 'normal' }}
                sx={{ fontFamily: prompt.style.fontFamily, fontSize: 15, fontWeight: 'bold' }}
                > ทั้งหมด</Button>
                {/* <Typography variant="body2" 
                align="center" 
                className={` ${selectedAllProducts.includes('') ? "bg-purple-50" : ""}`}
                sx={{ fontFamily: prompt.style.fontFamily, fontSize: 15, fontWeight: 'bold' }}
                onClick={() => toggleAllProduct('')}
                >
                  ทั้งหมด
                </Typography> */}
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
                }}
              >
                <Button
                 onClick={() => onFilterChange('room')}
                 style={{ fontWeight: selectedType === 'room' ? 'bold' : 'normal' }}
                 sx={{ fontFamily: prompt.style.fontFamily, fontSize: 15, fontWeight: 'bold' }}
                >ห้อง</Button>
                {/* <Typography variant="body2" 
                align="center" 
                
                sx={{ fontFamily: prompt.style.fontFamily, fontSize: 15, fontWeight: 'bold' }}
                onClick={() => toggleRoom('')}
                >
                  ห้อง
                </Typography> */}
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
                }}
              >
                <Button
                 onClick={() => onFilterChange('room')}
                 style={{ fontWeight: selectedType === 'room' ? 'bold' : 'normal' }}
                 sx={{ fontFamily: prompt.style.fontFamily, fontSize: 15, fontWeight: 'bold' }}
                >เครื่องมือ</Button>
                {/* <Typography variant="body2"
                 align="center"
                  sx={{ fontFamily: prompt.style.fontFamily, fontSize: 15, fontWeight: 'bold' }}
                  onClick={() => toggleTool('')}
                  >
                  เครื่องมือ
                </Typography> */}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  )
}

export default Filter