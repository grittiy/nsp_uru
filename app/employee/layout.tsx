

import { Box } from '@mui/material'
import Sidebaremployee from '../components/Sidebar/Sidebaremployee'


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div >

        <Box sx={{ display: 'flex' }}>

            <Sidebaremployee  />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {children}
            </Box>
        </Box>
        </div>


    )
}