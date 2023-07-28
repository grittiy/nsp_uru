'use client'
import Link from "next/link";
import { LoginForm } from "./form";
import { FormEvent } from "react";
import { signIn } from "next-auth/react"
import { BsLine, BsGoogle } from 'react-icons/bs';

export default function LoginPage() {
    const heandleGoogleSignIn = (event: FormEvent<Element>) => {
        event.preventDefault()
        signIn('google', { callbackUrl: 'http://localhost:3000/' })
    }

    const heandleLineSignIn = (event: FormEvent<Element>) => {
        event.preventDefault()

        signIn('line', { callbackUrl: 'http://localhost:3000/' })
    }

    return (
        <main>
            <title>เข้าสู่ระบบ | NSP URU</title>
         
            <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-red-50">
                <div className="flex flex-col container mx-auto">
                    <div className="flex flex-col lg:flex-row w-2/3 lg:w-2/3 bg-white mx-auto  rounded-2xl shadow-2xl overflow-hidden text-center">
                        <div className="w-full lg:w-3/5 p-5">
                            <div className="text-left text-lg font-semibold">
                                <span className="text-blue-700 ">NSP </span>URU
                            </div>
                            <div className="py-10">
                                <h2 className="text-3xl font-semibold text-blue-700 mb-2">เข้าสู่ระบบ</h2>
                                <div className="border-2 w-10 border-blue-700 inline-block mb-2" />
                                <div className="flex justify-center my-2">
                                    <button type="button" onClick={heandleGoogleSignIn} className="border-2  border-rose-300 rounded-full p-3 mx-1">
                                        <BsGoogle className="text-lg " color="#c21750" />
                                    </button>
                                    <button type="button" onClick={heandleLineSignIn} className="border-2  border-green-400  rounded-full p-3 mx-1">
                                        <BsLine className="text-lg " color="#25bd2c" />
                                    </button>
                                </div>
                                {/* Social register section */}
                                <p className="text-gray-400 my-3 font-semibold">or use your username account...</p>
                                <div className="flex flex-col items-center">
                                    <LoginForm />
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-2/5 bg-blue-700 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
                            <h2 className="text-3xl font-black mb-2">Hello, Friend!</h2>
                            <div className="border-2 w-10 border-white inline-block mb-2" />
                            <p className="mb-10 text-lg font-semibold">Fill up personal information and start journey with us.</p>
                            <Link href="/register" className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white
      hover:text-violet-600"
                            >
                                ลงทะเบียน
                            </Link>{''}
                        </div>
                    </div>
                </div>
            </div>

        </main>

    )
} 