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

interface Tool {
    num: string
    id: number,
    name: string,
    band: string,
    balance: number,
    active: boolean
}

export default function Itemtool() {
    const [rows, setRows] = useState<Tool[]>([]);
    const [allrows, setAllRows] = useState<Tool[]>([]);
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
        { id: 'num', name: 'หมายเลขเครื่องมือ' },
        { id: 'name', name: 'ชื่อเครื่องมือ' },
        { id: 'band', name: 'ยี่ห้อ' },
        { id: 'balance', name: 'จำนวนคงเหลือ' },
        { id: 'active', name: 'active' }
    ]

    useEffect(() => {
        // Use fetch to retrieve data from the API.
        fetch('/api/tools')
            .then((res) => res.json())
            .then((tools: Tool[]) => {
                // console.log("ข้อมูลเครื่องมือ:", rooms);
                setRows(tools);
                setAllRows(tools);
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
            const filterData = allrows.filter((tools) =>
                tools.num.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tools.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tools.band.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tools.id.toString().includes(searchQuery)
            );
            setRows(filterData);
        } else {
            setRows(allrows);
        }
    }

    rows.sort((a: Tool, b: Tool) => {
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
                                    placeholder="ค้นหาข้อมูลเครื่องมือด้วยหมายเลขเครื่องมือ ชื่อเครื่องมือ หรือ ยี่ห้อ"
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
                                ): (
                                    <>
                                    <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
                                        <Table  aria-label="simple table" stickyHeader>
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
                                                                const value = modifiedRow[column.id as keyof Tool];
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
                                                                        {value !== null ? value.toString() : ''}
                                                                    </TableCell>

                                                                );
                                                             })
                                                            }
                                                              <TableCell key={index}
                                                                            sx={{ fontFamily: prompt.style.fontFamily }}
                                                                            align="right"
                                                                        >
                                                                            <Button color="success"
                                                                                href={`/driector/tool/${row.id}`}
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
