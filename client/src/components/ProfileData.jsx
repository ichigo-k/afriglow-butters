import useAuthStore from "../store/authStore.jsx";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {motion} from "framer-motion";


export default function ProfileData(){
    const {user, updateInfo, error} = useAuthStore()
    const { register , reset, handleSubmit, formState:{errors, isSubmitting}} = useForm()
    useEffect(() => {
        if (user) {
            reset({
                email: user.email ,
                name: user.name,
                phone: user.phone
            });
        }
    }, [user, reset]);

    const submit = async  (data) =>{
        await updateInfo(data)
        reset();
    }



    return (
        <>
            <h1 className={"text-3xl font-semibold"}>User Details</h1>

            {error && <p className={"text-red-500 text-sm mt-5"}>{error}</p>}


            <form className={"max-w-md"} onSubmit={handleSubmit(submit)} >

                <label className={"text-sm text-gray-800 ml-1 font-bold mt-[1rem] block "}>Name</label>
                <div className="mt-1 border border-gray-300 rounded-xl w-full focus-within:border-green-500">

                    <input
                        {... register("name")}
                        type="text"
                        placeholder="Name"
                        className="w-full px-4 py-2 border-none outline-none bg-transparent"
                    />
                </div>
                {errors.name &&  <p className={"text-red-500 mt-1 ml-1 text-sm"}>{errors.name.message}</p>}


                <label className={"text-sm text-gray-800 ml-1 font-bold mt-[1rem] block "}>Email</label>
                <div className="mt-1 border border-gray-300 rounded-xl w-full focus-within:border-green-500">
                    <input
                        {... register("email")}
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border-none outline-none bg-transparent"
                    />
                </div>
                {errors.email &&  <p className={"text-red-500 mt-1 ml-1 text-sm"}>{errors.email.message}</p>}


                <label className={"text-sm text-gray-800 ml-1 font-bold mt-[1rem] block "}>Phone</label>
                <div className="mt-1 border border-gray-300 rounded-xl w-full focus-within:border-green-500">
                    <input
                        {... register("phone")}
                        type="text"
                        placeholder="Phone"
                        className="w-full px-4 py-2 border-none outline-none bg-transparent"
                    />
                </div>
                {errors.phone &&  <p className={"text-red-500 mt-1 ml-1 text-sm"}>{errors.phone.message}</p>}


                <motion.button
                    disabled={isSubmitting}
                    whileTap={{ scale: 0.9 }}
                    className="w-[30%] bg-green-500 text-white font-bold py-2 rounded-xl mt-4 transition-all hover:bg-green-600"
                >
                    { isSubmitting ? "Loading ..." : "Save Changes" }
                </motion.button>


            </form>


        </>
    )
}