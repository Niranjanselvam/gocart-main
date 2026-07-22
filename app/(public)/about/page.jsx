import Link from 'next/link'

export default function AboutPage() {
    return (
        <div className="min-h-[80vh] bg-slate-50 px-6 py-12">
            <div className="max-w-6xl mx-auto rounded-[32px] bg-white p-10 shadow-xl">
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-orange-500 font-semibold uppercase tracking-[0.3em]">About HeartyHome</p>
                        <h1 className="mt-4 text-4xl font-bold text-slate-900">A warmer way to shop for home essentials.</h1>
                        <p className="mt-5 text-slate-600 leading-8">HeartyHome brings a curated Indian shopping experience for home decor, smart appliances, and everyday essentials. Enjoy helpful recommendations, instant discounts, and responsive service built for your lifestyle.</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-3xl bg-orange-50 p-6 shadow-sm">
                            <p className="text-sm uppercase text-orange-500">Customer-first</p>
                            <p className="mt-4 text-slate-700 font-semibold">Fast delivery across India</p>
                        </div>
                        <div className="rounded-3xl bg-orange-50 p-6 shadow-sm">
                            <p className="text-sm uppercase text-orange-500">Secure shopping</p>
                            <p className="mt-4 text-slate-700 font-semibold">Easy returns and safe checkout</p>
                        </div>
                    </div>
                </div>
                <div className="mt-10 grid gap-8 lg:grid-cols-2">
                    <div className="rounded-3xl bg-slate-50 p-8">
                        <h2 className="text-xl font-semibold text-slate-900">What We Offer</h2>
                        <ul className="mt-5 space-y-4 text-slate-600">
                            <li>• Trendy home decor and furniture accessories</li>
                            <li>• Daily deals and discount bundles</li>
                            <li>• Curated products built for modern Indian homes</li>
                        </ul>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-8">
                        <h2 className="text-xl font-semibold text-slate-900">Our Promise</h2>
                        <p className="mt-5 text-slate-600">HeartyHome is committed to giving you a delightful shopping journey with responsive support, fair pricing, and clear product choices.</p>
                        <Link href="/products" className="mt-8 inline-flex items-center rounded-full bg-orange-500 px-6 py-3 text-white font-medium hover:bg-orange-600 transition">Browse products</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
