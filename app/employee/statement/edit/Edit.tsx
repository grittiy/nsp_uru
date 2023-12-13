'use client'
import { Button, Grid, TextField } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import moment from 'moment';
import 'moment-timezone';
import axios from 'axios'

type EditProps = {
  id: number;
  userId: number;
  toolId: number | null;
  roomId: number | null;
  name: string;
  objective: string;
  startdate: Date;
  enddate: Date;
  details: string | null;
  note: string | null;
}


const EditBooking: React.FC<EditProps> = ({ id, name, objective, details, note, startdate, enddate }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const [editedName, setEditedName] = useState(name)
  const [editedObjective, setEditedObjective] = useState(objective)
  const [editedDetails, setEditedDetails] = useState(details)
  const [editedNote, setEditedNote] = useState(note)
  const [editedStartDate, setEditedStartDate] = useState(startdate);
  const [editedEndDate, setEditedEndDate] = useState(enddate);

  const isNameDuplicated = async () => {
      try {
          const response = await axios.get('/api/reservations');
          const allBookings = response.data;

          const isDuplicated = allBookings.some((booking: any) =>    booking.id !== id && booking.name === editedName && booking.objective === editedObjective)
          if (isDuplicated) {
              Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "พบข้อมูลชื่อและวัตถุประสงค์ซ้ำกับในฐานข้อมูล กรุณากรอกข้อมูลใหม่อีกครั้ง",
              })
          }
          return !isDuplicated;
      } catch (error) {
          console.error('Error checking duplicate data:', error);
          return false
      }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Check for duplicate data
    const isNotDuplicated = await isNameDuplicated();
    if (!isNotDuplicated) {
      // If data is duplicated, no action will be taken
      return;
    }

    switch (true) {
      case !name && !objective && !details && !note:
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "กรุณากรอกข้อมูลให้ครบถ้วน",
        })
        return;
      case !name && !objective:
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "กรุณากรอกข้อมูลให้ครบถ้วน"
        })
        return;
      case !name:
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "กรุณากรอกชื่อโครงการ"
        })
        return;
      case !objective:
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "กรุณากรอกวัตถุประสงค์"
        })
        return;
    }
    if (session?.user) {
   
      try {
        const response = await fetch(`/api/reservations/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: editedName,
            objective: editedObjective,
            details: editedDetails,
            note:editedNote
          })
        })
        const data = await response.json();
        console.log(data);
        router.push('/employee/statement')
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <React.Fragment>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="ชื่อโครงการ*"
                variant="outlined"
                fullWidth
                margin="normal"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)} InputLabelProps={{
                  sx: {
                    fontFamily: 'Mali',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="วัตถุประสงค์*"
                variant="outlined"
                fullWidth
                margin="normal"
                value={editedObjective}
                onChange={(e) => setEditedObjective(e.target.value)} InputLabelProps={{
                  sx: {
                    fontFamily: 'Mali',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="วันที่และเวลาเริ่มต้น"
                value={moment(editedStartDate).tz('Asia/Bangkok').format('YYYY-MM-DDTHH:mm')}
                type="datetime-local"
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    fontFamily: 'Mali',
                  },
                }}
                fullWidth
                margin="normal"
                sx={{
                  width: '100%',
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="วันที่และเวลาสิ้นสุด"
                value={moment(editedEndDate).tz('Asia/Bangkok').format('YYYY-MM-DDTHH:mm')}
                type="datetime-local"
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    fontFamily: 'Mali',
                  },
                }}
                fullWidth
                margin="normal"
                sx={{
                  width: '100%',
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="รายละเอียดเพิ่มเติม"
                variant="outlined"
                fullWidth
                margin="normal"
                value={editedDetails}
                onChange={(e) => setEditedDetails(e.target.value)}
                InputLabelProps={{
                  sx: {
                    fontFamily: 'Mali',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="หมายเหตุ"
                variant="outlined"
                fullWidth
                margin="normal"
                value={editedNote}
                onChange={(e) => setEditedNote(e.target.value)}
                InputLabelProps={{
                  sx: {
                    fontFamily: 'Mali',
                  },
                }}
              />
            </Grid>
            <Button
              variant="outlined"
              color="success"
              type="submit"
              sx={{ fontFamily: 'Mali', margin: 'auto', display: 'block' }}
            >
              บันทึกการจอง
            </Button>
          </Grid>
        </React.Fragment>
      </form>

    </>
  )
}

export default EditBooking