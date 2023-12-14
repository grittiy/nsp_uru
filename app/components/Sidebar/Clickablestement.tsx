'use client'
import React, { useState } from 'react'
import { Mali } from 'next/font/google';
import { Box, Chip, Stack, Toolbar, Tooltip } from '@mui/material';

const prompt = Mali({
    weight: ["300", "400"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});

const chipbar = [{ id: 1, title: "ผู้ใช้งานระบบ", link: "/driector" },
{ id: 2, title: "ห้อง", link: "/driector/room" },
{ id: 3, title: "เครื่องมือ", link: "/driector/tool" },
{ id: 4, title: "การจองห้อง", link: "/driector/booking" },
{ id: 5, title: "การยืมคืนเครื่องมือ", link: "/driector/booking/tool" },
{ id: 6, title: "การตรวจสอบสถานะการจองห้อง", link: "/driector/check" },
{ id: 7, title: "การตรวจสอบสถานะการยืมคืนเครื่องมือ", link: "/driector/check/tool" }

]
export default function Clickablestement() {
    const [selectedChip, setSelectedChip] = useState<number | null>(null);
    const handleChipClick = (index: number) => {
        setSelectedChip(index);
    };
    return (
        <div>
            <Box
            component="nav"
            sx={{
                display: {
                    xs: 'none',
                    md: 'flex'
                }
            }}
            aria-label="mailbox folders"
            >
                 <Toolbar />
                 <Stack direction="row" spacing={1}>
                    {chipbar.map((page, index) => (
                        <Tooltip key={page.title} title={`ไปที่ ${page.title}`} arrow sx={{ fontFamily: prompt.style.fontFamily,fontWeight: 600,fontSize: 16 }}>
                            <Chip
                                label={page.title}
                                component="a"
                                href={page.link}
                                variant="outlined"
                                clickable
                                color={selectedChip === index ? "primary" : "default"}
                                onClick={() => handleChipClick(index)}
                            />
                        </Tooltip>
                    ))}
                 </Stack>
            </Box>
        </div>
    )
}
