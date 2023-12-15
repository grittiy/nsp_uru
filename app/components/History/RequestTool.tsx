
'use client'
import React, { useEffect, useState } from 'react'
import { Mali } from 'next/font/google';
import { Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
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

export default function RequestTool() {
    const [rows, setRows] = useState<Booking[]>([]);
    const [allrows, setAllRows] = useState<Booking[]>([]);

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
        { id: 'res', name: 'หมายเลขการยืม' },
        { id: 'name', name: 'ชื่อโครงการ' },
        { id: 'daterange', name: 'คำร้องขอใช้บริการ' },
        { id: 'status', name: 'สถานะ' }
    ]

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
                    return (
                        endDate <= twoDaysAgo &&
                        row.roomId === null &&
                        row.toolId !== null &&
                        (row.status === 'APPROVED' || row.status === 'NOTAPPROVED')
                    );
                });

                setRows(filteredRows);
                setAllRows(filteredRows);
            })
            .catch((error) => {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
            });
    }, []);

    return (
        <>
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
                                    <TableBody >
                                        {rows &&
                                            rows.map((row, rowIndex) => {
                                                const displayIndex ={ ...row, id: rowIndex + 1 }
                                                return (
                                                    <TableRow key={rowIndex}>
                                                        {columns &&
                                                            columns.map((column, index) => {
                                                                const value = displayIndex[column.id as keyof Booking];
                                                                if (column.id === 'daterange' && displayIndex['startdate'] && displayIndex['enddate']) {
                                                                    const startDate = new Date(displayIndex['startdate']);
                                                                    const endDate = new Date(displayIndex['enddate']);
                                                                    const formattedStartDate = format(startDate, 'dd MMMM yyyy HH:mm', { locale: thLocale, timeZone: 'Asia/Bangkok' });
                                                                    const formattedEndDate = format(endDate, 'dd MMMM yyyy HH:mm', { locale: thLocale, timeZone: 'Asia/Bangkok' });
            
                                                                    return (
                                                                        <TableCell key={index} sx={{ fontFamily: prompt.style.fontFamily }}>
                                                                            <span >{formattedStartDate}</span>
                                                                            <span style={{ color: '#f50057' }} > {'ถึง'} </span>
                                                                            <span >{formattedEndDate}</span>
                                                                        </TableCell>
                                                                    );
                                                                } else if (column.id === 'status') {
                                                                    let statusText = '';
                                                                    let statusColor = '';
                                                                    switch (value) {
                                                                        case 'WAITING':
                                                                            statusText = 'รอการตรวจสอบ'
                                                                            statusColor = '#85868a'; 
                                                                            break;
                                                                        case 'NOTAPPROVED':
                                                                            statusText = 'ไม่อนุมัติ';
                                                                            statusColor = '#f50057'; 
                                                                            break;
                                                                        case 'APPROVED':
                                                                            statusText = 'อนุมัติ';
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
                                                                    );
                                                                }
                                                                return (
                                                                    <TableCell key={index} sx={{ fontFamily: prompt.style.fontFamily }}>
                                                                        {value !== undefined ? value.toString() : ''}
                                                                    </TableCell>
                                                                );
                                                            })
                                                        }
                                                    </TableRow>
                                                    )

                                            }
                                            )
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        </>
    )
}
