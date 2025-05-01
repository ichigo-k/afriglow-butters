import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Navbar from "../../components/Navbar.jsx";

export default function Successful() {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 px-4">
                {/* Animated Check Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-green-600"
                >
                    <CheckCircle size={80} />
                </motion.div>

                {/* Animated Success Text */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-6 text-3xl font-bold text-green-700"
                >
                    Payment Successful!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-2 text-gray-600 text-center max-w-md"
                >
                    Thank you for your payment. Your transaction has been completed and a
                    receipt has been sent to your email.
                </motion.p>

                {/* Optional: Add a button to go back or continue */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg font-medium shadow-md hover:bg-green-700 transition"
                    onClick={() => window.location.href = '/'}
                >
                    Go to Store
                </motion.button>
            </div>
        </>
    );
}
