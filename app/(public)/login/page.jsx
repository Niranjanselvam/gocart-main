'use client'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/features/auth/authSlice'

export default function LoginPage() {
    const dispatch = useDispatch()
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name.trim() || !email.trim()) {
            setMessage('Please enter both name and email.')
            return
        }
        dispatch(login({ name, email }))
        router.push('/')
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6 py-12 bg-slate-50">
            <div className="w-full max-w-lg rounded-[30px] bg-white shadow-2xl p-8 sm:p-12">
                <h1 className="text-3xl font-bold text-slate-900">Welcome to HeartyHome</h1>
                <p className="mt-3 text-slate-500">Login to save your favorites, see cart details, and checkout faster.</p>
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                        <label className="text-sm font-medium text-slate-700">Name</label>
                        <input
                            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700">Email</label>
                        <input
                            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="hello@example.com"
                        />
                    </div>
                    {message && <p className="text-sm text-red-500">{message}</p>}
                    <button className="w-full rounded-full bg-orange-500 px-6 py-3 text-white text-sm font-semibold hover:bg-orange-600 transition">Login</button>
                </form>
            </div>
        </div>
    )
}
