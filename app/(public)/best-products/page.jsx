'use client'

import Title from '@/components/Title'
import ProductCard from '@/components/ProductCard'
import { useSelector } from 'react-redux'

export default function BestProductsPage() {
    const products = useSelector(state => state.product.list)
    const topProducts = products.slice().sort((a, b) => b.rating.length - a.rating.length).slice(0, 9)

    return (
        <div className="min-h-[80vh] bg-slate-50 px-6 py-12">
            <div className="max-w-7xl mx-auto">
                <Title title="Best Products" description="Discover the most loved items by customers" href="/products" />
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {topProducts.map(product => <ProductCard key={product.id} product={product} />)}
                </div>
            </div>
        </div>
    )
}
