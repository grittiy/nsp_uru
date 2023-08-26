import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material'
import React, { useState } from 'react'
import WidgetsIcon from '@mui/icons-material/Widgets';

const drawerWidth = 240;

const DrawerComp = () => {
    
  const [openDrawer, setopenDrawer] = useState(false)   
  return (
    <React.Fragment>
        <Drawer
  
         open={openDrawer}
         onClose={() => setopenDrawer(false)}
         sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
             <Toolbar />
        <List onClick={() => setopenDrawer(false)}>
      
            <ListItemButton href="/">
                <ListItemText primary="ปฏิทิน" />
            </ListItemButton>

            <ListItemButton href="/">
                <ListItemText primary="บริการต่างๆ" />
            </ListItemButton>

            <ListItemButton href="/">
                <ListItemText primary="LINE OA" />
            </ListItemButton>
         
        </List>
        </Drawer>
        <IconButton  onClick={() => setopenDrawer(!openDrawer)}>
        <WidgetsIcon sx={{ color: "#388e3c" }} />
        </IconButton>
    </React.Fragment>
  )
}

export default DrawerComp