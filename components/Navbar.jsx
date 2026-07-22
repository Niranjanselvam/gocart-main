'use client'
import { Search, ShoppingCart, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/lib/features/auth/authSlice";
import { clearCart } from "@/lib/features/cart/cartSlice";

const Navbar = () => {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const cartCount = useSelector(state => state.cart.total);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        e.preventDefault();
        if (!search.trim()) return;
        router.push(`/products?search=${encodeURIComponent(search)}`);
    }

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
        router.push('/');
    }

    return (
        <nav className="relative bg-white shadow-sm">
            <div className="mx-6">
                <div className="flex flex-wrap items-center justify-between max-w-7xl mx-auto py-4 gap-4 transition-all">

                    <Link href="/" className="relative text-4xl font-bold text-slate-900">
                        <span className="text-orange-500">hearty</span>home<span className="text-orange-500 text-5xl leading-0">.</span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-6 text-slate-600">
                        <Link href="/" className="hover:text-orange-500 transition">Home</Link>
                        <Link href="/products" className="hover:text-orange-500 transition">Products</Link>
                        <Link href="/best-products" className="hover:text-orange-500 transition">Best</Link>
                        <Link href="/discounts" className="hover:text-orange-500 transition">Discounts</Link>
                        <Link href="/about" className="hover:text-orange-500 transition">About</Link>
                        <Link href="/contact" className="hover:text-orange-500 transition">Contact</Link>
                    </div>

                    <form onSubmit={handleSearch} className="hidden xl:flex items-center gap-2 bg-slate-100 px-4 py-3 rounded-full w-[320px]">
                        <Search size={18} className="text-slate-600" />
                        <input
                            className="w-full bg-transparent outline-none placeholder-slate-600"
                            type="text"
                            placeholder="Search products"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>

                    <div className="flex items-center gap-4">
                        <Link href="/cart" className="relative flex items-center gap-2 text-slate-600 hover:text-orange-500 transition">
                            <ShoppingCart size={18} />
                            <span className="hidden sm:inline">Cart</span>
                            <span className="absolute -top-2 left-8 min-w-[18px] h-5 text-[10px] leading-5 text-white bg-orange-500 rounded-full flex items-center justify-center">{cartCount}</span>
                        </Link>
                        {user ? (
                            <button onClick={handleLogout} className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-sm rounded-full hover:bg-orange-600 transition">
                                <LogOut size={16} /> Logout
                            </button>
                        ) : (
                            <Link href="/login" className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-sm rounded-full hover:bg-orange-600 transition">
                                <User size={16} /> Login
                            </Link>
                        )}
                    </div>

                    <div className="lg:hidden flex items-center gap-3">
                        <button className="px-6 py-2 bg-orange-500 text-white rounded-full text-sm hover:bg-orange-600 transition">Menu</button>
                    </div>
                </div>
            </div>
            <hr className="border-slate-200" />
        </nav>
    )
}

export default Navbar
