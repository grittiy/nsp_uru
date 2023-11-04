'use client'
import React, { useEffect, useState } from 'react'
import { Alert, AlertColor, Box, Button, Grid, IconButton, Input, InputAdornment, ListItemIcon, Menu, MenuItem, Paper, Snackbar, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import { Mali } from 'next/font/google';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'

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

// eslint-disable-next-line @next/next/no-async-client-component
export default function Item() {
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

  const handleActiveToggle = async (id: number, active: boolean) => {
    try {
      // Update the Active status in the database.
      await fetch(`/api/rooms/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ active })
      })
      const updatedRows = rows.map((row) => {
        if (row.id === id) {
          return { ...row, active };
        }
        return row;
      });
      setRows(updatedRows);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการอัปเดตสถานะ Active:', error);
    }
  };

  const showSnackbar = (message: string, severity: 'error' | 'success' | 'info' | 'warning') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleDelete = async (idToDelete: number, currentPage: number) => {
    // console.log('row', idToDelete);
    deleteRow(idToDelete, currentPage);
  };

  const deleteRow = (idToDelete: number, currentPage: number) => {
    // Delete data using the ID from row.
    axios
      .delete(`/api/rooms/${idToDelete}`)
      .then((response) => {
        // console.log('Data', response);
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
    fetch('/api/rooms')
      .then((res) => res.json())
      .then((rooms: Room[]) => {
        setRows(rooms);
        setAllRows(rooms);
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
      });
  };

  // useEffect(() => {
  //   resetTable()
  // }, [allrows])


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
            <Grid item xs={12} >
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
                <div >
                  {rows.length === 0  ? (
                    <Typography variant="h6" sx={{ textAlign: 'center', fontFamily: prompt.style.fontFamily, color: "#b12525" }}>
                      ไม่พบข้อมูลที่คุณกำลังค้นหา
                    </Typography>
                  ) : (
                    <>
                      <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
                        <Table aria-label="simple table" stickyHeader>
                          <TableHead >
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
                                                  onChange={() => handleActiveToggle(row.id, !row.active)} />
                                              </TableCell>
                                            )
                                          }
                                          return (
                                            <TableCell key={index}
                                              sx={{ fontFamily: prompt.style.fontFamily }}>
                                              {value.toString()}
                                            </TableCell>

                                          );
                                        })}
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
                                            <MenuItem >
                                              <Button href={`/employee/room/edit/${row.id}`} startIcon={<ModeEditIcon />} sx={{ fontFamily: prompt.style.fontFamily }}>แก้ไข</Button>
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
                                  );
                                })}
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

