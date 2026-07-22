'use client'

import { useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import ProductCard from '@/components/ProductCard'

export default function ProductsContent() {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const products = useSelector(state => state.product.list)

    const filteredProducts = search
        ? products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
        : products

    return (
        <div className="min-h-[70vh] mx-6 bg-slate-50 py-12">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Products</h1>
                {search && <p className="mb-6 text-slate-600">Showing results for <span className="font-semibold">{search}</span></p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                {filteredProducts.length === 0 && <p className="mt-6 text-slate-600">No products matched your search. Try another keyword.</p>}
            </div>
        </div>
    )
}
