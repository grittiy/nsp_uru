
'use client'

import { ForgotPasswordForm } from "./form"

export default function ForgotPassword() {
    return (
        <div>
            <title>การกู้คืนบัญชี | NSP URU</title>
            <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-fuchsia-50">
                <div className="flex flex-col container mx-auto">
                    <div className="flex flex-col lg:flex-row w-2/3 lg:w-2/3 bg-white mx-auto  rounded-2xl shadow-2xl overflow-hidden text-center">
                        <div className="w-full lg:w-3/5 p-5">
                            <div className="text-left text-lg font-semibold">
                                <span className="text-rose-700 ">NSP </span>URU
                            </div>
                            <div className="py-10">
                                <h2 className="text-4xl font-semibold text-rose-700 mb-2">กู้คืนบัญชี</h2>
                            </div>
                            <div className="border-2 w-10 border-rose-700 inline-block mb-2" />
                            <div className="flex flex-col items-center">
                                <ForgotPasswordForm />
                            </div>
                        </div>
                        <div className="w-full lg:w-2/5 bg-rose-600 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
                            <h2 className="text-4xl font-black mb-2">การกู้คืนบัญชี</h2>
                            <div className="border-2 w-10 border-white inline-block mb-2" />
                            <p className="mb-10 text-lg font-semibold">EASYb ต้องการตวรจสอบว่าคุณเป็นผู้ที่พยายามลงชื่อเข้าใช้จริง เพื่อช่วยรักษาบัญชีของคุณให้ปลอดภัย</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}