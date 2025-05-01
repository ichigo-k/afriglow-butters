import {useParams, Link} from "react-router";
import Navbar from "../../components/Navbar.jsx";
import useOrderStore from "../../store/orderStore.jsx";
import {useEffect} from "react";
import {Minus, Plus} from "lucide-react";


export default function viewOrder(){
    const {id} = useParams()
    const {viewSingleOrder, items, order, makePayment, confirmPayment} = useOrderStore()

    useEffect(() => {
        viewSingleOrder(id)
    }, [id]);
    return(
        <>
            <Navbar/>
            <section className="w-full min-h-screen bg-white p-6 mt-[5rem]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Order Details</h2>
                                <div className={"flex items-center gap-x-2"}>
                                    <p className="text-gray-500 text-md">{items.length} Items</p>
                                    <span
                                        className={`font-semibold ${
                                            order.paid ? "text-green-600" : "text-red-600"
                                        }`}
                                    >
                                            {order.paid ? "Paid" : "Unpaid"}
                                        </span>
                                </div>
                            </div>
                            <div>
                                {order.status}
                            </div>
                        </div>


                        <div className="grid grid-cols-12 py-3 text-sm font-semibold border-b">
                            <div className="col-span-6">PRODUCT DETAILS</div>
                            <div className="col-span-2 text-center">QUANTITY</div>
                            <div className="col-span-2 text-center">PRICE</div>
                            <div className="col-span-2 text-right">TOTAL</div>
                        </div>


                        <div className="space-y-6 mt-4">
                            {items.map((item, idx) => (
                                <div key={idx} className="grid grid-cols-12 items-center border-b pb-4">
                                    <div className="col-span-6 flex items-center space-x-4">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="w-20 h-20 object-cover rounded-md"
                                        />
                                        <div>
                                            <h3 className="font-medium text-gray-800">{item.product.name}</h3>

                                        </div>
                                    </div>
                                    <div className="col-span-2 flex justify-center items-center space-x-2">

                                        <span className="px-2 text-sm font-medium">{item.quantity}</span>

                                    </div>



                                    <div className="col-span-2 text-center text-sm font-medium">
                                        GH₵{parseInt(item.product.price).toFixed(2)}
                                    </div>

                                    <div className="col-span-2 text-right text-sm font-medium">
                                        GH₵{(item.product.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>


                    </div>


                    <div  className="bg-gray-100 p-6">
                        <h3 className="text-lg font-bold mb-4">Address</h3>

                        <div>
                            <div className="space-y-4">
                                {/* Region */}
                                <div>
                                    <input

                                        type="text"
                                        placeholder="Region"
                                        className="w-full bg-white px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                        disabled={true}
                                        defaultValue={order.address?.region}
                                    />

                                </div>

                                {/* Town */}
                                <div>
                                    <input

                                        type="text"
                                        placeholder="Town"
                                        className="w-full bg-white px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                        disabled={true}
                                        defaultValue={order.address?.town}
                                    />

                                </div>

                                {/* Landmark (optional) */}
                                <div>
                                    <input

                                        type="text"
                                        placeholder="Landmark (optional)"
                                        className="w-full  bg-white px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                        disabled={true}
                                        defaultValue={order.address?.landmark}
                                    />
                                </div>
                            </div>
                        </div>


                        {/*this is where the order summary starts*/ }
                        <h3 className="text-lg font-bold mb-4 mt-4">Order Summary</h3>

                        <div className="flex justify-between text-sm mb-2">
                            <span>Items</span>
                            <span>GH₵ {order.total}</span>
                        </div>

                        <div className="border-t mt-4 pt-4">
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total Cost</span>
                                <span>GH₵ {order.total}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => makePayment(order?.id)}
                            disabled={!order?.reference}
                            className={`w-full mt-6 text-white py-3 text-sm font-semibold ${
                                !order?.reference ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500'
                            }`}
                        >
                            MAKE PAYMENT
                        </button>

                        <button
                            onClick={() => confirmPayment(order?.reference)}
                            disabled={order?.paid}
                            className={`w-full mt-6 text-white py-3 text-sm font-semibold ${
                                order?.paid ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500'
                            }`}
                        >
                            ALREADY MADE PAYMENT?
                        </button>

                    </div>
                </div>
            </section>
        </>
    )
}