'use client'

import { useEffect, useState } from 'react'

export default function DevMessages() {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchList = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/dev-emails')
            const data = await res.json()
            if (data.ok) setList(data.list)
        } catch (err) {
            console.error(err)
        } finally { setLoading(false) }
    }

    useEffect(() => { fetchList() }, [])

    return (
        <div className="min-h-[60vh] mx-6 py-8">
            <h2 className="text-2xl font-semibold mb-4">Dev Email Messages</h2>
            <p className="text-sm text-slate-500 mb-4">This page is for development only — shows Ethereal preview links for emails sent by the server.</p>
            <div className="space-y-4">
                {loading && <p>Loading…</p>}
                {!loading && list.length === 0 && <p className="text-slate-500">No dev messages yet.</p>}
                {list.map((m) => (
                    <div key={m.id} className="p-4 border rounded bg-white">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <div className="text-sm text-slate-700"><strong>To:</strong> {m.to}</div>
                                <div className="text-sm text-slate-700"><strong>Subject:</strong> {m.subject}</div>
                                <div className="text-xs text-slate-400">{new Date(m.timestamp).toLocaleString()}</div>
                            </div>
                            {m.preview && <a className="text-sm text-orange-500" href={m.preview} target="_blank" rel="noreferrer">Open preview</a>}
                        </div>
                        {m.text && <pre className="text-xs text-slate-600 whitespace-pre-wrap">{m.text}</pre>}
                    </div>
                ))}
            </div>
        </div>
    )
}
