'use client'
import React, { useState } from 'react'
import { AiOutlineHeart } from "react-icons/ai"
import Image from 'next/image';

type Props = {
    imageUrls: string
}

const ImageGallery = ({ imageUrls }: Props) => {
    const [selectedImage, setSelectedImage] = useState<number>(0)
    const urlArray = imageUrls.split(',')
    return (
        <div className='images grid  grid-cols-1 md:grid-cols-7'>
                 <div className='all-images flex flex-col col-span-2 justify-center'>
                {urlArray.map((url, index) => (
                    <div key={index} className='image relative rounded-lg '>
                        <Image
                            src={url}
                            alt={`Image ${index + 1}`}
                            width={100} // Set the width
                            height={100} // Set the height
                            onClick={() => setSelectedImage(index)}
                            className={`rounded-full mb-3 p-1 object-cover object-top ${selectedImage === index
                                ? 'border-[1px] border-purple-500'
                                : 'border-[1px] border-purple-200'
                                }`}
                        />
                    </div>
                ))}
            </div>
            <div className='selected-image  flex flex-col col-span-5 justify-center'>
                <Image
                    src={urlArray[selectedImage]}
                    alt=''
                    width={700} // Set the width
                    height={700} // Set the height
                    className='object-cover object-top rounded-tr-lg '
                />
            </div>
        </div>
    )
}

export default ImageGallery