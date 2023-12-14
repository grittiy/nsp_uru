

import { Box } from '@mui/material'
import Sidebardriector from '../components/Sidebar/Sidebardriector'


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div >

        <Box sx={{ display: 'flex' }}>

            <Sidebardriector  />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {children}
            </Box>
        </Box>
        </div>


    )
}