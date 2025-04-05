import { Link } from "react-router";
import { LogIn, CircleUser, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import Login from "../pages/auth/Login.jsx";
import { useState } from "react";
import useAuthStore from "../store/authStore.jsx";

export default function Navbar() {
    const [show, setShow] = useState(false);
    const { user, isAuth } = useAuthStore();

    // Dummy cart count (replace with real data later)
    const cartItemCount = 3;

    return (
        <nav className="w-full p-3 md:p-4 flex items-center justify-between bg-white shadow-sm">

            <Link to="/" className="text-3xl md:text-4xl font-bold tracking-wide bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text">
                Afri<span className="text-black">Glow</span>
            </Link>


            <div className="hidden md:flex gap-6 text-gray-700 font-medium">
                <Link to="/products" className="hover:text-green-600 transition">Products</Link>
                <Link to="/about" className="hover:text-green-600 transition">About</Link>
                <Link to="/contact" className="hover:text-green-600 transition">Contact</Link>
            </div>

            <div className="flex items-center gap-4">




                {isAuth ? (
                    <>

                    <Link to="/cart" className="relative">
                        <ShoppingCart className="text-green-600" size={24} />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {cartItemCount}
                    </span>
                        )}
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="px-3 py-2 rounded-full md:border border-green-500 flex items-center gap-2 hover:bg-green-50 transition max-w-[180px]">
                            <CircleUser className="text-green-600" />
                            <p
                                className="text-sm font-medium text-gray-800 max-w-[100px] truncate  hidden md:block"
                                title={user.name}
                            >
                                {user.name}
                            </p>
                        </div>
                    </div>
                    </>
                ) : (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                        <button
                            onClick={() => setShow(true)}
                            className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold text-base flex items-center gap-2 shadow-md hover:bg-green-600 transition-all duration-300"
                        >
                            <span className="hidden sm:inline">Login</span>
                            <LogIn size={20} />
                        </button>
                    </motion.div>
                )}
            </div>


            {show && <Login setShow={setShow} show={show} />}
        </nav>
    );
}
