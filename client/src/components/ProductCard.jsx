import useAuthStore from "../store/authStore.jsx";
import useCartStore from "../store/cartStore.jsx";
import { motion } from "framer-motion";

export default function ProductCard({ name, id, out_of_stock, image, discount, stock, price }) {
    const validPrice = isNaN(parseFloat(price)) ? 0 : parseFloat(price);
    const discountedPrice = discount ? validPrice - (validPrice * (discount / 100)) : validPrice;
    const { isAuth } = useAuthStore();
    const { addItemToCart } = useCartStore();

    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md w-full max-w-sm mx-auto hover:shadow-lg transition-all">
            {/* Top: Product Image Full Cover */}
            <div className="w-full h-52">
                <img
                    src={image || 'https://via.placeholder.com/300'}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{name || "Lorem Ipsum"}</h3>
                {/* Stock Left Info */}
                {stock > 0 && (
                    <p className="text-sm text-gray-600 font-medium mb-2">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {stock} in stock
                    </p>
                )}



                {/* Pricing & Action */}
                <div className="flex items-center justify-between">
                    <div>
                        {discount > 0 ? (
                            <>
                                <p className="text-green-600 font-bold text-2xl">GH₵{discountedPrice.toFixed(2)}</p>
                                <p className="text-sm text-gray-500 line-through">GH₵{validPrice.toFixed(2)}</p>
                            </>
                        ) : (
                            <p className="text-green-600 font-bold text-2xl">GH₵{validPrice.toFixed(2)}</p>
                        )}
                    </div>

                    {isAuth ? (
                        out_of_stock ? (
                            <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-md">Out of stock</span>
                        ) : (
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => addItemToCart(id, name, discountedPrice, image)}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                                Add to Cart
                            </motion.button>
                        )
                    ) : (
                        <span className="text-gray-400 text-sm">Login to place order</span>
                    )}
                </div>
            </div>
        </div>
    );
}
