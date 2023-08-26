'use client'
import React from 'react'
import { signIn, signOut, useSession } from "next-auth/react";
import { AppBar, Avatar, Box, Button, Container, IconButton, ListItemIcon, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography, useScrollTrigger } from '@mui/material'

import Image from 'next/image';


import DrawerComp from './DrawerComp';
import { deepOrange } from '@mui/material/colors';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';
import { Mali } from 'next/font/google';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BadgeIcon from '@mui/icons-material/Badge';
import FolderSharedIcon from '@mui/icons-material/FolderShared';

import Link from 'next/link';
import ScrollButton from './ScrollButton';
import { getServerSession } from 'next-auth';

const prompt = Mali({
    weight: ["300", "400"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});

const imageStyle = {
    width: "auto",
    height: "auto"

}

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children: React.ReactElement;
}

function ElevationScroll(props: Props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

interface AppBarProps {
    userRole: 'ADMIN' | 'DIRECTOR' | 'EMPLOYEE' | 'USER';
}
const Appbar: React.FC<AppBarProps> = ({ userRole}) => {
    const isAdmin = userRole === 'ADMIN';
    const isDirector = userRole === 'DIRECTOR';
    const isEmployee = userRole === 'EMPLOYEE';
    const isUser = userRole === 'USER';
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const { data: session } = useSession()
    // if (session && session.user) {
    //     return (
    //         <div className="flex gap-4 ml-auto">
    //             <p className="text-sky-600">{session.user.name}</p>
    //             <button onClick={() => signOut()} className="text-red-600">
    //                 Sign Out
    //             </button>
    //         </div>
    //     )
    console.log(session?.user)
    // }


    return (
        <header className='flex'>
            <ElevationScroll>
                <AppBar position="sticky" sx={{ background: "#fcfafa", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 1,

                                    display: { xs: 'none', md: 'flex' },
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',

                                }}
                            >
                                <div>
                                    <Image
                                        src={'/images/uru.png'}
                                        alt="logo"
                                        width={200}
                                        height={200}
                                        priority={true}
                                        style={imageStyle}

                                    />
                                </div>
                            </Typography>
                            <Box sx={{
                                flexGrow: 'auto',
                                display: { xs: 'flex', md: 'none' }
                            }}>
                                <DrawerComp />
                            </Box>
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'flex', md: 'none' },
                                    flexGrow: 1,
                                    marginLeft: 10,
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                <div>
                                    <Image
                                        src={'/images/uru.png'}
                                        alt="logo"
                                        width={80}
                                        height={200}
                                        priority={true}
                                        style={imageStyle}
                                    />
                                </div>
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                <Stack onClick={handleCloseNavMenu} spacing={2} direction="row"
                                    sx={{ my: 2, color: 'white', display: 'block', marginLeft: '10%' }}>
                                       
                                    <ScrollButton />
                                       
                                    {/*                                     
                                        <Button sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }}>LINE OA</Button>
                                        <Button sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }}>ปฏิทิน</Button>
                                        <Button sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }}>บริการต่างๆ</Button> */}
                                    {isAdmin && (
                                        <Link href="/admin">
                                            <Button sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }} startIcon={<AdminPanelSettingsIcon />}>รายการ</Button>
                                        </Link>
                                    )}
                                    {isDirector && (
                                        <Link href="/">
                                            <Button sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }} startIcon={<FolderSharedIcon />}>รายการ</Button>
                                        </Link>
                                    )}
                                    {isEmployee && (
                                        <Link href="/">
                                            <Button sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }} startIcon={<BadgeIcon />}>รายการ</Button>
                                        </Link>
                                    )}
                                    {isUser && (
                                        <Link href="/user">
                                            <Button sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }} >รายการ</Button>
                                        </Link>
                                    )}

                                </Stack>
                            </Box>
                            <Box sx={{ flexGrow: 0 }}>
                                {session?.user ? (
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar src={session.user.image}/>
                                        </IconButton>
                                    </Tooltip>
                                ) : (

                                    <Button sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20", p: 0 }} onClick={() => signIn()}>เข้าสู่ระบบ</Button>
                                )}
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <ListItemIcon>
                                            <AssignmentIndIcon color="success" />
                                        </ListItemIcon>
                                        <Button sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }} > {session?.user
                                            ? (<p>{session.user.name}</p>)
                                            : null}</Button>
                                        {/* {session.user.name} */}
                                        {/* {session?.user
                        ?(<p>{session.user.name}</p>)
                       :null } */}
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <ListItemIcon>
                                            <LogoutIcon color="success" />
                                        </ListItemIcon>
                                        <Button sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }} onClick={() => signOut({ callbackUrl: '/' })}>ออกจากระบบ</Button>
                                    </MenuItem>
                                </Menu>

                                {/*                
                    <>
                        

                        <Avatar sx={{ bgcolor: deepOrange[500] }}>EM</Avatar>
                        <Button sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }} onClick={() => signOut({ callbackUrl: '/' })}>ออกจากระบบ</Button>

                    </> */}

                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </ElevationScroll>
        </header>
    )
}

export default Appbar