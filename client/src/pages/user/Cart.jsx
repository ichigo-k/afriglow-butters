import Navbar from "../../components/Navbar.jsx";
import useCartStore from "../../store/cartStore.jsx";
import { Plus, Minus } from "lucide-react";
import {Link} from "react-router";
import {motion} from "framer-motion";
import {useForm} from "react-hook-form";

export default function Cart() {
    const {
        cart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        confirmOrder,
        display
    } = useCartStore();

    const getTotal = () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const { register , reset, handleSubmit, formState:{errors, isSubmitting}} = useForm()


    const submit = async  (data) =>{
        await confirmOrder(data, getTotal())
    }

    return (
        <>
            <Navbar />
            <section className="w-full min-h-screen bg-white p-6 mt-[4rem]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Shopping Cart</h2>
                                <p className="text-gray-500 text-md">{cart.length} Items</p>
                            </div>
                            <button
                                onClick={clearCart}
                                className="text-red-500 border border-red-500 hover:bg-red-50 px-4 py-1 rounded text-sm font-medium"
                            >
                                Clear Cart
                            </button>
                        </div>


                        <div className="grid grid-cols-12 py-3 text-sm font-semibold border-b">
                            <div className="col-span-6">PRODUCT DETAILS</div>
                            <div className="col-span-2 text-center">QUANTITY</div>
                            <div className="col-span-2 text-center">PRICE</div>
                            <div className="col-span-2 text-right">TOTAL</div>
                        </div>


                        <div className="space-y-6 mt-4">
                            {cart.map((item, idx) => (
                                <div key={idx} className="grid grid-cols-12 items-center border-b pb-4">
                                    <div className="col-span-6 flex items-center space-x-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-md"
                                        />
                                        <div>
                                            <h3 className="font-medium text-gray-800">{item.name}</h3>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-xs text-red-500 mt-1 hover:underline"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-span-2 flex justify-center items-center space-x-2">
                                        <button
                                            onClick={() => decreaseQuantity(item.id)}
                                            className="px-2 py-1 border border-gray-300 text-gray-600"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="px-2 text-sm font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => increaseQuantity(item.id)}
                                            className="px-2 py-1 border border-gray-300 text-gray-600"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>

                                    <div className="col-span-2 text-center text-sm font-medium">
                                        GH₵{item.price.toFixed(2)}
                                    </div>

                                    <div className="col-span-2 text-right text-sm font-medium">
                                        GH₵{(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6">
                            <Link to="/store" className="text-green-500 hover:underline text-sm">
                                ← Continue Shopping
                            </Link>
                        </div>
                    </div>


                    <form onSubmit={handleSubmit(submit)} className="bg-gray-100 p-6">
                        <h3 className="text-lg font-bold mb-4">Address</h3>

                        <div>
                            <div className="space-y-4">
                                {/* Region */}
                                <div>
                                    <input
                                        {...register("region", {
                                            required: "Region cannot be empty",
                                        })}
                                        type="text"
                                        placeholder="Region"
                                        className="w-full bg-white px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                    />
                                    {errors.region && (
                                        <p className="text-red-500 mt-1 text-sm">{errors.region.message}</p>
                                    )}
                                </div>

                                {/* Town */}
                                <div>
                                    <input
                                        {...register("town", {
                                            required: "Town is required",
                                        })}
                                        type="text"
                                        placeholder="Town"
                                        className="w-full bg-white px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                    />
                                    {errors.town && (
                                        <p className="text-red-500 mt-1 text-sm">{errors.town.message}</p>
                                    )}
                                </div>

                                {/* Landmark (optional) */}
                                <div>
                                    <input
                                        {...register("landmark")}
                                        type="text"
                                        placeholder="Landmark (optional)"
                                        className="w-full  bg-white px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                    />
                                </div>
                            </div>
                        </div>


                        {/*this is where the order summary starts*/ }
                        <h3 className="text-lg font-bold mb-4 mt-4">Order Summary</h3>

                        <div className="flex justify-between text-sm mb-2">
                            <span>Items</span>
                            <span>GH₵{getTotal().toFixed(2)}</span>
                        </div>

                        <div className="border-t mt-4 pt-4">
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total Cost</span>
                                <span>GH₵{getTotal().toFixed(2)}</span>
                            </div>

                            <button disabled={getTotal() <= 0} className={`w-full mt-6  ${getTotal() <= 0 ? 'bg-gray-500' : 'bg-green-500'} text-white py-3 text-sm font-semibold`}>
                                {display}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}
