'use client'
import React, { useEffect, useState } from 'react'
import { Mali } from 'next/font/google';
import { AlertColor, Box, Button, Grid, Input, InputAdornment, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import BorderStyleIcon from '@mui/icons-material/BorderStyle';

const prompt = Mali({
    weight: ["300", "400"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});


interface Room {
    room: any
    id: number,
    name: string,
    no: string,
    active: boolean
}

export default function Itemroom() {
    const [rows, setRows] = useState<Room[]>([]);
    const [allrows, setAllRows] = useState<Room[]>([]);
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

    const columns = [
        { id: 'id', name: 'ลำดับที่' },
        { id: 'room', name: 'เลขที่ห้อง' },
        { id: 'name', name: 'ชื่อห้อง' },
        { id: 'no', name: 'จำนวนที่นั่ง' },
        { id: 'active', name: 'active' }
    ]
    useEffect(() => {
        // Use fetch to retrieve data from the API.
        fetch('/api/rooms')
            .then((res) => res.json())
            .then((rooms: Room[]) => {
                // console.log("ข้อมูลห้อง:", rooms);
                setRows(rooms);
                setAllRows(rooms);
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
            const filterData = allrows.filter((rooms) =>
                rooms.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                rooms.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
                rooms.id.toString().includes(searchQuery)
            );
            setRows(filterData);
        } else {
            setRows(allrows);
        }
    }

    rows.sort((a: Room, b: Room) => {
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
        <div className='flex'>
            <React.Fragment>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper sx={{ width: '100%', marginLeft: '15' }}>
                            <Box sx={{ paddingLeft: 10, paddingRight: 10, paddingTop: 2 }}>
                                <Input type="text"
                                    fullWidth
                                    sx={{ fontFamily: prompt.style.fontFamily }}
                                    placeholder="ค้นหาข้อมูลห้องด้วยเลขที่ห้อง หรือ ชื่อห้อง"
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
                                        <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
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
                                                        <TableCell/>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rows &&
                                                        rows
                                                            .slice(page * rowperpage, page * rowperpage + rowperpage)
                                                            .map((row, index) => {
                                                                const modifiedRow = { ...row, id: (page * rowperpage) + index + 1 };
                                                                const rowAnchorEl = menuAnchor.get(index);
                                                                return (
                                                                    <TableRow key={index}>
                                                                        {columns &&
                                                                            columns.map((column, index) => {
                                                                                const value = modifiedRow[column.id as keyof Room];
                                                                                if (column.id === 'active') {
                                                                                    return (
                                                                                        <TableCell
                                                                                            key={index}
                                                                                            style={{ minWidth: 130 }}
                                                                                            sx={{ fontFamily: prompt.style.fontFamily }}
                                                                                        >
                                                                                            <Switch checked={value as boolean}
                                                                                            />
                                                                                        </TableCell>
                                                                                    )
                                                                                }
                                                                                return (
                                                                                    <TableCell key={index}
                                                                                        sx={{ fontFamily: prompt.style.fontFamily }}>
                                                                                        {value.toString()}
                                                                                    </TableCell>

                                                                                );
                                                                            })
                                                                        }
                                                                        <TableCell key={index}
                                                                            sx={{ fontFamily: prompt.style.fontFamily }}
                                                                            align="right"
                                                                        >
                                                                            <Button color="success"
                                                                                href={`/driector/room/${row.id}`}
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
                                        >
                                        </TablePagination>
                                    </>
                                )}
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        </div>
    )
}
