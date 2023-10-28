import React, { useState, useEffect } from 'react'
import { CldUploadWidget } from "next-cloudinary"
import Image from 'next/image';

type Props = {
    info: any
    updateInfo: React.Dispatch<React.SetStateAction<any>>
    imageUrls: string[]
    setImageUrls: React.Dispatch<React.SetStateAction<string[]>>
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ImageUpload: React.FC<Props> = ({ info, updateInfo, imageUrls, setImageUrls, handleImageChange }) => {
    const onupload = (result: any) => {
        updateInfo(result.info.secure_url)
        const newImageUrl = result.info.secure_url
        setImageUrls(preImageUrls => [...preImageUrls, newImageUrl])
        handleImageChange(result)
    }

    const handleDeleteImage = (index: number) => {
        setImageUrls(prevImageUrls => {
            const updateImageUrls = [...prevImageUrls]
            updateImageUrls.splice(index, 1)
            return updateImageUrls
        })
    }

    return (
        <div>
            <div className='mb-10'>
                <CldUploadWidget uploadPreset='uploadroom' onUpload={onupload}>
                    {({ open }: any) => {
                        function handleOnclick(e: React.MouseEvent<HTMLButtonElement>) {
                            e.preventDefault()
                            open()
                        }
                        return (
                            <button className=" text-blue-700  hover:text-white border border-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                                onClick={handleOnclick}>
                                อัพโหลดรูปภาพ
                            </button>
                        )
                    }}
                </CldUploadWidget>
            </div>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
                {imageUrls.map((imageUrl, index) => (
                    <div key={index} className='flex flex-col justify-center'style={{ marginBottom: '20px' }}>
                        <Image
                            src={imageUrl}
                            width={300}
                            height={250}
                            alt={`uploaded Image ${index + 1}`}
                        />
                        <div className="mt-3"> {/* Add margin-top for spacing */}
                            <button
                                type="button"
                                className="px-4 text-rose-700 hover:text-white border border-rose-600 hover:bg-rose-500 focus:ring-4 focus:outline-none focus:ring-rose-300 font-semibold rounded-lg text-sm py-2.5 text-center mr-3 mb-3.5 dark:border-rose-500 dark:text-rose-500 dark:hover:text-white dark:hover:bg-rose-500 dark:focus:ring-rose-800"
                                onClick={() => handleDeleteImage(index)}
                            >
                                delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}


export default ImageUpload