'use client'
import React, { useEffect, useState } from 'react'
import { Mali } from 'next/font/google';
import { useSession } from 'next-auth/react';
import { Alert, AlertColor, Box, Button, Grid, IconButton, Input, InputAdornment, Menu, MenuItem, Paper, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import HistoryDialogs from '../pop-up/historydialog';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import CheckRoom from '../History/CheckRoom';



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
}

export default function ItemChecktRoom() {
    const { data: session } = useSession()
    const [rows, setRows] = useState<Check[]>([]);
    const [allrows, setAllRows] = useState<Check[]>([]);
    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [menuAnchor, setMenuAnchor] = useState<Map<number, HTMLElement | null>>(new Map());
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor | undefined>(undefined);

    const columns = [
        { id: 'id', name: 'ลำดับที่' },
        { id: 'ch', name: 'หมายเลขสถานะ' },
        { id: 'bookingName', name: 'ชื่อโครงการ' },
        { id: 'status', name: 'สถานะ' },
    ]

    const checkStatus = [
        { value: "WAITING", label: "รอการตรวจสอบ" },
        { value: "NOTCHECKED", label: "ยังไม่ได้รับการตรวจสอบ" },
        { value: "CHECKED", label: "ตรวจสอบแล้ว" }
    ];

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

    useEffect(() => {
        fetch('/api/checks')
            .then((res) => res.json())
            .then((checksRoom: Check[]) => {
                const filteredRows = checksRoom.filter((row) => {
                    return row.roomId !== null && row.toolId === null && row.status !== 'CHECKED';
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

    const showSnackbar = (message: string, severity: 'error' | 'success' | 'info' | 'warning') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleStatusChange = async (id: number, newStatus: string) => {
        try {
            await axios.patch(`/api/checks/${id}`, { status: newStatus });
            const updatedRows = rows.map((row) => {
                if (row.id === id) {
                    return { ...row, status: newStatus };
                }
                return row;
            })
            setRows(updatedRows);
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการอัปเดตสถานะ:', error);
        }
    }

    const handleDelete = async (idToDelete: number, currentPage: number) => {
        deleteRow(idToDelete, currentPage);
    }

    const deleteRow = (idToDelete: number, currentPage: number) => {
        axios
            .delete(`/api/checks/${idToDelete}`)
            .then((response) => {
                showSnackbar('Data deleted!', 'success');

                if (rows.length === 1 && currentPage > 0) {
                    handlechangepage(null, currentPage - 1);
                } else {
                    // Reset the table
                    resetTable();
                }
            })
            .catch((err) => {
                console.log('error', err);
                showSnackbar(err, 'error');
            });
    }

    const resetTable = () => {
        //Fetch new data from the API and update the table
        fetch('/api/checks')
            .then((res) => res.json())
            .then((checksRoom: Check[]) => {
                const filteredRows = checksRoom.filter((row) => {
                    return row.roomId !== null && row.toolId === null && row.status !== 'CHECKED';
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
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isSnackbarOpen}
                autoHideDuration={5000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
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
                                        placeholder="ค้นหาข้อมูลตรวจสอบสถานะการจองห้องด้วยหมายเลขสถานะ"
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
                                                                <HistoryDialogs title='ประวัติการตรวจสอบสถานะการจองห้อง' >
                                                                    <CheckRoom />
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
                                                                                        return (
                                                                                            <TableCell
                                                                                                key={index}
                                                                                                style={{ minWidth: 130 }}
                                                                                                sx={{ fontFamily: prompt.style.fontFamily }}
                                                                                            >
                                                                                                <Select
                                                                                                    value={value}
                                                                                                    sx={{ fontFamily: prompt.style.fontFamily }}
                                                                                                    onChange={(e) => handleStatusChange(row.id, e.target.value.toString())}
                                                                                                >
                                                                                                    {checkStatus.map((status) => (
                                                                                                        <MenuItem
                                                                                                            key={status.value}
                                                                                                            sx={{
                                                                                                                fontFamily: prompt.style.fontFamily,
                                                                                                                display: status.value === 'WAITING' ? 'block' : 'none',
                                                                                                            }}
                                                                                                            value={status.value}
                                                                                                        >
                                                                                                            {status.label}
                                                                                                        </MenuItem>
                                                                                                    ))}
                                                                                                </Select>
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
                                                                            <TableCell key={index}>
                                                                                <div className='flex justify-center'>
                                                                                    <IconButton
                                                                                        id="long-button"
                                                                                        aria-controls={rowAnchorEl ? `menu-${index}` : undefined}
                                                                                        aria-expanded={Boolean(rowAnchorEl) ? 'true' : undefined}
                                                                                        aria-haspopup="true"
                                                                                        onClick={(e) => handleClick(e, index)}
                                                                                    >
                                                                                        <MoreVertIcon />
                                                                                    </IconButton>
                                                                                    <Menu
                                                                                        sx={{ mt: '45px' }}
                                                                                        id={`menu-${index}`}
                                                                                        anchorEl={rowAnchorEl}
                                                                                        anchorOrigin={{
                                                                                            vertical: 'top',
                                                                                            horizontal: 'right',
                                                                                        }}
                                                                                        keepMounted
                                                                                        transformOrigin={{
                                                                                            vertical: 'top',
                                                                                            horizontal: 'right',
                                                                                        }}
                                                                                        open={Boolean(rowAnchorEl)}
                                                                                        onClose={() => handleClose(index)}
                                                                                    >
                                                                                        <MenuItem>
                                                                                            <Button color="success" href={`/employee/checks/showdata/${row.id}`} startIcon={<VisibilityIcon />} sx={{ fontFamily: prompt.style.fontFamily }}>แสดงข้อมูล</Button>
                                                                                        </MenuItem>
                                                                                        <MenuItem>
                                                                                            <Button href={`/employee/checks/edit/${row.id}`} startIcon={<ModeEditIcon />} sx={{ fontFamily: prompt.style.fontFamily }}>แก้ไข</Button>
                                                                                        </MenuItem>

                                                                                        <MenuItem onClick={() => handleClose(index)}>
                                                                                            <Button startIcon={<DeleteIcon />}
                                                                                                color="error"
                                                                                                onClick={() => handleDelete(row.id, page)}
                                                                                                sx={{ fontFamily: prompt.style.fontFamily }}>ลบ</Button>
                                                                                        </MenuItem>
                                                                                    </Menu>
                                                                                </div>
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
