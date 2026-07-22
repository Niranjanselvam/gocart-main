'use client'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/features/auth/authSlice'

export default function LoginPage() {
    const dispatch = useDispatch()
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [stage, setStage] = useState('enter-email') // 'enter-email' | 'verify-otp'
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [otpCode, setOtpCode] = useState('')

    const handleSendOtp = async (e) => {
        e && e.preventDefault()
        setMessage('')
        if (!email.trim()) return setMessage('Please enter your email')
        setLoading(true)
        try {
            const res = await fetch('/api/request-otp', { method: 'POST', body: JSON.stringify({ email }), headers: { 'Content-Type': 'application/json' } })
            const data = await res.json()
            if (!data.ok) return setMessage(data.error || 'Failed to send OTP')
            setOtpCode(data.code || '')
            setStage('verify-otp')
            setMessage('OTP sent — check your email or use the code below')
        } catch (err) {
            console.error(err)
            setMessage('Server error')
        } finally { setLoading(false) }
    }

    const handleVerify = async (e) => {
        e && e.preventDefault()
        setMessage('')
        if (!otp.trim()) return setMessage('Enter the OTP')
        setLoading(true)
        try {
            const res = await fetch('/api/verify-otp', { method: 'POST', body: JSON.stringify({ email, code: otp }), headers: { 'Content-Type': 'application/json' } })
            const data = await res.json()
            if (!data.ok) return setMessage(data.error || 'Invalid OTP')
            // data.user returned from API
            dispatch(login(data.user))
            router.push('/')
        } catch (err) {
            console.error(err)
            setMessage('Server error')
        } finally { setLoading(false) }
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6 py-12 bg-slate-50">
            <div className="w-full max-w-lg rounded-[30px] bg-white shadow-2xl p-8 sm:p-12">
                <h1 className="text-3xl font-bold text-slate-900">Welcome to HeartyHome</h1>
                <p className="mt-3 text-slate-500">Login with one-time code sent to your email.</p>

                {stage === 'enter-email' ? (
                    <form onSubmit={handleSendOtp} className="mt-8 space-y-5">
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
                        {message && <p className="text-sm text-slate-500">{message}</p>}
                        <button disabled={loading} className="w-full rounded-full bg-orange-500 px-6 py-3 text-white text-sm font-semibold hover:bg-orange-600 transition">
                            {loading ? 'Sending...' : 'Send OTP'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerify} className="mt-8 space-y-5">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Enter OTP</label>
                            <input
                                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400"
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="6-digit code"
                            />
                        </div>
                        {otpCode && (
                            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-3 text-sm text-slate-700">
                                <p className="font-medium">Development OTP</p>
                                <p className="mt-1 text-xl font-semibold tracking-[0.25em]">{otpCode}</p>
                            </div>
                        )}
                        {message && <p className="text-sm text-slate-500">{message}</p>}
                        <div className="flex gap-3">
                            <button disabled={loading} className="flex-1 rounded-full bg-orange-500 px-6 py-3 text-white text-sm font-semibold hover:bg-orange-600 transition">{loading ? 'Verifying...' : 'Verify'}</button>
                            <button type="button" onClick={handleSendOtp} disabled={loading} className="flex-1 rounded-full border border-slate-200 px-6 py-3 text-sm">Resend</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
