import nodemailer from 'nodemailer'
import { pushDevMail } from '@/lib/utils/devMailStore'

export async function sendEmail({ to, subject, html, text }) {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FROM_EMAIL } = process.env

    // If SMTP isn't configured, create an Ethereal test account for development
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !FROM_EMAIL) {
        try {
            const testAccount = await nodemailer.createTestAccount()
            const transporter = nodemailer.createTransport({
                host: testAccount.smtp.host,
                port: testAccount.smtp.port,
                secure: testAccount.smtp.secure,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                },
            })

            const info = await transporter.sendMail({
                from: testAccount.user + ' (ethereal)',
                to,
                subject,
                text,
                html,
            })

            const preview = nodemailer.getTestMessageUrl(info)
            console.log('sendEmail (ethereal):', { to, subject, preview })
            // store preview for dev UI
            try { pushDevMail({ to, subject, preview, text, html }) } catch (e) { /* ignore */ }
            return { ok: true, info, preview }
        } catch (err) {
            console.error('sendEmail (ethereal) error:', err)
            return { ok: false, error: 'mail-error' }
        }
    }

    // Use configured SMTP for production
    const port = parseInt(SMTP_PORT || '587', 10)
    const secure = port === 465

    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port,
        secure,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    })

    const info = await transporter.sendMail({
        from: FROM_EMAIL,
        to,
        subject,
        text,
        html,
    })

    return { ok: true, info }
}
