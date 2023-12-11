

import Clickablebooking from '@/app/components/Sidebar/Clickablebooking'
import { Box } from '@mui/material'



export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div >

            <Box sx={{ display: 'flex' }}>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Clickablebooking />
                    {children}
                </Box>
            </Box>
        </div>


    )
}