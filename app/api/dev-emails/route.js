import { NextResponse } from 'next/server'
import { listDevMail } from '@/lib/utils/devMailStore'

export async function GET() {
    try {
        const list = listDevMail()
        return NextResponse.json({ ok: true, list })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
    }
}
