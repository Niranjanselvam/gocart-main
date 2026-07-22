import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/utils/mailer'

// Simple in-memory orders list for demo
const orders = []

export async function POST(req) {
    try {
        const { user, items, total } = await req.json()
        if (!user || !items || !Array.isArray(items)) return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })

        const order = { id: `ord_${Date.now()}`, user, items, total, createdAt: new Date().toISOString() }
        orders.push(order)

        // send confirmation email
        const to = user.email
        const subject = `Order confirmation ${order.id}`
        const html = `<p>Thanks ${user.name}, your order <strong>${order.id}</strong> has been placed.</p><p>Total: ₹${total}</p>`

        await sendEmail({ to, subject, html, text: `Order ${order.id} placed. Total: ₹${total}` })

        return NextResponse.json({ ok: true, order })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
    }
}
