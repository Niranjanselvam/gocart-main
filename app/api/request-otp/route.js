import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/utils/mailer'
import { otpStore } from '@/lib/utils/otpStore'

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(req) {
    try {
        const { email } = await req.json()
        if (!email) return NextResponse.json({ ok: false, error: 'Missing email' }, { status: 400 })

        const code = generateOtp()
        const expires = Date.now() + 5 * 60 * 1000
        otpStore.set(email, { code, expires })

        // send email (best-effort)
        const mailResult = await sendEmail({
            to: email,
            subject: 'Your HeartyHome OTP',
            text: `Your verification code is ${code}`,
            html: `<p>Your verification code is <strong>${code}</strong></p>`,
        })

        // Debug: log generated code and any preview URL (ethereal)
        console.log('OTP generated for', email, { code, expires })
+        if (mailResult && mailResult.preview) console.log('OTP email preview URL:', mailResult.preview)

        return NextResponse.json({ ok: true, code })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
    }
}
