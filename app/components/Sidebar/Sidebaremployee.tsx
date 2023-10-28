'use client'
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import React from 'react'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import { Mali } from 'next/font/google';


const prompt = Mali({
    weight: ["300", "400"],
    style: ["normal", "italic"],
    subsets: ["latin"],
  });

const Sidebar = [{ title: "ผู้เข้าใช้ระบบ", Link: "./employee" },
{ title: "ห้อง", Link: "./employee/room" },
{ title: "เครื่องมือ", Link: "./employee" },
{ title: "รายงาน", Link: "./employee" },
{ title: "การตรวจสอบสถานะ", Link: "./employee" },
]

const drawerWidth = 240;

export default function Sidebaremployee() {
    return (
        <div >
            <Box
                component="nav"
                sx={{ display:{
                    xs: 'none',
                    md: 'flex'
                  }}}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    <Toolbar />
            
                    <Divider />
                    <List disablePadding>
                        {Sidebar.map((page, index) => (
                            <ListItem key={page.title} disablePadding>
                                <ListItemButton component="a" href={page.Link}>
                                    <ListItemIcon sx={{ color: "#1b5e20" }}>
                                        {index % 5 === 0 ? <AssignmentIndIcon /> : index % 5 === 1 ? <MeetingRoomIcon /> : index % 5 === 2 ? <HomeRepairServiceIcon /> : index % 5 === 3 ? <LibraryBooksIcon /> : <ChangeHistoryIcon />}
                                    </ListItemIcon>
                                    <ListItemText  primary={page.title}  sx={{ fontSize: 18, color: "#1b5e20" }} />
                                </ListItemButton>
                            </ListItem>
                        )

                        )}
                    </List>
                </Drawer>

            </Box>
        </div>
    )
}
