'use client'
import { Alert, AlertColor, Box, Button, Grid, IconButton, Menu, MenuItem, Paper, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Mali } from 'next/font/google';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import { format } from 'date-fns-tz';
import thLocale from 'date-fns/locale/th';

const prompt = Mali({
    weight: ["300", "400"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});

interface Booking {
    name: string
    roomId: number
    id: number
    toolId: number
    startdate: Date
    enddate: Date
    status: string
}

export default function ItemStatementRoom() {
    const [rows, setRows] = useState<Booking[]>([]);
    const [allrows, setAllRows] = useState<Booking[]>([]);
    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [menuAnchor, setMenuAnchor] = useState<Map<number, HTMLElement | null>>(new Map());
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor | undefined>(undefined);

    const columns = [
        { id: 'id', name: 'ลำดับที่' },
        { id: 'name', name: 'ชื่อโครงการ' },
        { id: 'daterange', name: 'คำร้องขอใช้บริการ' },
        { id: 'status', name: 'สถานะการจอง' }
    ]

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
        // Calculate the date 2 days ago
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

        // Use fetch to retrieve data from the API with date filtering
        fetch(`/api/reservations?startDate=${twoDaysAgo.toISOString()}`)
            .then((res) => res.json())
            .then((Bookingrooms: Booking[]) => {
                // Filter out future reservations
                const filteredRows = Bookingrooms.filter((row) => {
                    const endDate = new Date(row.enddate);
                    return endDate >= twoDaysAgo && row.roomId !== null && row.toolId === null;
                });

                setRows(filteredRows);
                setAllRows(filteredRows);
            })
            .catch((error) => {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
            });
    }, []);


    rows.sort((a: Booking, b: Booking) => {
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

    const resetTable = () => {
        //Fetch new data from the API and update the table
        fetch('/api/reservations')
            .then((res) => res.json())
            .then((Bookingrooms: Booking[]) => {
                setRows(Bookingrooms);
                setAllRows(Bookingrooms);
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
                        <Grid item xs={12}>
                            <Paper sx={{ width: '100%', marginLeft: '15' }}>
                                <Box sx={{ paddingLeft: 10, paddingRight: 10, paddingTop: 2 }}>
                                    8hosk
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
                                                                        <TableRow key={index} >
                                                                            {columns &&
                                                                                columns.map((column, index) => {
                                                                                    const value = modifiedRow[column.id as keyof Booking];
                                                                                    if (column.id === 'daterange' && modifiedRow['startdate'] && modifiedRow['enddate']) {
                                                                                        const startDate = new Date(modifiedRow['startdate']);
                                                                                        const endDate = new Date(modifiedRow['enddate']);

                                                                                        const formattedStartDate = format(startDate, 'dd MMMM yyyy HH:mm', { locale: thLocale, timeZone: 'Asia/Bangkok' });
                                                                                        const formattedEndDate = format(endDate, 'dd MMMM yyyy HH:mm', { locale: thLocale, timeZone: 'Asia/Bangkok' });

                                                                                        return (
                                                                                            <TableCell key={index} sx={{ fontFamily: prompt.style.fontFamily }}>
                                                                                                <span style={{ color: '#2196f3' }}>{formattedStartDate}</span>
                                                                                                <span style={{ color: '#f50057' }}> {'=>'} </span>
                                                                                                <span style={{ color: '#2196f3' }}>{formattedEndDate}</span>
                                                                                            </TableCell>
                                                                                        );
                                                                                    } else if (column.id === 'status') {
                                                                                        let statusText = '';
                                                                                        let statusColor = '';
                                                                                        switch (value) {
                                                                                            case 'WAITING':
                                                                                                statusText = 'รอการตรวจสอบ'
                                                                                                statusColor = '#606269'; // Color for "รอการตรวจสอบ"
                                                                                                break;
                                                                                            case 'NOTAPPROVED':
                                                                                                statusText = 'ไม่อนุมัติ';
                                                                                                statusColor = '#f50057'; // Color for "ไม่อนุมัติ"
                                                                                                break;
                                                                                            case 'APPROVED':
                                                                                                statusText = 'อนุมัติ';
                                                                                                statusColor = '#4caf50'; // Color for "อนุมัติ"
                                                                                                break;
                                                                                            default:
                                                                                                statusText = 'N/A';
                                                                                                statusColor = ''; // Default color
                                                                                            }
                                                                                            

                                                                                        return (
                                                                                            <TableCell
                                                                                                key={index}
                                                                                                sx={{
                                                                                                    fontFamily: prompt.style.fontFamily,
                                                                                                    color: statusColor, // Set background color
                                                                                                }}
                                                                                            >
                                                                                                 {statusText}
                                                                                            </TableCell>
                                                                                        );
                                                                                    }

                                                                                    return (
                                                                                        <TableCell key={index} sx={{ fontFamily: prompt.style.fontFamily }}>
                                                                                            {value !== undefined ? value.toString() : ''}
                                                                                        </TableCell>
                                                                                    );
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
                                                                                            {/* <Button href={`/employee/room/edit/${row.id}`} startIcon={<ModeEditIcon />} sx={{ fontFamily: prompt.style.fontFamily }}>แก้ไข</Button> */}
                                                                                            x
                                                                                        </MenuItem>
                                                                                        <MenuItem onClick={() => handleClose(index)}>
                                                                                            dd
                                                                                            {/* <Button startIcon={<DeleteIcon />}
                                                                                            color="error"
                                                                                            onClick={() => handleDelete(row.id, page)}
                                                                                            sx={{ fontFamily: prompt.style.fontFamily }}>ลบ</Button> */}
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
