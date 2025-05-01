import Navbar from "../../components/Navbar.jsx";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

export default function Error() {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 px-4">
                {/* Animated Error Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-red-600"
                >
                    <XCircle size={80} />
                </motion.div>

                {/* Animated Error Text */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-6 text-3xl font-bold text-red-700"
                >
                    Payment Failed
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-2 text-gray-600 text-center max-w-md"
                >
                    Something went wrong during your transaction. Please try again or contact support if the issue persists.
                </motion.p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 px-6 py-3 bg-red-600 text-white rounded-lg font-medium shadow-md hover:bg-red-700 transition"
                    onClick={() => window.location.href = '/'}
                >
                    Go Back Home
                </motion.button>
            </div>
        </>
    );
}
