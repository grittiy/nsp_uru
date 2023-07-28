'use client'
import Link from "next/link";
import { RegisterForm } from "./form";
import { BsLine, BsGoogle } from 'react-icons/bs';
import { signIn } from "next-auth/react"
import { FormEvent } from "react";

export default function RegisterPage() {
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
            <title>ลงทะเบียน | NSP URU</title>
            {/* <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
            <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
            <h1 className="font-semibold text-2xl">Register</h1>
            <RegisterForm />
            <p className='text-center'>Have an account?{''}
            <Link className='text-indigo-500 hover:underline' href="/login">
                Sign in
            </Link>{''}
            </p>
            </div>
        </div> */}
            <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-red-50 ">
                <div className="flex flex-col container mx-auto">
                    <div className="flex flex-col lg:flex-row w-2/3 lg:w-2/3 bg-white mx-auto  rounded-2xl shadow-2xl overflow-hidden text-center">
                        <div className="w-full lg:w-2/5 bg-purple-600 text-white rounded-tl-2xl rounded-bl-2xl  py-36 px-12">
                            <h2 className="text-3xl font-black mb-2">Welcome Back!</h2>
                            <p className="mb-10 text-lg font-semibold">To keep connected with us please login with your personal info{''}</p>
                            <Link href="/login" className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white
        hover:text-purple-600"
                            >
                                เข้าสู่ระบบ
                            </Link>{''}
                        </div>
                        <div className="w-full lg:w-3/5 p-5">
                            <div className="text-left text-lg font-semibold">
                                <span className="text-purple-700">NSP </span>URU
                            </div>
                            <div className="py-10">
                                <h2 className="text-3xl font-semibold text-purple-700 mb-2">ลงทะเบียน</h2>
                                <div className="border-2 w-10 border-purple-700 inline-block mb-2" />
                                <div className="flex justify-center my-2">
                                    <button type="button"  onClick={heandleGoogleSignIn} className="border-2  border-rose-300 rounded-full p-3 mx-1">
                                        <BsGoogle className="text-lg " color="#c21750" />
                                    </button>
                                    <button type="button" onClick={heandleLineSignIn} className="border-2  border-green-400  rounded-full p-3 mx-1">
                                        <BsLine className="text-lg " color="#25bd2c" />
                                    </button>
                                </div>
                                {/* Social register section */}
                                <p className="text-gray-400 my-3 font-semibold">or use your email for registration...</p>
                                <div className="flex flex-col items-center">
                                    <RegisterForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    )
}