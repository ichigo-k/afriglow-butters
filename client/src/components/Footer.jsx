import { Facebook, Twitter, Instagram} from "lucide-react";
import {Link} from "react-router";

export default function Footer() {
    return (
        <footer className="bg-green-600 text-white py-6">
            <div className="container mx-auto px-4 text-center">

                <Link
                    to="/"
                    className="text-3xl md:text-4xl font-bold tracking-tight  text-white mb-4 block"
                >
                    Afri<span className="text-black">Glow</span>
                </Link>


                <div className="flex justify-center gap-6 mb-4 ">
                    <a href="#" className="hover:text-yellow-400 transition-colors">
                        <Facebook size={24} />
                    </a>
                    <a href="#" className="hover:text-yellow-400 transition-colors">
                        <Twitter size={24} />
                    </a>
                    <a href="#" className="hover:text-yellow-400 transition-colors">
                        <Instagram size={24} />
                    </a>
                </div>


                <p className="text-sm text-gray-200">
                    &copy; {new Date().getFullYear()} Afriglow. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
