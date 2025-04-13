import { Link } from "react-router";
import { LogIn, CircleUser, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Login from "../pages/auth/Login.jsx";
import useAuthStore from "../store/authStore.jsx";
import useCartStore from "../store/orderStore.jsx";

export default function Navbar() {
    const [showLogin, setShowLogin] = useState(false);
    const { user, isAuth } = useAuthStore();
    const { cart } = useCartStore();

    const cartItemCount = cart.length;

    return (
        <nav className="w-full px-4 py-3 flex items-center justify-between bg-white border-b border-gray-100">
            {/* Logo */}
            <Link
                to="/"
                className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text"
            >
                Afri<span className="text-black">Glow</span>
            </Link>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                {isAuth ? (
                    <div className="flex items-center gap-4">
                        {/* Store Button */}
                        <Link
                            to="/store"
                            className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-shadow shadow"
                        >
                            View Store
                        </Link>

                        {/* Cart Icon with Counter */}
                        <Link to="/cart" className="relative group">
                            <ShoppingCart
                                size={26}
                                className="text-green-600 group-hover:text-green-700 transition"
                            />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>

                        {/* User Info */}
                        <Link to={"/profile"} className="flex items-center gap-2 px-3 py-2 rounded-full border border-green-500 hover:bg-green-50 transition">
                            <CircleUser className="text-green-600" size={20} />
                            <p
                                className="text-sm text-gray-800 font-medium max-w-[120px] truncate hidden md:block"
                                title={user.name}
                            >
                                {user.name}
                            </p>
                        </Link>
                    </div>
                ) : (
                    // Login Button
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                        <button
                            onClick={() => setShowLogin(true)}
                            className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold text-base flex items-center gap-2 shadow hover:bg-green-600 transition-all duration-300"
                        >
                            <span className="hidden sm:inline">Login</span>
                            <LogIn size={20} />
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Login Modal */}
            {showLogin && <Login setShow={setShowLogin} show={showLogin} />}
        </nav>
    );
}
