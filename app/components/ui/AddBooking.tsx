'use client'
import { Button, Grid, TextField, TextFieldProps } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers';
import moment from 'moment';
type Props = {
    roomId?: number | null
    toolId?: number | null
    userId: number
    onBookingSubmit: (data: any, roomId: number | null, toolId: number | null) => void;
}


const AddBooking = ({ roomId: initialRoomId, toolId: initialToolId, userId }: Props) => {
    const { data: session } = useSession()
    const router = useRouter()
    const [name, setName] = useState('')
    const [objective, setObjective] = useState('')
    const [details, setDetails] = useState('')
    const [note, setNote] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [roomId, setRoomId] = useState<number | null>(null);
    const [toolId, setToolId] = useState<number | null>(null);

    useEffect(() => {
        if (initialRoomId !== undefined) {
            setRoomId(initialRoomId);
        }
        if (initialToolId !== undefined) {
            setToolId(initialToolId);
        }
    }, [initialRoomId, initialToolId]);


    const handleStartDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        if (value) {
            const selectedDateTime = moment(value, 'YYYY-MM-DDTHH:mm').toDate();
            setStartDate(selectedDateTime);
        }
    };

    const handleEndDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value) {
            const selectedDateTime = moment(value, 'YYYY-MM-DDTHH:mm').toDate();
            setEndDate(selectedDateTime);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (session?.user) {
            const id = session?.user.id

            try {
                const response = await fetch('/api/reservations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: id,
                        toolId: toolId,
                        roomId: roomId,
                        name: name,
                        objective: objective,
                        startdate: startDate.toISOString(),
                        enddate: endDate.toISOString(),
                        details: details,
                        note,
                    })
                })

                const data = await response.json();
                console.log(data);
                window.location.reload();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <React.Fragment>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="ชื่อโครงการ*"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)} InputLabelProps={{
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
                            value={objective}
                            onChange={(e) => setObjective(e.target.value)} InputLabelProps={{
                                sx: {
                                    fontFamily: 'Mali',
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="วันที่และเวลาเริ่มต้น"
                            value={moment(startDate).format('YYYY-MM-DDTHH:mm')}
                            onChange={handleStartDateTimeChange}
                            type="datetime-local"
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
                            value={moment(endDate).format('YYYY-MM-DDTHH:mm')}
                            onChange={handleEndDateTimeChange}
                            type="datetime-local"
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
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
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
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
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
    )
}

export default AddBooking