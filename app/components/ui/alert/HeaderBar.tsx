'use client'
import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar, Typography,
  Button,
  CssBaseline,
  Container,
  Box,
  Stack,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Collapse,
  Badge
} from '@mui/material';
import {
  useSession,
  signOut,
  signIn
} from 'next-auth/react';
import Image from 'next/image';
import { Mali } from 'next/font/google';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';
import WidgetsIcon from '@mui/icons-material/Widgets';
import HomeIcon from '@mui/icons-material/Home';
import ForumIcon from '@mui/icons-material/Forum';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Link from 'next/link';
import useSWR from 'swr';

const prompt = Mali({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const menus = [{ title: "LINE OA", Link: "https://line.me/ti/p/~776cnnvc" },
{ title: "ตาราง", Link: "/Calendar" },
{ title: "บริการต่างๆ", Link: "/Services" },
]

const menuUser = [{ title: "LINE OA", Link: "https://line.me/ti/p/~776cnnvc" },
{ title: "ตาราง", Link: "/Calendar" },
{ title: "บริการต่างๆ", Link: "/Services" },
{ title: "รายการ", Link: "/user" },
]

const menuAdmin = [{ title: "LINE OA", Link: "https://line.me/ti/p/~776cnnvc" },
{ title: "ตาราง", Link: "/Calendar" },
{ title: "บริการต่างๆ", Link: "/Services" },
{ title: "รายการ", Link: "/admin" },
]

const menuEmployee = [{ title: "LINE OA", Link: "https://line.me/ti/p/~776cnnvc" },
{ title: "ตาราง", Link: "./Calendar" },
{ title: "บริการต่างๆ", Link: "/Services" },
{ title: "รายการ", Link: "/employee" },
]
const drawerEmployee = [
  { title: "หน้าหลัก", Link: "/" },
  { title: "LINE OA", Link: "https://line.me/ti/p/~776cnnvc" },
  { title: "ตาราง", Link: "/Calendar" },
  { title: "บริการต่างๆ", Link: "/Services" },

]

const drawerE = [
  { title: "ผู้เข้าใช้ระบบ", Link: "/employee" },
  { title: "ห้อง", Link: "/employee/room" },
  { title: "เครื่องมือ", Link: "/employee/tool" },
  { title: "รายงาน", Link: "./employee" },
  { title: "การตรวจสอบสถานะ", Link: "./employee" },

]

const menuDirector = [{ title: "LINE OA", Link: "https://line.me/ti/p/~776cnnvc" },
{ title: "ตาราง", Link: "/Calendar" },
{ title: "บริการต่างๆ", Link: "/Services" },
{ title: "รายการ", Link: "/driector" },
]

const imageStyle = {
  width: "auto",
  height: "auto"

}

const drawerWidth = 240;

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function DirectorAppBar() {
  const { data: session } = useSession();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [openDrawer, setopenDrawer] = useState(false)


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <header className='flex'>
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" sx={{ background: "#fcfafa", zIndex: (theme) => theme.zIndex.drawer + 1 }} >
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
              <Box
                sx={{
                  flexGrow: 'auto',
                  display: { xs: 'flex', md: 'none' }
                }}
              >
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
                      <ListItemIcon sx={{ color: "#1b5e20" }}>
                        <HomeIcon />
                      </ListItemIcon>
                      <ListItemText primary="หน้าหลัก" sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }} />
                    </ListItemButton>

                    {menuDirector.map((menu, index) => (
                      <ListItem key={menu.title} disablePadding>
                        <ListItemButton component="a" href={menu.Link}>
                          <ListItemIcon sx={{ color: "#1b5e20" }}>
                            {index % 3 === 0 ? <ForumIcon /> : index % 3 === 1 ? <CalendarMonthIcon /> : <MenuBookIcon />}
                          </ListItemIcon>
                          <ListItemText primary={menu.title} sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Drawer>
                <IconButton onClick={() => setopenDrawer(!openDrawer)}>
                  <WidgetsIcon sx={{ color: "#388e3c" }} />
                </IconButton>
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
              <Box
                sx={{
                  flexGrow: 1,
                  display: {
                    xs: 'none',
                    md: 'flex'
                  }
                }}
              >
                <Stack
                  onClick={handleCloseNavMenu}
                  spacing={2}
                  direction="row"
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    marginLeft: '10%'
                  }}
                >
                  {menuDirector.map((menu) => (
                    <Button
                      key={menu.title}
                      href={menu.Link}
                      onClick={handleCloseNavMenu}
                      sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }}
                    >
                      {menu.title}
                    </Button>
                  ))}
                </Stack>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                {session?.user ? (
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu}
                      sx={{ p: 0 }}
                    >
                      <Avatar src={session.user.image} />
                    </IconButton>
                  </Tooltip>
                ) : null
                }
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
                  <MenuItem onClick={handleCloseUserMenu} component={Link} href="/Profile">
                    <Typography textAlign="center" >
                      <ListItemIcon>
                        <AssignmentIndIcon color="success" />
                      </ListItemIcon>
                      {session?.user && (
                        <Button href={`/Profile/${session.user.id}`} sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }}>
                          {session.user.name}
                        </Button>
                      )}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" >
                      <ListItemIcon>
                        <LogoutIcon color="success" />
                      </ListItemIcon>
                      <Button sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }} onClick={() => signOut({ callbackUrl: '/' })}>ออกจากระบบ</Button>
                    </Typography>
                  </MenuItem>

                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </React.Fragment>
    </header>
  );
}

function EmployeeAppBar() {
  const { data: carts } = useSWR('/api/carts', fetcher);
  const { data: session } = useSession();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [openDrawer, setopenDrawer] = useState(false)
  const [isCollapse, setIsCollapse] = useState(false);
  const badgeContent = carts ? carts.length : 0;

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const handleOpenReport = () => {
    setIsCollapse(!isCollapse); // กลับและปิด Collapse
  };
  return (
    <header className='flex'>
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" sx={{ background: "#fcfafa", zIndex: (theme) => theme.zIndex.drawer + 1 }} >
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
              <Box
                sx={{
                  flexGrow: 'auto',
                  display: { xs: 'flex', md: 'none' }
                }}
              >
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
                  <List>
                    {drawerEmployee.map((menu, index) => (
                      <ListItem key={menu.title} disablePadding>
                        <ListItemButton component="a" href={menu.Link}>
                          <ListItemIcon sx={{ color: "#1b5e20" }}>
                            {index % 4 === 0 ? <HomeIcon /> : index % 4 === 1 ? <ForumIcon /> : index % 4 === 2 ? <CalendarMonthIcon /> : <MenuBookIcon />}
                          </ListItemIcon>
                          <ListItemText primary={menu.title} sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                    <ListItem disablePadding>
                      <ListItemButton onClick={handleOpenReport}>
                        <ListItemIcon sx={{ color: "#1b5e20" }}>
                          <AssessmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="รายงาน" sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }} />
                        {isCollapse ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                      </ListItemButton>
                    </ListItem>
                  </List>
                  <Divider />
                  <Collapse in={isCollapse} timeout={"auto"} unmountOnExit>
                    <List className='ml-4' >
                      {drawerE.map((menu, index) => (
                        <ListItem key={menu.title} disablePadding>
                          <ListItemButton component="a" href={menu.Link}>
                            <ListItemIcon sx={{ color: "#1b5e20" }}>
                              {index % 5 === 0 ? <AssignmentIndIcon /> : index % 5 === 1 ? <MeetingRoomIcon /> : index % 5 === 2 ? <HomeRepairServiceIcon /> : index % 5 === 3 ? <LibraryBooksIcon /> : <ChangeHistoryIcon />}                         </ListItemIcon>
                            <ListItemText primary={menu.title} sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </Drawer>
                <IconButton onClick={() => setopenDrawer(!openDrawer)}>
                  <WidgetsIcon sx={{ color: "#388e3c" }} />
                </IconButton>
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
              <Box
                sx={{
                  flexGrow: 1,
                  display: {
                    xs: 'none',
                    md: 'flex'
                  }
                }}
              >
                <Stack
                  onClick={handleCloseNavMenu}
                  spacing={2}
                  direction="row"
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    marginLeft: '10%'
                  }}
                >
                  {menuEmployee.map((menu) => (
                    <Button
                      key={menu.title}
                      href={menu.Link}
                      onClick={handleCloseNavMenu}
                      sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }}
                    >
                      {menu.title}
                    </Button>
                  ))}
                </Stack>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                {session?.user ? (
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu}
                      sx={{ p: 0 }}
                    >
                      <Avatar src={session.user.image} />
                    </IconButton>
                  </Tooltip>
                ) : null
                }
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
                    {session?.user && (
                      <Button href={`/Profile/${session.user.id}`}  sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }}>
                        {session.user.name}
                      </Button>
                    )}
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu} component={Link} href="/carts">
                    <ListItemIcon>
                      <Badge color="success" badgeContent={badgeContent}>
                        <ShoppingBasketIcon color="success" />
                      </Badge>
                    </ListItemIcon>
                    <Button sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }} >ตะกร้า</Button>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <ListItemIcon>
                      <LogoutIcon color="success" />
                    </ListItemIcon>
                    <Button sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }} onClick={() => signOut({ callbackUrl: '/' })}>ออกจากระบบ</Button>
                  </MenuItem>

                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </React.Fragment>
    </header>
  );
}

function AdminAppBar() {
  const { data: session } = useSession();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [openDrawer, setopenDrawer] = useState(false)
  const { data: carts } = useSWR('/api/carts', fetcher);
  const badgeContent = carts ? carts.length : 0;
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <header className='flex'>
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" sx={{ background: "#fcfafa", zIndex: (theme) => theme.zIndex.drawer + 1 }} >
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
              <Box
                sx={{
                  flexGrow: 'auto',
                  display: { xs: 'flex', md: 'none' }
                }}
              >
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
                      <ListItemIcon sx={{ color: "#1b5e20" }}>
                        <HomeIcon />
                      </ListItemIcon>
                      <ListItemText primary="หน้าหลัก" sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }} />
                    </ListItemButton>

                    {menuAdmin.map((menu, index) => (
                      <ListItem key={menu.title} disablePadding>
                        <ListItemButton component="a" href={menu.Link}>
                          <ListItemIcon sx={{ color: "#1b5e20" }}>
                            {index % 3 === 0 ? <ForumIcon /> : index % 3 === 1 ? <CalendarMonthIcon /> : <MenuBookIcon />}
                          </ListItemIcon>
                          <ListItemText primary={menu.title} sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Drawer>
                <IconButton onClick={() => setopenDrawer(!openDrawer)}>
                  <WidgetsIcon sx={{ color: "#388e3c" }} />
                </IconButton>
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
              <Box
                sx={{
                  flexGrow: 1,
                  display: {
                    xs: 'none',
                    md: 'flex'
                  }
                }}
              >
                <Stack
                  onClick={handleCloseNavMenu}
                  spacing={2}
                  direction="row"
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    marginLeft: '10%'
                  }}
                >
                  {menuAdmin.map((menu) => (
                    <Button
                      key={menu.title}
                      href={menu.Link}
                      onClick={handleCloseNavMenu}
                      sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }}
                    >
                      {menu.title}
                    </Button>
                  ))}
                </Stack>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                {session?.user ? (
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu}
                      sx={{ p: 0 }}
                    >
                      <Avatar src={session.user.image} />
                    </IconButton>
                  </Tooltip>
                ) : null
                }
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
                  <MenuItem onClick={handleCloseUserMenu} component={Link} href="/Profile">
                    <ListItemIcon>
                      <AssignmentIndIcon color="success" />
                    </ListItemIcon>
                    {session?.user && (
                      <Button href={`/Profile/${session.user.id}`} sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }}>
                        {session.user.name}
                      </Button>
                    )}
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu} component={Link} href="/carts">
                    <ListItemIcon>
                      <Badge color="success" badgeContent={badgeContent}>
                        <ShoppingBasketIcon color="success" />
                      </Badge>
                    </ListItemIcon>
                    <Button sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }} >ตะกร้า</Button>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <ListItemIcon>
                      <LogoutIcon color="success" />
                    </ListItemIcon>
                    <Button sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }} onClick={() => signOut({ callbackUrl: '/' })}>ออกจากระบบ</Button>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </React.Fragment>
    </header>
  );
}

function UserAppBar() {
  const { data: session } = useSession();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [openDrawer, setopenDrawer] = useState(false)
  const { data: carts } = useSWR('/api/carts', fetcher);
  const badgeContent = carts ? carts.length : 0;
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <header className='flex'>
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" sx={{ background: "#fcfafa", zIndex: (theme) => theme.zIndex.drawer + 1 }} >
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
              <Box
                sx={{
                  flexGrow: 'auto',
                  display: { xs: 'flex', md: 'none' }
                }}
              >
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
                      <ListItemIcon sx={{ color: "#1b5e20" }}>
                        <HomeIcon />
                      </ListItemIcon>
                      <ListItemText primary="หน้าหลัก" sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }} />
                    </ListItemButton>

                    {menuUser.map((menu, index) => (
                      <ListItem key={menu.title} disablePadding>
                        <ListItemButton component="a" href={menu.Link}>
                          <ListItemIcon sx={{ color: "#1b5e20" }}>
                            {index % 3 === 0 ? <ForumIcon /> : index % 3 === 1 ? <CalendarMonthIcon /> : <MenuBookIcon />}
                          </ListItemIcon>
                          <ListItemText primary={menu.title} sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Drawer>
                <IconButton onClick={() => setopenDrawer(!openDrawer)}>
                  <WidgetsIcon sx={{ color: "#388e3c" }} />
                </IconButton>
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
              <Box
                sx={{
                  flexGrow: 1,
                  display: {
                    xs: 'none',
                    md: 'flex'
                  }
                }}
              >
                <Stack
                  onClick={handleCloseNavMenu}
                  spacing={2}
                  direction="row"
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    marginLeft: '10%'
                  }}
                >
                  {menuUser.map((menu) => (
                    <Button
                      key={menu.title}
                      href={menu.Link}
                      onClick={handleCloseNavMenu}
                      sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }}
                    >
                      {menu.title}
                    </Button>
                  ))}
                </Stack>
              </Box>
              <Box sx={{ flexGrow: 0 }}>

                {session?.user ? (
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu}
                      sx={{ p: 0 }}
                    >
                      <Avatar src={session.user.image} />
                    </IconButton>
                  </Tooltip>
                ) : null
                }
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
                    {session?.user && (
                      <Button href={`/Profile/${session.user.id}`} sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }}>
                        {session.user.name}
                      </Button>
                    )}
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <ListItemIcon>
                      <LogoutIcon color="success" />
                    </ListItemIcon>
                    <Button sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }} onClick={() => signOut({ callbackUrl: '/' })}>ออกจากระบบ</Button>
                  </MenuItem>

                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </React.Fragment>
    </header>
  );
}

function NullAppBar() {
  const { data: session } = useSession();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [openDrawer, setopenDrawer] = useState(false)


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <header className='flex'>
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" sx={{ background: "#fcfafa", zIndex: (theme) => theme.zIndex.drawer + 1 }} >
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
              <Box
                sx={{
                  flexGrow: 'auto',
                  display: { xs: 'flex', md: 'none' }
                }}
              >
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
                      <ListItemIcon sx={{ color: "#1b5e20" }}>
                        <HomeIcon />
                      </ListItemIcon>
                      <ListItemText primary="หน้าหลัก" sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }} />
                    </ListItemButton>

                    {menus.map((menu, index) => (
                      <ListItem key={menu.title} disablePadding>
                        <ListItemButton component="a" href={menu.Link}>
                          <ListItemIcon sx={{ color: "#1b5e20" }}>
                            {index % 3 === 0 ? <ForumIcon /> : index % 3 === 1 ? <CalendarMonthIcon /> : <MenuBookIcon />}
                          </ListItemIcon>
                          <ListItemText primary={menu.title} sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Drawer>
                <IconButton onClick={() => setopenDrawer(!openDrawer)}>
                  <WidgetsIcon sx={{ color: "#388e3c" }} />
                </IconButton>
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
              <Box
                sx={{
                  flexGrow: 1,
                  display: {
                    xs: 'none',
                    md: 'flex'
                  }
                }}
              >
                <Stack
                  onClick={handleCloseNavMenu}
                  spacing={2}
                  direction="row"
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    marginLeft: '10%'
                  }}
                >
                  {menus.map((menu) => (
                    <Button
                      key={menu.title}
                      href={menu.Link}
                      onClick={handleCloseNavMenu}
                      sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }}
                    >
                      {menu.title}
                    </Button>
                  ))}
                </Stack>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                {session?.user ? (
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu}
                      sx={{ p: 0 }}
                    >
                      <Avatar src={session.user.image} />
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
                  <MenuItem onClick={handleCloseUserMenu} component={Link} href="/Profile">
                    <ListItemIcon>
                      <AssignmentIndIcon color="success" />
                    </ListItemIcon>
                    {session?.user && (
                      <Button href={`/Profile/${session.user.id}`} sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }}>
                        {session.user.name}
                      </Button>
                    )}
                  </MenuItem>

                  <MenuItem onClick={handleCloseUserMenu}>
                    <ListItemIcon>
                      <LogoutIcon color="success" />
                    </ListItemIcon>
                    <Button sx={{ fontFamily: prompt.style.fontFamily, fontSize: 18, color: "#1b5e20" }} onClick={() => signOut({ callbackUrl: '/' })}>ออกจากระบบ</Button>
                  </MenuItem>

                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </React.Fragment>
    </header>
  );
}


function MyAppBar() {
  const { data: session } = useSession();

  if (!session) {
    return <NullAppBar />; // ไม่แสดง AppBar ถ้ายังไม่ได้เข้าสู่ระบบ
  }

  switch (session.user.role) {
    case 'ADMIN':
      return <AdminAppBar />;
    case 'DIRECTOR':
      return <DirectorAppBar />;
    case 'EMPLOYEE':
      return <EmployeeAppBar />;
    case 'USER':
      return <UserAppBar />;
    default:
      return null; // หรือทำตามที่คุณต้องการ
  }
}

export default MyAppBar;