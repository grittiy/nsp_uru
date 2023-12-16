'use client'
import React, { useEffect, useState } from 'react'
import { Mali } from 'next/font/google';
import { useSession } from 'next-auth/react';
import { Alert, AlertColor, Box, Button, Grid, IconButton, Input, InputAdornment, Menu, MenuItem, Paper, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import HistoryDialogs from '../pop-up/historydialog';
import axios from 'axios';
import CheckRooms from '../History/CheckRooms';
import BorderStyleIcon from '@mui/icons-material/BorderStyle';

const prompt = Mali({
    weight: ["300", "400"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});

interface Check {
    id: number
    ch: string
    status: string
    roomId: number
    toolId: number
    bookingId: number
    userId: number
    details: string
    note: string
    bookingName: string
    updatedAt: Date
}

export default function ItemchecktTool() {
    const { data: session } = useSession()
    const [rows, setRows] = useState<Check[]>([]);
    const [allrows, setAllRows] = useState<Check[]>([]);
    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [menuAnchor, setMenuAnchor] = useState<Map<number, HTMLElement | null>>(new Map());
  
    const columns = [
        { id: 'id', name: 'ลำดับที่' },
        { id: 'ch', name: 'หมายเลขสถานะ' },
        { id: 'bookingName', name: 'ชื่อโครงการ' },
        { id: 'status', name: 'สถานะ' },
    ]

    useEffect(() => {
        fetch('/api/checks')
            .then((res) => res.json())
            .then((checksRoom: Check[]) => {
                const filteredRows = checksRoom.filter((row) => {
                    const updatedAtDate = new Date(row.updatedAt);

                    // Check if the updatedAt date is in the current month
                    const isCurrentMonth = updatedAtDate.getMonth() === new Date().getMonth();

                    return row.roomId === null && row.toolId !== null && row.status === 'CHECKED' &&
                        isCurrentMonth;
                });

                // Fetch reservation details for each check
                const fetchReservationDetails = async () => {
                    const rowsWithReservationDetails = await Promise.all(
                        filteredRows.map(async (row) => {
                            const reservation = await fetch(`/api/reservations/${row.bookingId}`).then((res) => res.json());
                            return { ...row, bookingName: reservation.name };
                        })
                    );
                    setRows(rowsWithReservationDetails);
                    setAllRows(rowsWithReservationDetails);
                };

                fetchReservationDetails();
            })
            .catch((error) => {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
            });
    }, []);



    useEffect(() => {
        searchData(searchQuery);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);

    const searchData = (searchQuery: string) => {
        if (searchQuery) {
            const filterData = allrows.filter((check) =>
                // check.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                check.ch.toLowerCase().includes(searchQuery.toLowerCase()) ||
                check.bookingName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                check.id.toString().includes(searchQuery)
            );
            setRows(filterData);
        } else {
            setRows(allrows);
        }
    }

    rows.sort((a: Check, b: Check) => {
        return a.ch.localeCompare(b.ch, 'th');
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



    const resetTable = () => {
        //Fetch new data from the API and update the table
        fetch('/api/checks')
            .then((res) => res.json())
            .then((checksRoom: Check[]) => {
                const filteredRows = checksRoom.filter((row) => {
                    const updatedAtDate = new Date(row.updatedAt);

                    // Check if the updatedAt date is in the current month
                    const isCurrentMonth = updatedAtDate.getMonth() === new Date().getMonth();

                    return row.roomId === null && row.toolId !== null && row.status === 'CHECKED' &&
                        isCurrentMonth;
                });

                // Fetch reservation details for each check
                const fetchReservationDetails = async () => {
                    const rowsWithReservationDetails = await Promise.all(
                        filteredRows.map(async (row) => {
                            const reservation = await fetch(`/api/reservations/${row.bookingId}`).then((res) => res.json());
                            return { ...row, bookingName: reservation.name };
                        })
                    );
                    setRows(rowsWithReservationDetails);
                    setAllRows(rowsWithReservationDetails);
                };

                fetchReservationDetails();
            })
            .catch((error) => {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
            });
    };

    return (
        <>
            <div className='flex'>
                <React.Fragment>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <Paper sx={{ width: '100%', marginLeft: '15' }}>
                                <Box sx={{ paddingLeft: 10, paddingRight: 10, paddingTop: 2 }}>
                                    <Input
                                        type="text"
                                        fullWidth
                                        sx={{ fontFamily: prompt.style.fontFamily }}
                                        placeholder="ค้นหาข้อมูลตรวจสอบสถานะการยืม-คืนด้วยหมายเลขสถานะหรือชื่อโครงการ"
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
                                                            <TableCell align="right">
                                                                <HistoryDialogs title='ประวัติการตรวจสอบสถานะการยืม-คืนเครื่องมือ' >
                                                                    <CheckRooms />
                                                                </HistoryDialogs>
                                                            </TableCell>
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
                                                                                    const value = modifiedRow[column.id as keyof Check];
                                                                                    if (column.id === 'status') {
                                                                                        let statusText = '';
                                                                                        let statusColor = '';
                                                                                        switch (value) {
                                                                                            case 'CHECKED':
                                                                                                statusText = 'ตรวจสอบแล้ว';
                                                                                                statusColor = '#4caf50';
                                                                                                break;
                                                                                            default:
                                                                                                statusText = 'N/A';
                                                                                                statusColor = '';
                                                                                        }
                                                                                        return (
                                                                                            <TableCell
                                                                                                key={index}
                                                                                                sx={{
                                                                                                    fontFamily: prompt.style.fontFamily,
                                                                                                    color: statusColor
                                                                                                }}
                                                                                            >
                                                                                                {statusText}
                                                                                            </TableCell>
                                                                                        )
                                                                                    } else if (column.id === 'bookingName') {
                                                                                        return (
                                                                                            <TableCell key={index} sx={{ fontFamily: prompt.style.fontFamily }}>
                                                                                                {value !== undefined ? value.toString() : ''}
                                                                                            </TableCell>
                                                                                        );
                                                                                    } else {
                                                                                        return (
                                                                                            <TableCell key={index} sx={{ fontFamily: prompt.style.fontFamily }}>
                                                                                                {value !== undefined ? value.toString() : ''}
                                                                                            </TableCell>
                                                                                        );
                                                                                    }
                                                                                })
                                                                            }
                                                                            <TableCell key={index}
                                                                                sx={{ fontFamily: prompt.style.fontFamily }}
                                                                                align="right"
                                                                            >
                                                                                <Button color="success"
                                                                                    href={`/driector/check/${row.id}`}
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
                                    )
                                    }
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </React.Fragment>
            </div>
        </>
    )
}
