'use client'

import { useState } from 'react'

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.name || !form.email || !form.message) {
            setStatus('Please complete all fields.')
            return
        }
        setStatus('Thanks! We have received your message.')
        setForm({ name: '', email: '', message: '' })
    }

    return (
        <div className="min-h-[80vh] bg-slate-50 px-6 py-12">
            <div className="max-w-5xl mx-auto rounded-[32px] bg-white p-10 shadow-xl">
                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <p className="text-orange-500 font-semibold uppercase tracking-[0.3em]">Get in touch</p>
                        <h1 className="mt-4 text-4xl font-bold text-slate-900">Questions or order help?</h1>
                        <p className="mt-5 text-slate-600 leading-8">Our support team is available to help you with product inquiries, delivery tracking, and easy returns.</p>
                        <div className="mt-10 space-y-4 text-slate-700">
                            <p><strong>Email</strong>: support@heartyhome.in</p>
                            <p><strong>Phone</strong>: +91 98765 43210</p>
                            <p><strong>Address</strong>: 12 Garden Street, Bangalore, India</p>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <label className="block text-sm font-medium text-slate-700">Name</label>
                            <input
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400"
                                type="text"
                                placeholder="Your name"
                            />
                            <label className="block text-sm font-medium text-slate-700">Email</label>
                            <input
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400"
                                type="email"
                                placeholder="you@example.com"
                            />
                            <label className="block text-sm font-medium text-slate-700">Message</label>
                            <textarea
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                className="w-full min-h-[180px] rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400"
                                placeholder="Tell us how we can help..."
                            />
                            {status && <p className="text-sm text-orange-600">{status}</p>}
                            <button type="submit" className="w-full rounded-full bg-orange-500 px-6 py-3 text-white font-semibold hover:bg-orange-600 transition">Send message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
