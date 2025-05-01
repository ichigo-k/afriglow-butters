import {create} from "zustand"
import axios from "axios";
import {toast} from "sonner";
import config from "../../config/config.js";
import {useNavigate} from "react-router";



const {SERVER_URL} = config
const useOrderStore = create((set)=>({
    isLoading: false,
    orders: [],
    items: [],
    order:{},

    getUserOrders: async ()=>{
        set({isLoading: true})
        try{
            const response = await axios.get(`${SERVER_URL}/v1/user/profile`, {
                withCredentials: true
            })
            set({orders: response.data.user.order})
        }catch (e){
            console.log("Error: ",e)
            toast.error("Something went wrong fetching orders")
        }finally {
            set({isLoading:false})
        }
    },

    viewSingleOrder: async (id) =>{
        set({isLoading: true})
        try{
            const response = await axios.get(`${SERVER_URL}/v1/order/${id}`, {
                withCredentials: true
            })
            console.log(response)

            set({items: response.data.order.items, order: response.data.order})
        }catch (e){
            console.log("Error: ",e)
            toast.error("Something went wrong fetching order")
        }finally {
            set({isLoading:false})
        }
    },

    makePayment: async (id) =>{
        set({isLoading: true})
        try{
            const response = await axios.get(`${SERVER_URL}/v1/order/pay/${id}`, {
                withCredentials: true
            })
            window.location.href =response.data.data?.authorization_url

        }catch (e){
            console.log("Error: ",e)
            toast.error("Something went wrong fetching order")
        }finally {
            set({isLoading:false})
        }
    },

    confirmPayment: async (reference_code) =>{
        set({isLoading: true})
        try{
            const response = await axios.get(`${SERVER_URL}/v1/order/verify_payment?reference=${reference_code}`, {
                withCredentials: true
            })
            console.log(response)
            window.location.href="/success"

        }catch (e){
            console.log("Error: ",e)
            toast.error("Order not paid!")
        }finally {
            set({isLoading:false})
        }
    },



}))

export default useOrderStore