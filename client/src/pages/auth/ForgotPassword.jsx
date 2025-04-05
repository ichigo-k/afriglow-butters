import { motion } from "framer-motion";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import useAuthStore from "../../store/authStore.jsx";
import {toast} from "sonner";

export default function ForgotPassword() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const {forgotPassword} = useAuthStore()

    const submit = async (data) => {
        await forgotPassword(data)
        toast.success("Reset link sent to email")
    };

    return (
        <motion.div
            className="w-full min-h-screen flex items-center justify-center bg-gray-50 p-6"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8"
            >
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-green-500 to-green-600 text-transparent bg-clip-text">
                        Afri<span className="text-gray-900">Glow</span>
                    </h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Reset your password
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(submit)} className="mt-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <input
                                {...register("email", {
                                    required: "Email cannot be empty",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Please enter a valid email"
                                    }
                                })}
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            disabled={isSubmitting}
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg transition hover:bg-green-600"
                        >
                            {isSubmitting ? "Sending..." : "Send Reset Link"}
                        </motion.button>
                    </div>
                </form>

                {/* Footer Links */}
                <div className="mt-4 text-center">
                    <Link to={"/"} className="text-green-500 font-semibold hover:underline">
                        Back to Login
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
}
