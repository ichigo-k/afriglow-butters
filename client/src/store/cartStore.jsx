import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';
import config from "../../config/config.js";
import axios from "axios";

const { SERVER_URL } = config;

const useCartStore = create(
    persist(
        (set, get) => ({
            isLoading: false,
            cart: [],
            display: "CONFIRM ORDER",


            addItemToCart: (id, name, price, image) => {
                set((state) => {

                    const existingItemIndex = state.cart.findIndex(item => item.id === id);

                    if (existingItemIndex !== -1) {
                        const updatedCart = [...state.cart];
                        updatedCart[existingItemIndex].quantity += 1;
                        return { cart: updatedCart };
                    } else {
                        const updatedCart = [...state.cart, { id, name, price, quantity: 1, image }];
                        return { cart: updatedCart };
                    }
                });
                toast.success("Item added to cart!");
            },


            increaseQuantity: (id) => {
                set((state) => {
                    const updatedCart = state.cart.map(item =>
                        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                    );
                    return { cart: updatedCart };
                });

            },


            decreaseQuantity: (id) => {
                set((state) => {
                    const updatedCart = state.cart.map(item =>
                        item.id === id && item.quantity > 1
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    );
                    return { cart: updatedCart };
                });

            },


            clearCart: () => {
                set({ cart: [] })
                toast.success("Cart cleared!");
            },

            removeItem:(id)=>{
                set((state) => {
                    const updatedCart = state.cart.filter(item => item.id !== id);  // Remove item by id
                    return { cart: updatedCart };
                });

            },

            confirmOrder: async (address, total) =>{
                try{
                    set({display: "CHECKING OUT ..."})

                    const simplified = get().cart.map(({ id, quantity }) => ({ productId: id, quantity }));
                    let data ={
                        orderDetails: {total},
                        address: address,
                        items: simplified
                    }
                    const response = await axios.post(`${SERVER_URL}/v1/order/`, data, {
                        withCredentials: true
                    })


                    set({display: "INITIALIZING ..."})
                    const paymentInit = await axios.get(`${SERVER_URL}/v1/order/pay/${response.data.order.id}`, {
                        withCredentials: true
                    })


                    window.location.replace(paymentInit.data.data.authorization_url)
                    get().clearCart()

                }catch (e){
                    console.log("Error: ",e)
                }
                finally {
                    set({isLoading: false, display: "CONFIRM ORDER"})
                }
            }
        }),
        {
            name: 'order-cart',
            getStorage: () => localStorage,
        }
    )
);

export default useCartStore;
