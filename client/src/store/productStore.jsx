import {create} from "zustand"
import axios from "axios";
import {toast} from "sonner";
import config from "../../config/config.js";


const {SERVER_URL} = config
const useProductStore = create((set)=>({
    products: [],
    isLoading: false,
    cart: [],

    getProducts: async () =>{
        set({isLoading: true})
        try{
            const response = await axios.get(`${SERVER_URL}/v1/products/`, {
                withCredentials: true
            })
            console.log(response)
            set({products: response.data.products})

        }catch (e){
            console.log("Error: ",e)
            toast.error("Something went wrong fetching products")
        }finally {
            set({isLoading:false})
        }
    },


}))

export default useProductStore