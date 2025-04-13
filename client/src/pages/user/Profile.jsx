import Navbar from "../../components/Navbar.jsx";
import { NavLink, Outlet } from "react-router";
import {
    User,
    ClipboardList,
    LogOut,
} from "lucide-react";


export default function Profile({children}) {
    const linkClasses =
        "flex items-center gap-2 text-gray-600 text-lg font-medium px-4 py-2 rounded-md transition-all duration-200 hover:bg-gray-100 hover:translate-x-1";

    const activeLinkClasses = "bg-gray-200 text-blue-600";

    return (
        <>
            <Navbar />

            <div className="w-full flex overflow-hidden " style={{ maxHeight: "calc(100vh - 5rem)" }}>
                <aside className="w-1/5 bg-white border-r p-6 border-gray-100 hidden md:block relative  ">
                    <nav className="flex flex-col space-y-3  h-full relative">
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                `${linkClasses} ${isActive ? activeLinkClasses : ""}`
                            }
                        >
                            <User className="w-5 h-5" />
                            Profile
                        </NavLink>

                        <NavLink
                            to="/orders"
                            className={({ isActive }) =>
                                `${linkClasses} ${isActive ? activeLinkClasses : ""}`
                            }
                        >
                            <ClipboardList className="w-5 h-5" />
                            Order History
                        </NavLink>

                        <button className="bottom-5 absolute w-full p-2 bg-red-500 text-white text-sm font-semibold flex items-center justify-center gap-2 rounded-md hover:bg-red-600 transition-all duration-200">
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </nav>
                </aside>

                <main className="w-full md:w-4/5 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </>
    );
}
