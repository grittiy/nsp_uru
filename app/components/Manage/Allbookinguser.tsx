import { prisma } from '@/lib/prisma'
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { Mali } from 'next/font/google';
import { format } from 'date-fns-tz';
import thLocale from 'date-fns/locale/th';
import BorderStyleIcon from '@mui/icons-material/BorderStyle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const prompt = Mali({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});
interface Reservation {
  id: number;
  res: string;
  name: string;
  objective: string;
  startdate: Date;
  enddate: Date;
  status: StatusType;
  details: string | null;
  note: string | null;
  toolId: number | null;
  roomId: number | null;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

type StatusType = 'WAITING' | 'NOTAPPROVED' | 'APPROVED';

type Props = {
  userId: number
  roomId: number | null
  toolId: number | null
}

const formatDate = (date: Date | undefined) => {
  if (date) {
    return format(date, 'dd MMMM yyyy HH:mm', {
      locale: thLocale,
      timeZone: 'Asia/Bangkok',
    });
  }
  return '';
};

const getStatusMessage = (status: string | undefined) => {
  switch (status) {
    case 'WAITING':
      return 'รอการตรวจสอบ';
    case 'NOTAPPROVED':
      return 'ไม่อนุมัติ';
    case 'APPROVED':
      return 'อนุมัติ';
    default:
      return '';
  }
};

const getStatusColor = (status: string | undefined) => {
  switch (status) {
    case 'WAITING':
      return '#85868a';
    case 'NOTAPPROVED':
      return '#f50057';
    case 'APPROVED':
      return '#4caf50';
    default:
      return '';
  }
};

const Allbookinguser = async (props: Props) => {
  const allbookinguser: Reservation[] = await prisma.reservations.findMany({
    where: {
      userId: props.userId
    }
  })
  const bookingRoomPromises = allbookinguser.map((bookingRoom) => {
    if (bookingRoom.roomId !== null) {
      return prisma.rooms.findUnique({
        where: {
          id: bookingRoom.roomId
        }
      });
    }
    return null;
  });
  const bookingToolPromises = allbookinguser.map((bookingTool) => {
    if (bookingTool.toolId !== null) {
      return prisma.tools.findUnique({
        where: {
          id: bookingTool.toolId
        }
      });
    }
    return null;
  });

  const bookingRooms = await Promise.all(bookingRoomPromises)
  const bookingTools = await Promise.all(bookingToolPromises)
  const roomId = allbookinguser.map((item) => item.roomId).filter((id) => id !== null)[0] as number | undefined;
  const toolId = allbookinguser.map((item) => item.toolId).filter((id) => id !== null)[0] as number | undefined;
  if (bookingRooms.length === 0 && bookingTools.length === 0) {
    return (
      <div className='relative flex items-center justify-center'>
        <h1 className='absolute top-[80%] text-2xl text-purple-600'>Empty Cart</h1>
      </div>
    )
  }

  const filteredCartRooms = bookingRooms.filter(bookingRoom => bookingRoom !== null && bookingRoom?.id !== null);
  const filteredCartTools = bookingTools.filter(bookingTool => bookingTool !== null && bookingTool?.id !== null);
  const columns = [
    { id: 'id', name: 'ลำดับที่' },
    { id: 'name', name: 'ชื่อโครงการ' },
    { id: 'daterange', name: 'วัน เดือน ปี' },
    { id: 'status', name: 'สถานะ' }
  ]



  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Paper sx={{ width: '100%', marginLeft: '15' }}>
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
                    <TableCell />
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allbookinguser.map((booking, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ fontFamily: prompt.style.fontFamily }}>{index + 1}</TableCell>
                      <TableCell sx={{ fontFamily: prompt.style.fontFamily }}>{booking?.name}</TableCell>
                      <TableCell sx={{ fontFamily: prompt.style.fontFamily }}>
                        {`${formatDate(new Date(booking?.startdate))} => ${formatDate(new Date(booking?.enddate))}`}
                      </TableCell>
                      <TableCell sx={{ fontFamily: prompt.style.fontFamily }} style={{ color: getStatusColor(booking?.status) }}>
                        {getStatusMessage(booking?.status)}
                      </TableCell>
                      <TableCell sx={{ fontFamily: prompt.style.fontFamily }}>
                        {filteredCartRooms[index]?.name || filteredCartTools[index]?.name || 'N/A'}
                      </TableCell>
                      <TableCell sx={{ fontFamily: prompt.style.fontFamily }}>
                        <Button
                          color="success"
                          href={`/user/booking/${booking.id}`}
                          startIcon={<BorderStyleIcon />}
                          sx={{ fontFamily: prompt.style.fontFamily }}
                        />                     
                        <Button
                          href={`/user/edit/${booking.id}`}
                          startIcon={<ModeEditIcon />}
                          sx={{ fontFamily: prompt.style.fontFamily }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Allbookinguser