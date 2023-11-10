'use client'
import { Box, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BsSliders2Vertical, BsChevronUp } from 'react-icons/bs'
import { Mali } from 'next/font/google';
import axios from 'axios';

const prompt = Mali({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

type Props = {
  selectedAllProducts: string[]
  setSelectAllProducts: React.Dispatch<React.SetStateAction<string[]>>
  selectedAllRooms: string[]
  setSelectAllRooms: React.Dispatch<React.SetStateAction<string[]>>
  selectedAllTools: string[]
  setSelectAllTools: React.Dispatch<React.SetStateAction<string[]>>
}

const Filter = (props: Props) => {
  const [showFilter, setShowFilter] = useState<boolean>(false)
   const toggleAllProduct = (allproduct: string) => {
    props.setSelectAllProducts((prevAllProduct) =>
      prevAllProduct.includes(allproduct)
        ? prevAllProduct.filter((c) => c !== allproduct)
        : [...prevAllProduct, allproduct]
    );
  };

  const toggleRoom = (allRoom: string) => {
    props.setSelectAllRooms((prevRoom) =>
      prevRoom.includes(allRoom)
        ? prevRoom.filter((c) => c !== allRoom)
        : [...prevRoom, allRoom]
    );
  };


  const toggleTool = (allTool: string) => {
    props.setSelectAllTools((prevTool) =>
      prevTool.includes(allTool)
        ? prevTool.filter((c) => c !== allTool)
        : [...prevTool, allTool]
    );
  };

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
                <Typography variant="body2" 
                align="center" 
                className={` ${props.selectedAllProducts.includes('') ? "bg-purple-50" : ""}`}
                sx={{ fontFamily: prompt.style.fontFamily, fontSize: 15, fontWeight: 'bold' }}
                onClick={() => toggleAllProduct('')}
                >
                  ทั้งหมด
                </Typography>
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
                <Typography variant="body2" 
                align="center" 
                className={` ${props.selectedAllRooms.includes('name') ? "bg-purple-50" : ""}`}
                sx={{ fontFamily: prompt.style.fontFamily, fontSize: 15, fontWeight: 'bold' }}
                onClick={() => toggleRoom('')}
                >
                  ห้อง
                </Typography>
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
                <Typography variant="body2"
                 align="center"
                 className={` ${props.selectedAllTools.includes('name') ? "bg-purple-50" : ""}`}
                  sx={{ fontFamily: prompt.style.fontFamily, fontSize: 15, fontWeight: 'bold' }}
                  onClick={() => toggleTool('')}
                  >
                  เครื่องมือ
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  )
}

export default Filter