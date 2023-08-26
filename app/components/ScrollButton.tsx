'use client'
import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-scroll'
import { Mali } from 'next/font/google';

const prompt = Mali({
    weight: ["300", "400"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});

export default function ScrollButton() {
    return (
        <>
         
                <Link to="lineoa" smooth={true} duration={500}>
                    <Button sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }}>LINE OA</Button>
                </Link>
                <Link to="calendar" smooth={true} duration={500}>
                    <Button sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }}>ปฏิทิน</Button>
                </Link>
                <Link to="services" smooth={true} duration={500}>
                    <Button sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }}>บริการต่างๆ</Button>
                </Link>
        
        </>
    )
}
