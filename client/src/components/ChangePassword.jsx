import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import useAuthStore from "../store/authStore.jsx";

export default function ChangePassword() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();
    const {user, changePassword, error} = useAuthStore()

    async function submit(data) {
       await changePassword(data)
        reset();
    }

    return (
        <>
            <h1 className="text-3xl font-semibold mt-10">Change Password</h1>

            {error && <p className={"text-red-500 text-sm mt-5"}>{error}</p>}


            <form className="max-w-md" onSubmit={handleSubmit(submit)}>

                {/* Current Password */}
                <label className="text-sm text-gray-800 ml-1 font-bold mt-4 block">Current Password</label>
                <div className="mt-1 border border-gray-300 rounded-xl w-full focus-within:border-green-500">
                    <input
                        {...register("currentPassword", { required: "Current password is required" })}
                        type="password"
                        placeholder="Enter current password"
                        className="w-full px-4 py-2 border-none outline-none bg-transparent"
                    />
                </div>
                {errors.currentPassword && <p className="text-red-500 mt-1 ml-1 text-sm">{errors.currentPassword.message}</p>}

                {/* New Password */}
                <label className="text-sm text-gray-800 ml-1 font-bold mt-4 block">New Password</label>
                <div className="mt-1 border border-gray-300 rounded-xl w-full focus-within:border-green-500">
                    <input
                        {...register("newPassword", {
                            required: "New password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })}
                        type="password"
                        placeholder="Enter new password"
                        className="w-full px-4 py-2 border-none outline-none bg-transparent"
                    />
                </div>
                {errors.newPassword && <p className="text-red-500 mt-1 ml-1 text-sm">{errors.newPassword.message}</p>}

                {/* Confirm Password */}
                <label className="text-sm text-gray-800 ml-1 font-bold mt-4 block">Confirm Password</label>
                <div className="mt-1 border border-gray-300 rounded-xl w-full focus-within:border-green-500">
                    <input
                        {...register("confirmPassword", {
                            required: "Please confirm your password",
                            validate: (value, formValues) => value === formValues.newPassword || "Passwords do not match"
                        })}
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full px-4 py-2 border-none outline-none bg-transparent"
                    />
                </div>
                {errors.confirmPassword && <p className="text-red-500 mt-1 ml-1 text-sm">{errors.confirmPassword.message}</p>}

                {/* Submit Button */}
                <motion.button
                    disabled={isSubmitting}
                    whileTap={{ scale: 0.9 }}
                    className="w-[30%] bg-green-500 text-white font-bold py-2 rounded-xl mt-4 transition-all hover:bg-green-600"
                >
                    {isSubmitting ? "Loading ..." : "Save Changes"}
                </motion.button>
            </form>
        </>
    );
}
