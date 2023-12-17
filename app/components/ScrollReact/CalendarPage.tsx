'use client'
import React, { useEffect, useState } from 'react'
import { Mali } from 'next/font/google'
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { format } from 'date-fns-tz';
import thLocale from 'date-fns/locale/th';
import BorderStyleIcon from '@mui/icons-material/BorderStyle';

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
  userName: string
  toolName: string
  roomName: string
}

export default function CalendarPage() {
  const [rows, setRows] = useState<Booking[]>([]);
  const [allrows, setAllRows] = useState<Booking[]>([]);
  const [page, pagechange] = useState(0);
  const [rowperpage, rowperpagechange] = useState(5);
  const columns = [
    { id: 'id', name: 'ลำดับที่' },
    { id: 'name', name: 'ชื่อห้องและเครื่องมือ' },
    { id: 'daterange', name: 'คำร้องขอใช้บริการ' }
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
    <React.Fragment>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: "auto", flexDirection: 'column', alignItems: 'center',zIndex: 1 }}>
        <Typography align="center" sx={{ fontFamily: prompt.style.fontFamily, fontSize: 20, paddingTop: 5 }}>ตารางการจองห้องและยืม-คืนอุปกรณ์</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TableContainer sx={{ maxHeight: 440, paddingTop: 5 }} component={Paper}>
              <Table aria-label="simple table" stickyHeader>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
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
                                href={`/Booking/${row.id}`}
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
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  )
}
