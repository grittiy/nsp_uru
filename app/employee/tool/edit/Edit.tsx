'use client'
import ImageUploadTool from '@/app/components/ImageUpload/ImageUploadtool'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

type Tool = {
    id: number
    tool: string
    num: string
    name: string
    band: string
}

enum PriceType {
    Null = "NULL",
    sample = "SAMPLE",
    day = "DAY",
    rates = "RATES"
}

interface Props {
    id: number
    tool: string
    num: string
    name: string
    band: string
    number: number
    balance: number
    toolimage: string
    toolrate: PriceType
    internal: number | 0
    external: number | 0
    rate: string | null
    details: string | null
    breakdown: number | 0
    repair: number | 0
    lost: number | 0
}

const Edit = ({ id, tool, num, name, band, number, toolimage, toolrate, internal, external, rate, details, breakdown, repair, lost }: Props) => {
    const { data: session } = useSession()
    const router = useRouter()
    const [formData, setFormData] = useState({
        id: id,
        tool: tool,
        num: num,
        name: name,
        band: band,
        number: number,
        toolimage: toolimage,
        toolrate: toolrate,
        internal: internal,
        external: external,
        rate: rate,
        details: details,
        breakdown: breakdown,
        repair: repair,
        lost: lost
    })

    const [info, updateinfo] = useState<any>()
    const [imageUrls, setImageUrls] = useState<string[]>([])

    useEffect(() => {
        if (formData.toolimage) {
            const imageUrlArray = formData.toolimage.split(',')
            setImageUrls(imageUrlArray)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target
        if (name === 'toolrate' && formData.toolrate !== value) {
            setFormData({
                ...formData,
                toolrate: value as PriceType,
                internal: 0,
                external: 0,
                rate: ''
            })
        } else {
            setFormData({
                ...formData,
                [name]: value
            })
        }
    }

        const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.name === "number" ? parseInt(e.target.value) : parseInt(e.target.value)
            const internal = e.target.name === "internal" ? parseInt(e.target.value) : parseInt(e.target.value)
            const external = e.target.name === "external" ? parseInt(e.target.value) : parseInt(e.target.value)
            const breakdown = e.target.name === "breakdown" ? parseInt(e.target.value) : parseInt(e.target.value)
            const repair = e.target.name === "repair" ? parseInt(e.target.value) : parseInt(e.target.value)
            const lost = e.target.name === "lost" ? parseInt(e.target.value) : parseInt(e.target.value)
            setFormData({
                ...formData,
                [e.target.name]: value,
                [e.target.name]: internal,
                [e.target.name]: external,
                [e.target.name]: breakdown,
                [e.target.name]: repair,
                [e.target.name]: lost,
            })
        }


        const handleImageChange = () => {
            const stringimages = JSON.stringify(imageUrls)
            setFormData({
                ...formData,
                toolimage: stringimages
            })
        }

        useEffect(() => {
            setFormData((prevFormData) => ({
                ...prevFormData,
                toolimage: imageUrls.toString()
            }))
        }, [imageUrls])

        const isNameDuplicated = async () => {
            try {
                const response = await axios.get('/api/tools');
                const allTool = response.data;
                const isDuplicate = allTool.some((tool: Tool) => {
                    return (
                        (tool.num === formData.num || tool.name === formData.name && tool.band === formData.band) &&
                        tool.id !== formData.id
                    )
                })
                return isDuplicate;
            } catch (error) {
                console.error(error);
                return true;
            }
        }

       

        const isNumValid = (NumNumber: string) => {
            return /^\d{6}$/.test(NumNumber);
        }

        const updateData = async () => {
            handleImageChange()

            let alertMessage = '';

            if (imageUrls.length > 5) {
                alert('อัพโหลดรูปได้ไม่เกิน 5 รูป');
                return;
            }

            if (
                !formData.num &&
                !formData.name &&
                !formData.band &&
                !formData.number &&
                !formData.toolimage &&
                !formData.toolrate
            ) {
                alertMessage = 'กรุณากรอกข้อมูลให้ครบถ้วน';
            }

            switch (true) {
                case !formData.num:
                    alertMessage = 'กรุณากรอกหมายเลขเครื่องมือ'
                    break;
                case !isNumValid(formData.num):
                    alertMessage = 'กรุณากรอกหมายเลขเครื่องมือเป็นตัวเลข6ตัวเท่านั้น';
                    break;
                case !formData.name:
                    alertMessage = 'กรุณากรอกชื่อเครื่องมือ';
                    break;
                case !formData.band:
                    alertMessage = 'กรุณากรอกยี่ห้อ';
                    break;
                case !formData.number:
                    alertMessage = 'กรุณากรอกจำนวนเครื่องมือทั้งหมด';
                    break;

                case formData.toolrate === 'NULL':
                    alertMessage = 'กรุณาเลือกราคา';
                    break;
                case formData.toolrate === 'SAMPLE' && !formData.internal && !formData.external:
                    alertMessage = 'กรุณากรอกราคาบาทต่อตัวอย่างของบุคลากรภายในและบุคลากรภายนอก';
                    break;
                case formData.toolrate === 'DAY' && !formData.internal && !formData.external:
                    alertMessage = 'กรุณากรอกราคาบาทต่อวันของบุคลากรภายในและบุคลากรภายนอก';
                    break;
                case formData.toolrate === 'RATES' && !formData.rate:
                    alertMessage = 'กรุณากรอกเรทราคา(บาท)';
                    break;
                case !formData.toolimage:
                    alertMessage = 'กรุณาอัพโหลดรูปภาพ';
                    break;
            }

            if (alertMessage) {
                alert(alertMessage);
                return;
            }

            const isDuplicate = await isNameDuplicated();
            if (isDuplicate) {
                alert('พบหมายเลขเครื่องมือหรือชื่อเครื่องมือและยี่ห้อซ้ำ กรุณากรอกใหม่อีกครั้ง');
                return;
            }

            try {
                const response = await axios.patch(`/api/tools/${id}`, formData)
                router.push('/employee/tool')
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }

        return (
            <div className="p-4 flex w-full justify-center">
                <div className='grid grid-cols-1 place-items-center'>
                    <div className='space-y-4 p-4 w-[80vw] md:w-[50vw]'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            <div>
                                <label htmlFor="num" className="font-semibold">
                                    หมายเลขเครื่องมือ
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                                    type='text'
                                    name='num'
                                    value={formData.num}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="name" className="font-semibold">
                                    ชื่อเครื่องมือ
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                                    type='text'
                                    name='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="band" className="font-semibold">
                                    ยี่ห้อ
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                                    type='text'
                                    name='band'
                                    value={formData.band}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="number" className="font-semibold">
                                    จำนวนเครื่องมือทั้งหมด
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                                    type='number'
                                    name='number'
                                    value={formData.number}
                                    onChange={handlePriceChange}
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-1 gap-5'>
                            <div>
                                <label htmlFor="details" className="font-semibold">
                                    รายละเอียด
                                </label>
                                <input
                                    className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                                    type='text'
                                    name='details'
                                    value={formData.details ?? ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="toolrate" className="font-semibold">ราคา
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    className='shadow text-sm border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline'
                                    data-type="toolrate"
                                    name="toolrate"
                                    value={formData.toolrate}
                                    onChange={handleChange}
                                >
                                    <option value="NULL" >...โปรดเลือก...</option>
                                    <option value="SAMPLE" >ราคาบาทต่อตัวอย่าง</option>
                                    <option value="DAY">ราคาบาทต่อวัน</option>
                                    <option value="RATES">เรทราคา</option>
                                </select>
                            </div>
                            {formData.toolrate === "SAMPLE" && (
                                <div className=' grid grid-cols-2 md:grid-cols-2 gap-5 '>
                                    <div>
                                        <label htmlFor="internal" className="font-semibold">บุคลากรภายใน</label>
                                        <input
                                            className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                                            type='number'
                                            name='internal'
                                            value={formData.internal}
                                            onChange={handlePriceChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="external" className="font-semibold">บุคลากรภายนอก</label>
                                        <input
                                            className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                                            type='number'
                                            name='external'
                                            value={formData.external}
                                            onChange={handlePriceChange}
                                        />
                                    </div>
                                </div>
                            )}
                            {formData.toolrate === "DAY" && (
                                <div className=' grid grid-cols-2 md:grid-cols-2 gap-5'>
                                    <div>
                                        <label htmlFor="internal" className="font-semibold">บุคลากรภายใน</label>
                                        <input
                                            className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                                            type='number'
                                            name='internal'
                                            value={formData.internal}
                                            onChange={handlePriceChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="external" className="font-semibold">บุคลากรภายนอก</label>
                                        <input
                                            className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                                            type='number'
                                            name='external'
                                            value={formData.external}
                                            onChange={handlePriceChange}
                                        />
                                    </div>
                                </div>
                            )}
                            {formData.toolrate === "RATES" && (
                                <div className='grid grid-cols-1 md:grid-cols-1 gap-5'>
                                    <div>
                                        <label htmlFor="rates" className="font-semibold">ระบุราคา(บาท)</label>
                                        <input
                                            className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                                            type='text'
                                            name='rate'
                                            value={formData.rate ?? ''}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-4 mt-6">
                            <label htmlFor="" className="font-semibold ">อัพโหลดรูปภาพ
                                <span className="text-red-500">*</span>
                            </label>
                            <ImageUploadTool info={info} updateInfo={updateinfo} imageUrls={imageUrls} setImageUrls={setImageUrls} handleImageChange={handleImageChange} maxImages={5} />
                        </div>
                        <div>
                            <label htmlFor="breakdown" className="font-semibold">จำนวนเครื่องมือที่ชำรุด</label>
                            <input
                                className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                                type='number'
                                name='breakdown'
                                value={formData.breakdown}
                                onChange={handlePriceChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="repair" className="font-semibold">จำนวนเครื่องมือที่ส่งซ่อม</label>
                            <input
                                className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                                type='number'
                                name='repair'
                                value={formData.repair}
                                onChange={handlePriceChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="lost" className="font-semibold">จำนวนเครื่องมือที่สูญหาย</label>
                            <input
                                className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                                type='number'
                                name='lost'
                                value={formData.lost}
                                onChange={handlePriceChange}
                            />
                        </div>
                    </div>
                    <div className="text-center pt-6">
                        <button
                            className=" text-blue-700  hover:text-white border border-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                            onClick={updateData}
                        >
                            บันทึก
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    export default Edit