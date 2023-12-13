

import { Box } from '@mui/material'
import Sidebaruser from '../components/Sidebar/Sidebaruser'



export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div >

        <Box sx={{ display: 'flex' }}>

            <Sidebaruser  />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {children}
            </Box>
        </Box>
        </div>


    )
}