import { motion } from "framer-motion";
import {Link, useParams} from "react-router";
import { useForm } from "react-hook-form";
import useAuthStore from "../../store/authStore.jsx";

export default function ResetPassword() {
    const { register, reset, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();

    const {id} = useParams()
    const {resetPassword, error} = useAuthStore()

    const submit = async (data) => {
        reset()
        await resetPassword(id, data)
    };


    return (
        <motion.div className="w-full min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8"
            >
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text">
                        Afri<span className="text-gray-900">Glow</span>
                    </h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Create a new password
                    </p>
                </div>
                {error && <p className={"text-red-500 text-sm text-center p-2 w-full border-1 border-red-500 bg-red-200 rounded-md mt-3"}>{error}</p>}

                <form onSubmit={handleSubmit(submit)} className="mt-6">
                    <div className="space-y-4">
                        {/* New Password */}
                        <div className="relative">
                            <input
                                {...register("password", {
                                    required: "New password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters long"
                                    }
                                })}
                                type="password"
                                placeholder="New Password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                            />
                            {errors.newPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <input
                                {...register("confirmPassword", {
                                    required: "Confirm password is required",
                                    validate: value =>
                                        value === watch("password") || "Passwords do not match"
                                })}
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            disabled={isSubmitting}
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg transition hover:bg-green-600"
                        >
                            {isSubmitting ? "Updating..." : "Reset Password"}
                        </motion.button>
                    </div>
                </form>

                {/* Footer Link */}
                <div className="mt-4 text-center">
                    <Link to={"/"} className="text-green-500 font-semibold hover:underline">
                        Back to Login
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
}
