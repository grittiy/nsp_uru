import React from 'react'
import CalendarPage from '../components/ScrollReact/CalendarPage'

type Props = {}

const Calendar = (props: Props) => {
    return (
        <div className='mb-[200px]'>
            <div className='flex justify-center'>
                <div style={{ marginTop: '50px' }}>
                    <CalendarPage />
                </div>
            </div>
        </div>
    )
}

export default Calendar
