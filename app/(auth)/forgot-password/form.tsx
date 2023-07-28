'use client'
import { AiFillLock } from 'react-icons/ai';
import React, { useState } from "react"
import { Alert } from "../../components/ui/alert"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from 'next/navigation'
import { FaRegEnvelope } from 'react-icons/fa';
import Link from 'next/link';

export const ForgotPasswordForm = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
    // const error = searchParams.get('error') ? 'Invalid credentials' : ''
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await signIn('credentials', {
                redirect: false,
                email,
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
     
            {error && <Alert>{error}</Alert>}
            <div className="w-full p-2 flex items-center mb-3">
                <button className=" border-2 border-rose-700 text-rose-700  text-sm flex-1 rounded-full px-12  py-2 inline-block font-semibold hover:bg-rose-700
        hover:text-white overflow-clip" >บัญชี</button>
            </div>
        </form>
    )
}