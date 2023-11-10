import React from 'react'
import ServicesPage from '../components/ScrollReact/ServicesPage'

type Props = {}

const Services = (props: Props) => {
    return (
        <div className='mb-[200px]'>
            <div className='flex justify-center'>
                <div style={{ marginTop: '50px' }}>
                    <ServicesPage />
                </div>
            </div>
        </div>
    )
}

export default Services
