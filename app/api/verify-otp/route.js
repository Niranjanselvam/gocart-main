import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/utils/mailer'
import { otpStore } from '@/lib/utils/otpStore'

export async function POST(req) {
    try {
        const { email, code } = await req.json()
        if (!email || !code) return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })

        const record = otpStore.get(email)
        if (!record) return NextResponse.json({ ok: false, error: 'No OTP found' }, { status: 400 })
        if (record.expires < Date.now()) {
            otpStore.delete(email)
            return NextResponse.json({ ok: false, error: 'OTP expired' }, { status: 400 })
        }

        if (record.code !== code) return NextResponse.json({ ok: false, error: 'Invalid OTP' }, { status: 400 })

        // OTP valid — create a simple user object (for demo)
        const user = { email, name: email.split('@')[0] }

        // send welcome email
        await sendEmail({
            to: email,
            subject: 'Welcome to HeartyHome',
            text: `Welcome ${user.name}! Your account is verified.`,
            html: `<p>Welcome <strong>${user.name}</strong>! Your account is verified.</p>`,
        })

        otpStore.delete(email)

        return NextResponse.json({ ok: true, user })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
    }
}
