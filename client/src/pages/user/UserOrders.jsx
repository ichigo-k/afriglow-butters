import Profile from "./Profile.jsx";
import useOrderStore from "../../store/orderStore.jsx";
import { useEffect } from "react";
import {Link} from "react-router";

export const UserOrders = () => {
    const { getUserOrders, orders } = useOrderStore();

    useEffect(() => {
        getUserOrders();
    }, []);

    return (
        <Profile>
            <h1 className="text-3xl font-semibold mb-6">Order History</h1>

            {orders.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-sm">
                        <thead className="bg-gray-100 text-gray-600 text-sm">
                        <tr>
                            <th className="text-left py-3 px-4">Date</th>
                            <th className="text-left py-3 px-4">Order ID</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Total</th>
                            <th className="text-left py-3 px-4">Paid</th>
                            <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="py-3 px-4">
                                    {new Date(order.createdAt).toLocaleString("en-GB", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </td>
                                <td className="py-3 px-4">{order.id}</td>
                                <td className="py-3 px-4 text-blue-600 font-medium">{order.status}</td>
                                <td className="py-3 px-4 font-medium">
                                    GHS {parseFloat(order.total).toFixed(2)}
                                </td>
                                <td className="py-3 px-4">
                                        <span
                                            className={`font-semibold ${
                                                order.paid ? "text-green-600" : "text-red-600"
                                            }`}
                                        >
                                            {order.paid ? "Paid" : "Unpaid"}
                                        </span>
                                </td>
                                <td className="py-3 px-4">
                                    <Link to={`/order/${order.id}`}
                                        className="text-green-500"

                                    >
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500">Nothing to see</p>
            )}
        </Profile>
    );
};
