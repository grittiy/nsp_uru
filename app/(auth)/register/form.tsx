'use client'

import { Alert } from "@/app/components/ui/alert"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { FaRegEnvelope, FaUserAlt } from 'react-icons/fa';
import { AiFillLock } from 'react-icons/ai';


export const RegisterForm = () => {
    const [name, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify({
                    name,email, password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.ok) {
                // redirect
                signIn()
            } else {
                setError((await res.json()).error)
            }
        } catch (error: any) {
            setError(error?.message)
            // console.log('Register!')
        }
    }
    return (
        <form onSubmit={onSubmit} className=" w-full sm:w-[400px] ">
            <div className="bg-gray-100 p-2 flex w-full items-center mb-3">
                <FaUserAlt className="text-gray-500 m-2" />
                <input
                    name="username"
                    required //reload
                    value={name}
                    placeholder="ชื่อผู้ใช้..."
                    onChange={(e) => setUsername(e.target.value)}
                    id='username' type="text"
                    className="bg-gray-100 font-semibold outline-none text-sm flex-1 overflow-clip "
                />
            </div>
            <div className=" bg-gray-100 p-2 flex w-full items-center mb-3">
                <FaRegEnvelope className="text-gray-500 m-2" />
                <input
                    name="email"
                    required //reload
                    value={email}
                    placeholder="อีเมล..."
                    onChange={(e) => setEmail(e.target.value)}
                    id='email' type="email"
                    className="bg-gray-100 font-semibold outline-none text-sm flex-1 overflow-clip"
                />
            </div>
            <div className="bg-gray-100 p-2 flex w-full items-center mb-3">
            <AiFillLock className="text-gray-500 m-2" />
                <input
                 name="password"
                    required //reload
                    value={password}
                    placeholder="รหัสผ่าน..."
                    onChange={(e) => setPassword(e.target.value)}
                    id='password' type="password" 
                    className="bg-gray-100 font-semibold outline-none text-sm flex-1 overflow-clip"
                    />
            </div>
            {error && <Alert>{error}</Alert>}
            <div className="w-full p-2 flex items-center mb-3">
                <button className=" border-2 border-purple-700 text-purple-700 text-sm flex-1 rounded-full px-12  py-2 inline-block font-semibold hover:bg-purple-700
        hover:text-white overflow-clip" >ลงทะเบียน</button>
            </div>
        </form>
    )
}