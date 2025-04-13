import { Link } from "react-router";
import { LogIn, CircleUser, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Login from "../pages/auth/Login.jsx";
import useAuthStore from "../store/authStore.jsx";
import useCartStore from "../store/orderStore.jsx";

export default function Sidebar() {
    const [showLogin, setShowLogin] = useState(false);
    const { user, isAuth } = useAuthStore();
    const { cart } = useCartStore();

    const cartItemCount = cart.length;

    return (
        <>
            <aside className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow z-50 p-6 flex flex-col justify-between">
                {/* Logo */}
                <Link
                    to="/"
                    className="text-4xl font-bold tracking-tight bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text mb-10"
                >
                    Afri<span className="text-black">Glow</span>
                </Link>

                {/* Navigation Options */}
                <div className="flex flex-col gap-6">
                    {isAuth ? (
                        <>
                            <Link
                                to="/store"
                                className="w-full px-4 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-shadow shadow text-center"
                            >
                                View Store
                            </Link>

                            <Link to="/cart" className="relative flex items-center gap-2 text-green-700 hover:text-green-800">
                                <ShoppingCart size={24} />
                                <span>Cart</span>
                                {cartItemCount > 0 && (
                                    <span className="ml-auto bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow">
                                        {cartItemCount}
                                    </span>
                                )}
                            </Link>

                            <div className="flex items-center gap-2 border border-green-500 rounded-lg px-3 py-2 hover:bg-green-50 transition">
                                <CircleUser className="text-green-600" size={20} />
                                <p
                                    className="text-sm text-gray-800 font-medium truncate"
                                    title={user.name}
                                >
                                    {user.name}
                                </p>
                            </div>
                        </>
                    ) : (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                            <button
                                onClick={() => setShowLogin(true)}
                                className="w-full px-4 py-3 rounded-lg bg-green-500 text-white font-semibold flex items-center justify-center gap-2 shadow hover:bg-green-600 transition-all duration-300"
                            >
                                <span>Login</span>
                                <LogIn size={20} />
                            </button>
                        </motion.div>
                    )}
                </div>

                {/* Footer if needed */}
                <div className="text-xs text-gray-400 mt-10 text-center">
                    &copy; {new Date().getFullYear()} AfriGlow
                </div>
            </aside>

            {/* Login Modal */}
            {showLogin && <Login setShow={setShowLogin} show={showLogin} />}
        </>
    );
}
