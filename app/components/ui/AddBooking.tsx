'use client'
import { Button, Grid, TextField } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import moment from 'moment';
import 'moment-timezone';
import axios from 'axios'

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

    useEffect(() => {
        console.log("endDate in useEffect:", endDate);
    }, [endDate]);

    const handleStartDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        if (value) {
            const selectedDateTime = moment(value, 'YYYY-MM-DDTHH:mm').tz('Asia/Bangkok').toDate();
            setStartDate(selectedDateTime);
        }
    };

    const handleEndDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value) {
            const selectedDateTime = moment(value, 'YYYY-MM-DDTHH:mm').tz('Asia/Bangkok').toDate();
            setEndDate(selectedDateTime);
        }
    };

    const isNameDuplicated = async () => {
        try {
            const response = await axios.get('/api/reservations');
            const allBookings = response.data;

            const isDuplicated = allBookings.some((booking: any) => booking.name === name && booking.objective === objective && booking.startDate === startDate && booking.endDate === endDate)
            if (isDuplicated) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "พบข้อมูลซ้ำกับฐานข้อมูล กรุณากรอกข้อมูลใหม่อีกครั้ง",
                })
            }
        } catch (error) {
            console.error('Error checking duplicate data:', error);
        }
    }

    const isTimeOverlap = async () => {
        try {
            const response = await axios.get('/api/reservations');
            const allBookings = response.data;

            const overlap = allBookings.some((booking: any) => {
                const bookingStart = new Date(booking.startdate);
                const bookingEnd = new Date(booking.enddate);

                if (roomId !== null && toolId === null && booking.roomId === roomId) {
                    return (
                        (startDate >= bookingStart && startDate <= bookingEnd) ||
                        (endDate >= bookingStart && endDate <= bookingEnd) ||
                        (startDate <= bookingStart && endDate >= bookingEnd)
                    )
                }

                if (toolId !== null && roomId === null && booking.toolId === toolId) {
                    return (
                        (startDate >= bookingStart && startDate <= bookingEnd) ||
                        (endDate >= bookingStart && endDate <= bookingEnd) ||
                        (startDate <= bookingStart && endDate >= bookingEnd)
                    )
                }
                return false;
            })
            if (overlap) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'ช่วงเวลาที่คุณลือกมีการจองหรือยืม-คืนที่กำลังดำเนินการอยู่ในขณะนี้',
                });
            }
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการตรวจสอบการทับซ้อนเวลา:', error);
        }
    }

    const timeDifferenceInHours = Math.ceil(Math.abs(startDate.getTime() - endDate.getTime()) / (1000 * 60 * 60));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // Check for duplicate data
        await isNameDuplicated();

        // Check for time overlap
        await isTimeOverlap();

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
            case startDate >= endDate:
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "กรุณาระบุวันและวลาที่ขอใช้บริการให้ถูกต้อง",
                });
                return;
            case startDate.getHours() < 8 || endDate.getHours() > 17:
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "กรุณาระบุเวันและวลาที่อยู่ในช่วงเวลาทำการ ตั้งแต่ 8:00 น. - 17:00 น.",
                });
                return;

            case roomId !== null && toolId == null && startDate.toDateString() === endDate.toDateString() && (timeDifferenceInHours < 1):
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "กรุณาระบุเวลาให้มากกว่า 1 ชั่วโมงและไม่เกิน 8 ชั่วโมง"
                });
                return;
            case toolId !== null && roomId == null && startDate.toDateString() === endDate.toDateString() && (timeDifferenceInHours < 1):
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "กรุณาระบุวันเวลาให้มากกว่า 1 ชั่วโมงและไม่เกิน 7 วัน "
                });
                return;
        }

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
                                value={moment(startDate).tz('Asia/Bangkok').format('YYYY-MM-DDTHH:mm')}
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
                                value={moment(endDate).tz('Asia/Bangkok').format('YYYY-MM-DDTHH:mm')}
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

        </>
    )
}

export default AddBooking