'use client'
import React, { useEffect, useState } from 'react'
import { Mali } from 'next/font/google';
import { useSession } from 'next-auth/react';
import { AlertColor, Box, Button, Grid, Input, InputAdornment, MenuItem, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import BorderStyleIcon from '@mui/icons-material/BorderStyle';

const prompt = Mali({
    weight: ["300", "400"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});

interface User {
    id: number
    name: string
    email: string
    fname: string
    phone: string
    role: string
    active: boolean
}

export default function Itemuser() {
    const { data: session } = useSession()
    const [rows, setRows] = useState<User[]>([]);
    const [allrows, setAllRows] = useState<User[]>([]);
    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [menuAnchor, setMenuAnchor] = useState<Map<number, HTMLElement | null>>(new Map());
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor | undefined>(undefined);

    const handleClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
        const newMenuAnchor = new Map(menuAnchor);
        newMenuAnchor.set(index, event.currentTarget);
        setMenuAnchor(newMenuAnchor);
    };

    const handleClose = (index: number) => {
        const newMenuAnchor = new Map(menuAnchor);
        newMenuAnchor.set(index, null);
        setMenuAnchor(newMenuAnchor);
    };

    const renderRole = (role: string) => {
        switch (role) {
            case 'USER':
                return (
                    <Typography variant="body2" sx={{ fontFamily: prompt.style.fontFamily, color: '#2196f3', fontWeight: 700 }}>
                        ผู้ใช้งาน
                    </Typography>
                );
            case 'EMPLOYEE':
                return (
                    <Typography variant="body2" sx={{ fontFamily: prompt.style.fontFamily, color: '#267928', fontWeight: 700 }}>
                        เจ้าหน้าที่
                    </Typography>
                );
            case 'DIRECTOR':
                return (
                    <Typography variant="body2" sx={{ fontFamily: prompt.style.fontFamily, color: '#6a3091', fontWeight: 700 }}>
                        ผู้อำนวยการ
                    </Typography>
                );
            case 'ADMIN':
                return (
                    <Typography variant="body2" sx={{ fontFamily: prompt.style.fontFamily, color: '#f50057', fontWeight: 700 }}>
                        แอดมิน
                    </Typography>
                );
            default:
                return null;
        }
    };


    const columns = [
        { id: 'id', name: 'ลำดับที่' },
        { id: 'name', name: 'ชื่อผู้ใช้งานระบบ' },
        { id: 'email', name: 'อีเมล์' },
        { id: 'fname', name: 'ชื่อ-นามสกุล' },
        { id: 'phone', name: 'หมายเลขโทรศัพท์' },
        { id: 'role', name: 'สิทธิ์ผู้ใช้งานระบบ' },
        { id: 'active', name: 'active' }
    ]

    useEffect(() => {
        // Use fetch to retrieve data from the API.
        fetch('/api/users')
            .then((res) => res.json())
            .then((users: User[]) => {
                // console.log("ข้อมูลผู้ใช้งานระบบ:", users);
                setRows(users);
                setAllRows(users);
            })
            .catch((error) => {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
            });
    }, [])

    useEffect(() => {
        searchData(searchQuery);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);

    const searchData = (searchQuery: string) => {
        if (searchQuery) {
            const filterData = allrows.filter((users) =>
                (users.name && users.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (users.email && users.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (users.fname && users.fname.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (users.phone && users.phone.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (users.id && users.id.toString().includes(searchQuery))
            );
            setRows(filterData);
        } else {
            setRows(allrows);
        }
    }

    rows.sort((a: User, b: User) => {
        return a.name.localeCompare(b.name, 'th');
    });

    const handlechangepage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        if (rows.length === 1 && newPage > 0 && newPage <= Math.floor((rows.length - 1) / rowperpage)) {
            // If there's only one row and the new page is within the valid range.
            handlechangepage(null, newPage - 1); // Decrease the page by 1.
        } else {
            pagechange(newPage);
        }
    }

    const handleRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        rowperpagechange(+event.target.value);
        pagechange(0);
    }



    return (
        <>
            <div className='flex'>
                <React.Fragment>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper sx={{ width: '100%', marginLeft: '15' }}>
                                <Box sx={{ paddingLeft: 10, paddingRight: 10, paddingTop: 2 }}>
                                    <Input type="text"
                                        fullWidth
                                        sx={{ fontFamily: prompt.style.fontFamily }}
                                        placeholder="ค้นหาข้อมูลผู้ใช้งานระบบด้วยชื่อผู้ใช้งานระบบ ชื่อ-นามสกุล อีเมล์ หรือเบอร์โทร"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <TroubleshootIcon />
                                            </InputAdornment>
                                        }
                                    />
                                </Box>
                                <br />
                                <div>
                                    {rows.length === 0 ? (
                                        <Typography variant="h6" sx={{ textAlign: 'center', fontFamily: prompt.style.fontFamily, color: "#b12525" }}>
                                            ไม่พบข้อมูลที่คุณกำลังค้นหา
                                        </Typography>
                                    ) : (
                                        <>
                                            <TableContainer component={Paper}>
                                                <Table aria-label="simple table" stickyHeader>
                                                    <TableHead>
                                                        <TableRow>
                                                            {columns.map((column) => (
                                                                <TableCell key={column.id}
                                                                    style={{ minWidth: 'auto' }}
                                                                    component="th" scope="row"
                                                                    sx={{ fontFamily: prompt.style.fontFamily, fontWeight: 700 }}
                                                                >
                                                                    {column.name}
                                                                </TableCell>
                                                            ))}
                                                            <TableCell />
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            rows &&
                                                            rows
                                                                .slice(page * rowperpage, page * rowperpage + rowperpage)
                                                                .map((row, index) => {
                                                                    const modifiedRow = { ...row, id: (page * rowperpage) + index + 1 };
                                                                    const rowAnchorEl = menuAnchor.get(index);
                                                                    return (
                                                                        <TableRow key={index}>
                                                                            {columns &&
                                                                                columns.map((column, index) => {
                                                                                    const value = modifiedRow[column.id as keyof User]
                                                                                    if (column.id === 'active') {
                                                                                        return (
                                                                                            <TableCell
                                                                                                key={index}
                                                                                                style={{ minWidth: 130 }}
                                                                                                sx={{ fontFamily: prompt.style.fontFamily }}
                                                                                            >
                                                                                                <Switch checked={value as boolean} />
                                                                                            </TableCell>
                                                                                        )
                                                                                    }


                                                                                    return (
                                                                                        <TableCell key={index}
                                                                                            sx={{ fontFamily: prompt.style.fontFamily }}>
                                                                                            {column.id === 'role' ? renderRole(value as string) : value !== null ? value.toString() : ''}
                                                                                        </TableCell>
                                                                                    )
                                                                                })
                                                                            }
                                                                            <TableCell key={index}
                                                                                sx={{ fontFamily: prompt.style.fontFamily }}
                                                                                align="right"
                                                                            >
                                                                                <Button color="success"
                                                                                    href={`/driector/showdata/${row.id}`}
                                                                                    startIcon={<BorderStyleIcon />}
                                                                                    sx={{ fontFamily: prompt.style.fontFamily }}
                                                                                />
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    )
                                                                })
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            <TablePagination
                                                rowsPerPageOptions={[5, 10, 20, 30]}
                                                rowsPerPage={rowperpage}
                                                page={page}
                                                count={rows.length}
                                                component="div"
                                                onPageChange={handlechangepage}
                                                onRowsPerPageChange={handleRowsPerPage}
                                            />
                                        </>
                                    )}
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </React.Fragment>
            </div>
        </>
    )
}
