'use client'
import { AiFillLock } from 'react-icons/ai';
import React, { useEffect, useState } from "react"
import { Alert } from "../../components/ui/alert"
import { signIn, useSession } from "next-auth/react"
import { useRouter, useSearchParams } from 'next/navigation'
import { FaRegEnvelope } from 'react-icons/fa';
import Link from 'next/link';

export const LoginForm = () => {
    const router = useRouter()
    const {data} = useSession()
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
    // const error = searchParams.get('error') ? 'Invalid credentials' : ''
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        //code 
        if (data && data.user) {
            if (data.user.role === 'ADMIN') {
                router.push('/admin')
            } else if (data.user.role === 'DIRECTOR') {
                router.push('/driector')
            } else if (data.user.role === 'EMPLOYEE') {
                router.push('/employee')
            } else if (data.user.role === 'USER') {
                router.push('/user')
            }
        }
    }, [data, router])

    console.log('data',data)
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await signIn('credentials', {
                redirect: false,
                email,
                password,
                callbackUrl
            })
            console.log('Res', res)
            if (!res?.error) {
                router.push(callbackUrl)
            } else {
                setError('Invalid email or password')
            }
            // console.log('Login!')    
        } catch (err: any) { }

    }
    return (
        <form onSubmit={onSubmit} className=" w-full sm:w-[400px]">
            <div className="bg-gray-100 p-2 flex w-full items-center mb-3">
                <FaRegEnvelope className="text-gray-500 m-2" />
                <input
                    className="bg-gray-100 font-semibold outline-none text-sm flex-1 overflow-clip"
                    name="email"
                    placeholder="อีเมล..."
                    required //reload
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id='email' type="email" />
            </div>
            <div className="bg-gray-100 p-2 flex w-full items-center mb-3">
                <AiFillLock className="text-gray-500 m-2" />
                <input
                    name="password"
                    placeholder="รหัสผ่าน..."
                    required //reload
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id='password' type="password"
                    className="bg-gray-100 font-semibold outline-none text-sm flex-1 overflow-clip"
                />
            </div>
            <div className="flex  justify-between w-full mb-5">
                <label className="flex items-center font-semibold text-gray-400 text-xs">
                    <input type="checkbox" name="remember" className="mr-1 " />
                    จดจำ
                </label>
                <Link href="/forgot-password" className="text-xs font-semibold text-indigo-600">ลืมรหัสผ่าน</Link>
            </div>
            {error && <Alert>{error}</Alert>}
            <div className="w-full p-2 flex items-center mb-3">
                <button className=" border-2 border-blue-700 text-blue-700 text-sm flex-1 rounded-full px-12  py-2 inline-block font-semibold hover:bg-blue-700
        hover:text-white overflow-clip" >เข้าสู่ระบบ</button>
            </div>
        </form>
    )
}