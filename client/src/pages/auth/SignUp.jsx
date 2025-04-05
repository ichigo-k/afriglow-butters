import { AnimatePresence, motion } from "framer-motion";
import {Link, useNavigate} from "react-router";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import useAuthStore from "../../store/authStore.jsx";
import {useEffect} from "react";

export default function Signup({ setShow, show }) {
    const navigate = useNavigate()
    const {signup, isAuth, error} = useAuthStore()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    useEffect(() => {
        if(isAuth){
            navigate("/")
        }
    }, [isAuth]);

    const submit = async (data) => {
        await signup(data)
    };

    return (
        <motion.div

            className="w-full min-h-screen flex items-center justify-center bg-gray-100 fixed inset-0 p-4"
        >
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}

                    className="w-full max-w-2xl mx-auto flex flex-col lg:flex-row-reverse bg-white rounded-3xl shadow-md overflow-hidden"
                >

                    <div className="hidden lg:block lg:w-2/5 h-auto">
                        <img
                            className="w-full h-full object-cover"
                            src="https://img.freepik.com/free-photo/cashew-butter-dark-background_1150-45402.jpg?t=st=1743360996~exp=1743364596~hmac=5dfafd5572e25cab42182c4b71d5cfdcb2d3c01b473ac08132137239d600addd&w=740"
                            alt="Cashew Butter"
                        />
                    </div>

                    <div className="w-full lg:w-3/5 flex flex-col items-center justify-center text-lg text-gray-800 p-6 relative">
                        <X  size={25} className={"absolute top-2 right-2 text-white"} />
                        <div className="w-full max-w-sm">

                            {/* Logo & Heading */}
                            <h1 className="text-3xl font-bold tracking-wide bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text text-center">
                                Afri<span className="text-black">Glow</span>
                            </h1>
                            <h2 className="text-xl font-semibold text-center mt-2">Create Your Account</h2>

                            <form onSubmit={handleSubmit(submit)}>
                                {error && <p className={"text-red-500 text-sm text-center p-2 w-full border-1 border-red-500 bg-red-200 rounded-md mt-3"}>{error}</p>}
                                
                                {/* Name Input */}
                                <div className="mt-4 border border-gray-300 rounded-xl w-full focus-within:border-green-500">
                                    <input
                                        {...register("name", {
                                            required: "Name is required"
                                        })}
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full px-4 py-2 border-none outline-none bg-transparent"
                                    />
                                </div>
                                {errors.name && <p className={"text-red-500 mt-1 ml-1 text-sm"}>{errors.name.message}</p>}

                                {/* Email Input */}
                                <div className="mt-4 border border-gray-300 rounded-xl w-full focus-within:border-green-500">
                                    <input
                                        {...register("email", {
                                            required: "Email cannot be empty",
                                        })}
                                        type="email"
                                        placeholder="Email"
                                        className="w-full px-4 py-2 border-none outline-none bg-transparent"
                                    />
                                </div>
                                {errors.email && <p className={"text-red-500 mt-1 ml-1 text-sm"}>{errors.email.message}</p>}

                                {/* Password Input */}
                                <div className="mt-4 border border-gray-300 rounded-xl w-full focus-within:border-green-500">
                                    <input
                                        {...register("password", {
                                            required: "Password is required"
                                        })}
                                        type="password"
                                        placeholder="Password"
                                        className="w-full px-4 py-2 border-none outline-none bg-transparent"
                                    />
                                </div>
                                {errors.password && <p className={"text-red-500 mt-1 ml-1 text-sm"}>{errors.password.message}</p>}

                                {/* Submit Button */}
                                <motion.button
                                    disabled={isSubmitting}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-full bg-green-500 text-white font-bold py-2 rounded-xl mt-4 transition-all hover:bg-green-600"
                                >
                                    {isSubmitting ? "Loading ..." : "Sign Up"}
                                </motion.button>

                            </form>

                            <div className="mt-4 text-center">
                                Already have an account? <Link to={"/"} className="text-green-500 hover:underline">Log In</Link>
                            </div>

                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}
