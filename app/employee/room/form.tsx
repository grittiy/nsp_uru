'use client'

import ImageUpload from "@/app/components/ImageUpload"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

type Props = {}

interface Room {
    id: number;
    name: string;
    room:string
    no:string
    building:string
    roomimage:string
    
}

export const AddroomForm = (props: Props) => {
    const { data: session } = useSession()
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        details: '',
        no: '',
        building: '',
        location: '',
        roomimage: '',
    })


    const [info, updateinfo] = useState<any>()
    const [imageUrls, setImageUrls] = useState<string[]>([])
    const [errors, setErrors] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }



    const handleImageChange = () => {
        const stringimages = JSON.stringify(imageUrls)
        setFormData({
            ...formData,
            roomimage: stringimages
        })

    }

    const isNameDuplicated = async () => {
        // เรียก API ดึงข้อมูลห้องทั้งหมดจากฐานข้อมูล
        try {
            const response = await axios.get('/api/rooms');
            const allRooms = response.data;
            // ตรวจสอบว่ามีชื่อห้องซ้ำหรือไม่
            const isDuplicate = allRooms.some((room: Room) => room.name === formData.name);
            return isDuplicate;
        } catch (error) {
            console.error(error);
            return true; // หากมีข้อผิดพลาดในการดึงข้อมูลให้ถือว่าชื่อห้องซ้ำ
        }
    }

    // useEffect(() => {
    //     console.log(formData.roomimage)
    //     console.log(formData)
    // },[formData])

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            roomimage: imageUrls.toString()
        }))
    }, [imageUrls])
    
    const resetForm = () => {
        setFormData({
          name: "",
          details: "",
          no: "",
          building: "",
          location: "",
          roomimage: ""
        });
        setImageUrls([]);
      };

    const postData = async () => {
        handleImageChange()

        let alertMessage = '';

        switch (true) {
            case !formData.name && !formData.no && !formData.building && !formData.details && !formData.location && !formData.roomimage:
                alertMessage = 'กรุณากรอกข้อมูลให้ครบถ้วน'
                break;
            case !formData.name:
                alertMessage = 'กรุณากรอกชื่อห้อง';
                break;
            case !formData.no:
                alertMessage = 'กรุณากรอกจำนวนที่นั่ง';
                break;
            case !formData.building:
                alertMessage = 'กรุณากรอกสถานที่';
                break;
            case !formData.details:
                alertMessage = 'กรุณากรอกรายละเอียด';
                break;
            case !formData.location:
                alertMessage = 'กรุณากรอกตำแหน่ง';
                break;
            case !formData.roomimage:
                alertMessage = 'กรุณาอัพโหลดรูปภาพ';
                break;
        }
    
        if (alertMessage) {
            alert(alertMessage);
            return;
        }

        const isDuplicate = await isNameDuplicated();
        if (isDuplicate) {
          alert('พบชื่อซ้ำกับในฐานข้อมูล กรุณากรอกใหม่อีกครั้ง');
          return;
        }

    
        try {
            const response = await axios.post('/api/rooms', formData)
            router.push('/employee/room')
            resetForm();
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="p-4 flex w-full">
            <div className="grid grid-cols-1 place-items-center">
                <div className=" space-y-4 p-4 w-[80vw] md:w-[30vw]">
                    <div className='flex flex-col gap-4'>
                        <div className="space-y-4 p-4 mx-auto md:w-[25vw] ">

                            <div className="flex flex-col gap-4 flex-1">
                                <label htmlFor="name" className="font-semibold">ชื่อห้อง
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="text"
                                    name="name"
                                    placeholder="ห้องประชุม"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex  flex-col gap-4 flex-1">
                                <label htmlFor="no" className="font-semibold">จำนวนที่นั่ง
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[5rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="text"
                                    name="no"
                                    value={formData.no}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex flex-col gap-4">
                                <label htmlFor="building" className="font-semibold ">สถานที่
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="text"
                                    name="building"
                                    placeholder="อุทยานวิทยาศาสตร์ภาคเหนือ มหาวิทยาลัยราชภัฏอุตรดิตถ์"
                                    value={formData.building}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label htmlFor="details" className="font-semibold ">รายละเอียด
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="text"
                                    name="details"
                                    value={formData.details}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label htmlFor="location" className="font-semibold ">ตำแหน่ง
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="text"
                                    name="location"
                                    placeholder="https://maps.app.goo.gl/yKR4NEpwCa4Q7jbv7"
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label htmlFor="" className="font-semibold ">อัพโหลดรูปภาพ
                                    <span className="text-red-500">*</span>
                                </label>
                                <ImageUpload info={info} updateInfo={updateinfo} imageUrls={imageUrls} setImageUrls={setImageUrls} handleImageChange={handleImageChange} />
                            </div>

                            <div className="text-center pt-6">
                                <button
                                    className=" text-blue-700  hover:text-white border border-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                                    onClick={postData}
                                >
                                    บันทึก
                                </button>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}