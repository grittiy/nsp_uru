'use client'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Mali } from 'next/font/google';
import Swal from 'sweetalert2'
const prompt = Mali({
    weight: ["300", "400"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});


interface Props {
    id: number
    ch: string
    status: string
    toolId: number | null;
    roomId: number | null;
    bookingId: number
    userId: number | null;
    details: string | null;
    note: string | null;
}

const Edit = ({ id, ch, status, toolId, roomId, bookingId, userId, details, note }: Props) => {
    const { data: session } = useSession()
    const router = useRouter()
    const [editedCh, setEditedCh] = useState(ch)
    const [editedNote, setEditedNote] = useState<string | null>(null)
    const [editedDetails, setEditedDetails] = useState(details)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        switch (true) {
            case !editedNote:
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "กรุณาเลือกผลตรวจสอบ",
                })
                return;
            case editedNote === "damage" && !editedDetails:
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "กรุณากรอกข้อมูลรายละเอียดความเสียหาย"
                })
                return;
        }
        try {
            const response = await fetch(`/api/checks/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    note: editedNote,
                    details: editedDetails,
                    status: "CHECKED"
                })
            })
            const data = await response.json();
            console.log(data);

            if (data.roomId !== null && data.toolId === null) {
                router.push('/employee/checks');
            } else if (data.toolId !== null && data.roomId === null) {
                router.push('/employee/checks/tool');
            } else {
                router.push('/employee/checks');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
            >
                <React.Fragment>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                label="หมายเลขสถานะ"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={editedCh}
                                InputLabelProps={{
                                    sx: {
                                        fontFamily: 'Mali',
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="damage-type-label" sx={{ fontFamily: 'Mali' }}>เลือกผลการตรวจสอบ*</InputLabel>
                                <Select
                                    labelId="damage-type-label"
                                    id="damage-type"
                                    value={editedNote}
                                    onChange={(e) => setEditedNote(e.target.value as string)}
                                >
                                    <MenuItem value="no_damage" sx={{ fontFamily: prompt.style.fontFamily }}>ไม่มีการเสียหาย</MenuItem>
                                    <MenuItem value="damage" sx={{ fontFamily: prompt.style.fontFamily }}>มีการเสียหาย</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {editedNote === 'damage' && (
                            <Grid item xs={12} >
                                <TextField
                                    label="รายละเอียด*"
                                    fullWidth
                                    multiline
                                    value={editedDetails}
                                    onChange={(e) => setEditedDetails(e.target.value)}
                                    InputLabelProps={{
                                        sx: {
                                            fontFamily: 'Mali',
                                        },
                                    }}
                                />
                            </Grid>
                        )}

                        <Button
                            variant="outlined"
                            color="success"
                            type="submit"
                            sx={{ fontFamily: 'Mali', margin: '20px auto', display: 'block' }}
                        >
                            บันทึกการจอง
                        </Button>

                    </Grid>
                </React.Fragment>
            </form>
        </>
    )
}

export default Edit