'use client'
import React, { useState } from 'react'
import Filter from './Filter'
import Item from './Item'
import { Mali } from 'next/font/google'
import { Box, Container, Grid, Typography } from '@mui/material';
import Link from 'next/link';

const prompt = Mali({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

type Props = {}

const ServicesPage = (props: Props) => {
  const [selectedType, setSelectedType] = useState('all'); // ประเภทที่ถูกเลือก

  const handleFilterChange = (type: string) => {
    setSelectedType(type);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224, flexDirection: 'column', alignItems: 'center' }}>
        <Typography align="center" sx={{ fontFamily: prompt.style.fontFamily, fontSize: 20 }}>บริการต่าง ๆ</Typography>
        <br />
        <Grid container spacing={2}>
          <Grid item md={2}>
            <Link href='/filters' className='opacity-60'>
            <Filter selectedType={selectedType} onFilterChange={handleFilterChange}/>
            </Link >
          </Grid>
          <Grid item md={10} >
            <Item />
          </Grid>
        </Grid>
      </Box>
    </>
  )

}

export default ServicesPage