'use client'
import React, { useEffect, useState } from 'react'
import { Mali } from 'next/font/google';
import { Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

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
export default function CheckRooms() {
    const [rows, setRows] = useState<Check[]>([]);
    const [allrows, setAllRows] = useState<Check[]>([]);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#321b5e',
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

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
                    !isCurrentMonth;
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
    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper sx={{ width: '100%' }}>
                        <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
                            <Table aria-label="simple table" stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <StyledTableCell key={column.id}
                                                style={{ minWidth: 'auto' }}
                                                component="th" scope="row"
                                                sx={{ fontFamily: prompt.style.fontFamily, fontWeight: 700 }}
                                            >
                                                {column.name}
                                            </StyledTableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows &&
                                        rows.map((row, rowIndex) => {
                                            const displayIndex = { ...row, id: rowIndex + 1 }
                                            return (
                                                <TableRow key={rowIndex}>
                                                    {columns &&
                                                        columns.map((column, index) => {
                                                            const value = displayIndex[column.id as keyof Check];
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
                                                            } else if  (column.id === 'bookingName')  {
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
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
