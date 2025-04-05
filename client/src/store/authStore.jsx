import {create} from "zustand"
import config from "../../config/config.js";
import axios from "axios"
import {toast} from "sonner";

const {SERVER_URL} = config
const useAuthStore = create((set)=>({
    user:  null,
    isAuth: false,
    isLoading: false,
    error:  "",
    isCheckingAuth: false,


    clearError: ()=>{
        set({error:""})
    },
    login: async (data) =>{
        try{
            set({isLoading: true})
            const response = await axios.post(`${SERVER_URL}/v1/auth/login`, data, {
                withCredentials: true
            })

            if(response.data.user){
                set({
                    user: response.data.user,
                    isAuth: true,
                    isLoading: false
                })
            }
            toast.success("Logged in successfully");

        }catch (e){
            console.log("Error: ", e)
            set({isLoading: false, error: e.response.data.error})
        }
    },
    signup: async (data) =>{
        try{
            const response = await axios.post(`${SERVER_URL}/v1/auth/signup`, data, {
                withCredentials: true
            })

            if(response.data.user){
                set({
                    user: response.data.user,
                    isAuth: true,
                    isLoading: false
                })
            }
            toast.success("Account created successfully");
        }catch (e){
            console.log("Error: ",e)
            set({isLoading: false, error: e.response.data.error})
        }
    },
    forgotPassword: async (data) =>{
        try{
            const response = await axios.post(`${SERVER_URL}/v1/auth/forgot-password`, data, {
                withCredentials: true
            })

        }catch (e){
            console.log("Error: ",e)
            toast.error("Something went wrong")
        }
    },
    resetPassword: async( token, data) =>{
        try{
            const response = await axios.post(`${SERVER_URL}/v1/auth/reset-password/${token}`, data, {
                withCredentials: true
            })
            toast.success("Password changed successfully")


        }catch (e){

            set({isLoading: false, error: e.response.data.message})
        }
    },
    checkAuth: async () => {
        set({ isCheckingAuth: true });

        try {
            const response = await axios.get(`${SERVER_URL}/v1/auth/check-auth`, {
                withCredentials: true,
            });

            if (response.data.user) {
                set({ user: response.data.user, isAuth: true });
            } else {
                set({ user: null, isAuth: false });
            }
        } catch (error) {
            console.error("User fetch error:", error?.response?.data || error.message);
            set({ user: null, isAuth: false });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
}))
export default useAuthStore