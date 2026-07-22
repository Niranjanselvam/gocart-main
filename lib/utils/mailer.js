import nodemailer from 'nodemailer'

export async function sendEmail({ to, subject, html, text }) {
    // Use SMTP config from env if provided, otherwise log and pretend to send
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FROM_EMAIL } = process.env

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !FROM_EMAIL) {
        // No SMTP configured; log and return success for development
        console.log('sendEmail (dev):', { to, subject })
        return { ok: true, info: 'no-smtp-config' }
    }

    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: parseInt(SMTP_PORT || '587', 10),
        secure: false,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
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
