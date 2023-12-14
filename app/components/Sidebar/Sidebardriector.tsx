'use client'
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import React from 'react'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import { Mali } from 'next/font/google';


const prompt = Mali({
    weight: ["300", "400"],
    style: ["normal", "italic"],
    subsets: ["latin"],
  });

const Sidebar = [{ title: "รายงาน", Link: "/driector" },
{ title: "คำร้องขอใช้บริการ", Link: "/driector/Servicerequest" }
]

const drawerWidth = 240;

export default function Sidebardriector() {
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
                                        {index % 2 === 0 ? <AssignmentIndIcon /> : <ChangeHistoryIcon />}
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
