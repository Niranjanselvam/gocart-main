'use client'

import Link from 'next/link'
import { couponDummyData, productDummyData } from '@/assets/assets'
import ProductCard from '@/components/ProductCard'

export default function DiscountsPage() {
    const featured = productDummyData.slice(0, 4)

    return (
        <div className="min-h-[80vh] bg-slate-50 px-6 py-12">
            <div className="max-w-7xl mx-auto">
                <div className="rounded-[32px] bg-white p-10 shadow-xl">
                    <div className="mb-10 grid gap-6 md:grid-cols-2">
                        {couponDummyData.map((coupon, index) => (
                            <div key={index} className="rounded-3xl border border-orange-100 bg-orange-50 p-6">
                                <p className="text-sm uppercase tracking-[0.3em] text-orange-600">Coupon</p>
                                <h2 className="mt-4 text-2xl font-bold text-slate-900">{coupon.code}</h2>
                                <p className="mt-3 text-slate-600">{coupon.description}</p>
                                <p className="mt-4 text-sm text-slate-500">Expires on {new Date(coupon.expiresAt).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900">Hot deals and best picks</h2>
                                <p className="mt-2 text-slate-600">Explore a curated selection of products with instant savings.</p>
                            </div>
                            <Link href="/products" className="rounded-full bg-orange-500 px-6 py-3 text-white hover:bg-orange-600 transition">Shop now</Link>
                        </div>
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                            {featured.map(product => <ProductCard key={product.id} product={product} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
