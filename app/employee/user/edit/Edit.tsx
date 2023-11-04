'use client'
import ImageUploadUser from '@/app/components/ImageUpload/ImageUploaduser';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'

type User = {
    id: number
    usr: string
    name: string
    email: string | null;
    fname: string
}

enum PersonType {
    Null = "NULL",
    Internal = "INTERNAL",
    External = "EXTERNAL"
}

enum InternalType {
    Null = "NULL",
    Lecturer = "LECTURER",
    Student = "STUDENT",
    Staff = "STAFF"
}

enum ExternalType {
    Null = "NULL",
    Government = "GOVERNMENT",
    Private = "PRIVATE"
}

interface Props {
    id: number
    usr: string
    name: string
    email: string | null
    avatar: string | null
    password: string
    pname: string | null
    fname: string | null
    sex: string | null
    position: string | null
    person: string | null
    phone: string | null
    fax: string | null
    organizationName: string | null
    type: PersonType | null
    internalType: InternalType | null
    externalType: ExternalType | null
}

const Edit = ({ id, usr, name, email, avatar, pname, fname, sex, position, person, phone, fax, organizationName, type, internalType, externalType }: Props) => {
    const { data: session } = useSession()
    const router = useRouter()
    const [formData, setFormData] = useState({
        id: id,
        usr: usr,
        name: name,
        email: email,
        avatar: avatar,
        pname: pname,
        fname: fname,
        sex: sex,
        position: position,
        person: person,
        phone: phone,
        fax: fax,
        organizationName: organizationName,
        type: type,
        internalType: internalType,
        externalType: externalType
    })
    const [info, updateinfo] = useState<any>()
    const [imageUrls, setImageUrls] = useState<string[]>([])

    useEffect(() => {
        if (formData.avatar) {
            const imageUrlArray = formData.avatar.split(',')
            setImageUrls(imageUrlArray)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        // Check if the "type" field has changed
        if (name === "type" || name === "internalType" || name === "externalType") {
            // If it has changed, reset the sub-type fields and set the new "type" value
            setFormData({ ...formData, [name]: value });
        } else {
            // If it hasn't changed, update the field as usual
            setFormData({
                ...formData,
                [name]: value
            });
        }
    }

    const handleImageChange = () => {
        const stringimages = JSON.stringify(imageUrls)
        setFormData({
            ...formData,
            avatar: stringimages
        })

    }

    const isNameDuplicated = async () => {
        try {
            const response = await axios.get('/api/users');
            const allUser = response.data;
            const isDuplicate = allUser.some((user: User) => {
                return (
                    (user.name === formData.name || user.email === formData.email || user.fname === formData.fname) &&
                    user.id !== formData.id
                );
            });
            return isDuplicate;
        } catch (error) {
            console.error(error);
            return true;
        }
    }

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            avatar: imageUrls.toString()
        }))
    }, [imageUrls])

    const isPhoneNumberValid = (phoneNumber: string | null) => {
        // Check if phoneNumber is null or if it doesn't match the pattern.
        if (phoneNumber === null || !/^\d{10}$/.test(phoneNumber)) {
            return false;
        }
        return true;
    }

    const isFaxNumberValid = (faxNumber: string | null) => {
        if (faxNumber === null || /^\d{9}$/.test(faxNumber) || faxNumber === '-') {
            return true;
        }
        return false;
    }


    const isEmailValid = (email: string | null) => {
        if (email === null || !/[\W_]*@.*\./.test(email)) {
            return false;
        }
        return true;
    }


    const updateData = async () => {
        handleImageChange()

        let alertMessage = '';

        if (imageUrls.length > 1) {
            alert('อัพโหลดรูปได้ไม่เกิน 1 รูป');
            return;
        }

        switch (true) {
            case !formData.name &&
                !formData.email &&
                !formData.avatar &&
                !formData.pname &&
                !formData.fname &&
                !formData.sex &&
                !formData.position &&
                !formData.person &&
                !formData.phone &&
                !formData.fax:
                alertMessage = 'กรุณากรอกข้อมูลให้ครบถ้วน'
                break;
            case !formData.name:
                alertMessage = 'กรุณากรอกชื่อผู้ใช้งาน';
                break;
            case !formData.email:
                alertMessage = 'กรุณากรอกอีเมลของคุณ';
                break;
            case !formData.pname:
                alertMessage = 'กรุณากรอกคำนำหน้าชื่อ';
                break;
            case !formData.fname:
                alertMessage = 'กรุณากรอกชื่อ-นามสกุล';
                break;
            case !formData.avatar:
                alertMessage = 'กรุณาอัพโหลดรูปภาพ';
                break;
            case !formData.sex:
                alertMessage = 'กรุณากรอกเพศของคุณ';
                break;
            case !formData.position:
                alertMessage = 'กรุณากรอกตำแหน่งของคุณ';
                break;
            case !formData.person:
                alertMessage = 'กรุณากรอกหน่วยงาน/ผู้ระกอบการของคุณ';
                break;
            case !formData.phone:
                alertMessage = 'กรุณากรอกหมายเลขโทรศัพท์ของคุณ';
                break;
            case !formData.fax:
                alertMessage = 'กรุณากรอกหมายเลขโทรสารของคุณ';
                break;
            case formData.type === 'NULL':
                alertMessage = 'กรุณาเลือกประเภทบุคคลากรของคุณ';
                break;
            case formData.type === 'INTERNAL' && formData.internalType === 'NULL':
                alertMessage = 'กรุณาเลือกประเภทบุคคลากรภายในของคุณ';
                break;
            case formData.type === 'EXTERNAL' && formData.externalType === 'NULL' && !formData.organizationName:
                alertMessage = 'กรุณาเลือกประเภทบุคคลากรภายนอกและระบุชื่อหน่วยงานของคุณ';
                break;
            case formData.type === 'EXTERNAL' && formData.externalType === 'NULL':
                alertMessage = 'กรุณาเลือกประเภทบุคคลากรภายนอกของคุณ';
                break;
            case formData.type === 'EXTERNAL' && !formData.organizationName:
                alertMessage = 'กรุณาระบุชื่อหน่วยงานของคุณ';
                break;
            case !isPhoneNumberValid(formData.phone):
                alertMessage = 'หมายเลขโทรศัพท์ไม่ถูกต้อง';
                break;
            case !isFaxNumberValid(formData.fax):
                alertMessage = 'หมายเลขโทรสารไม่ถูกต้อง';
                break;
            case !isEmailValid(formData.email):
                alertMessage = 'อีเมลต้องมีอักขระพิเศษอย่างน้อย 1 ตัวและมี "@" ด้วย';
                break;
        }

        if (alertMessage) {
            alert(alertMessage);
            return;
        }

        const isDuplicate = await isNameDuplicated();
        if (isDuplicate) {
            alert('พบชื่อผู้ใช้งานระบบหรืออีเมล์หรือชื่อ-นามสกุลซ้ำกับในฐานข้อมูล กรุณากรอกใหม่อีกครั้ง');
            return;
        }

        try {
            const response = await axios.patch(`/api/users/${id}`, formData)
            router.push('/employee')
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='p-4 flex w-full justify-center'>
            <div className='grid grid-cols-1'>
                <div className='text-left text-lg font-semibold p-4'>
                    <span className="text-cyan-700 ">__ลงทะเบียน____</span>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div>
                        <label htmlFor="name" className="font-semibold">ชื่อผู้ใช้งานระบบ
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="font-semibold">อีเมล์
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="email"
                            value={formData.email ?? ''}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="text-left text-lg font-semibold p-4">
                    <span className="text-cyan-700 ">__ข้อมูลส่วนตัว____</span>
                </div>
                <div className=' grid grid-cols-2 md:grid-cols-2 gap-5'>
                    <div>
                        <label htmlFor="pname" className="font-semibold">คำนำหน้าชื่อ
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="pname"
                            value={formData.pname ?? ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="fname" className="font-semibold">ชื่อ-นามสกุล
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="fname"
                            value={formData.fname ?? ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="sex" className="font-semibold">เพศ
                            <span className="text-red-500">*</span>
                        </label>
                        <div className='flex py-2 px-3 justify-center items-center '>
                            <div className='flex items-center mr-4'>
                                <input
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    type="radio"
                                    name="sex"
                                    value="male"
                                    checked={formData.sex === 'male'}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="sex" className='ml-2  font-medium text-gray-900 dark:text-gray-300'>ชาย</label>
                            </div>
                            <div className='flex items-center mr-4 ' style={{ marginLeft: '20px' }}>
                                <input
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    type="radio"
                                    name="sex"
                                    value="female"
                                    checked={formData.sex === 'female'}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="sex" className='ml-2  font-medium text-gray-900 dark:text-gray-300'>หญิง</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="position" className="font-semibold">ตำแหน่ง
                            <span className="text-red-500 text-sm">* หากไม่มีข้อมูลให้ใส่ -</span>
                        </label>
                        <input
                            className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="position"
                            value={formData.position ?? ''}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-1 gap-5 mt-4'>
                    <div>
                        <label htmlFor="person" className="font-semibold">หน่วยงาน/ผู้ประกอบการ
                            <span className="text-red-500 text-sm">* หากไม่มีข้อมูลให้ใส่ -</span>
                        </label>
                        <input
                            className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="person"
                            value={formData.person ?? ''}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className=' grid grid-cols-1 md:grid-cols-2 gap-5 mt-4'>
                    <div>
                        <label htmlFor="phone" className="font-semibold">หมายเลขโทรศัพท์
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="phone"
                            value={formData.phone ?? ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="fax" className="font-semibold">โทรสาร
                            <span className="text-red-500 text-sm">* หากไม่มีข้อมูลให้ใส่ -</span>
                        </label>
                        <input
                            className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="fax"
                            value={formData.fax ?? ''}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className=' grid grid-cols-1 md:grid-cols-1 gap-5 mt-4'>
                    <div>
                        <label htmlFor="type" className="font-semibold">ประเภทบุคลากร
                            <span className="text-red-500">*</span>
                        </label>
                        <select
                            className='shadow text-sm border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline'
                            name="type"
                            value={formData.type ?? ''}
                            onChange={handleInputChange}
                        >
                            <option value="NULL" >...โปรดเลือก...</option>
                            <option value="INTERNAL" >บุคคลากรภายใน</option>
                            <option value="EXTERNAL">บุคคลากรภายนอก</option>
                        </select>
                        {formData.type === "INTERNAL" && (
                            <div className=' grid grid-cols-1 md:grid-cols-1 gap-5 mt-4'>
                                <div>
                                    <label htmlFor="internalType" className="font-semibold">ประเภทบุคคลากรภายใน
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className='shadow text-sm border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline'
                                        data-type="internalType"
                                        name="internalType"
                                        value={formData.internalType ?? ''}
                                        onChange={handleInputChange}
                                    >
                                        <option value="NULL" >...โปรดเลือก...</option>
                                        <option value="LECTURER">อาจารย์</option>
                                        <option value="STUDENT">นักศึกษา</option>
                                        <option value="STAFF">เจ้าหน้าที่</option>
                                    </select>
                                </div>
                            </div>
                        )}
                        {formData.type === "EXTERNAL" && (
                            <div className=' grid grid-cols-1 md:grid-cols-1 gap-5 mt-4'>
                                <div>
                                    <label htmlFor="externalType" className="font-semibold">ประเภทบุคคลากรภายนอก
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className='shadow text-sm border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline'
                                        data-type="externalType"
                                        name="externalType"
                                        value={formData.externalType ?? ''}
                                        onChange={handleInputChange}
                                    >
                                        <option value="NULL" >...โปรดเลือก...</option>
                                        <option value="GOVERNMENT">หน่อยงานรัฐ</option>
                                        <option value="PRIVATE">หน่อยงานเอกชน</option>
                                    </select>
                                    <div className='mt-4'>
                                        <label htmlFor="fax" className="font-semibold">ชื่อหน่วยงาน
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            name="organizationName"
                                            value={formData.organizationName ?? ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-6">
                    <label htmlFor="" className="font-semibold ">อัพโหลดรูปภาพ
                        <span className="text-red-500">*</span>
                    </label>
                    <ImageUploadUser info={info} updateInfo={updateinfo} imageUrls={imageUrls} setImageUrls={setImageUrls} handleImageChange={handleImageChange} maxImages={1} />
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