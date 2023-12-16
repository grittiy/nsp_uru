'use client'

import React, { useEffect, useState } from 'react'
import { Mali } from 'next/font/google';
import { useSession } from 'next-auth/react';
import { Alert, AlertColor, Box, Button, Grid, Input, InputAdornment, MenuItem, Paper, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import { format } from 'date-fns-tz';
import thLocale from 'date-fns/locale/th';
import BorderStyleIcon from '@mui/icons-material/BorderStyle';
import axios from 'axios';

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
  userId: number
  startdate: Date
  enddate: Date
  status: string
}

export default function Itemrequest() {
  const { data: session } = useSession()
  const [rows, setRows] = useState<Booking[]>([]);
  const [allrows, setAllRows] = useState<Booking[]>([]);
  const [page, pagechange] = useState(0);
  const [rowperpage, rowperpagechange] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuAnchor, setMenuAnchor] = useState<Map<number, HTMLElement | null>>(new Map());
 
  const bookingStatus = [
    { value: "WAITING", label: "รอการตรวจสอบ" },
    { value: "NOTAPPROVED", label: "ไม่อนุมัติ" },
    { value: "APPROVED", label: "อนุมัติ" }
  ];

  const columns = [
    { id: 'id', name: 'ลำดับที่' },
    { id: 'res', name: 'หมายเลขการยืม' },
    { id: 'name', name: 'ชื่อโครงการ' },
    { id: 'daterange', name: 'คำร้องขอใช้บริการ' },
    { id: 'status', name: 'สถานะการจอง' }
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

          // Filter conditions
          return (
            (row.roomId !== null && row.toolId === null) ||
            (row.roomId === null && row.toolId !== null)
          ) && endDate >= twoDaysAgo;
        });

        setRows(filteredRows);
        setAllRows(filteredRows);
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
      });
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const bookingToUpdate = rows.find((row) => row.id === id);
      const { toolId, roomId,userId, id: bookingId } = bookingToUpdate as Booking;
      await axios.patch(`/api/reservations/${id}`, { status: newStatus });
      
      if (newStatus === 'APPROVED' && ((toolId === null && roomId !== null ) || (toolId !== null && roomId === null))) {
        await axios.post('/api/checks', {
          toolId,
          roomId,
          userId,
          bookingId
        });
      }

      const updatedStatus = rows.map((row) => {
        if (row.id === id) {
          return { ...row, status: newStatus };
        }
        return row;
      });
      setRows(updatedStatus);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการอัปเดตสถานะ:', error);
    }
  };

  useEffect(() => {
    searchData(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const searchData = (searchQuery: string) => {
    if (searchQuery) {
      const filterData = allrows.filter((booking) =>
        (booking.name && booking.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (booking.id && booking.id.toString().includes(searchQuery))
      )
      setRows(filterData)
    } else {
      setRows(allrows)
    }
  }

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
                    placeholder="ค้นหาข้อมูลการจองห้องด้วยชื่อโครงการ"
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
                                                  {bookingStatus.map((status) => (
                                                    <MenuItem key={status.value}
                                                      sx={{
                                                        fontFamily: prompt.style.fontFamily,
                                                        color:
                                                          status.value === 'WAITING'
                                                            ? '#606269'
                                                            : status.value === 'NOTAPPROVED'
                                                              ? '#f50057'
                                                              : status.value === 'APPROVED'
                                                                ? '#4caf50'
                                                                : '',
                                                      }}
                                                      value={status.value}
                                                    >
                                                      {status.label}
                                                    </MenuItem>
                                                  ))}
                                                </Select>
                                              </TableCell>
                                            )
                                          }
                                          return (
                                            <TableCell key={index} sx={{ fontFamily: prompt.style.fontFamily }}>
                                              {value !== undefined ? value.toString() : ''}
                                            </TableCell>
                                          );
                                        })
                                      }
                                      <TableCell key={index}
                                        sx={{ fontFamily: prompt.style.fontFamily }}
                                        align="right"
                                      >
                                        <Button color="success"
                                          href={`/driector/Servicerequest/${row.id}`}
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
    </>
  )
}
