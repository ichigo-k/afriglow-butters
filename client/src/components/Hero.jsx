import { Link } from "react-router";

export default function Hero() {
    return (
        <section className="relative w-full h-[80vh] flex items-center justify-center bg-gray-100 py-5 px-6">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="https://img.freepik.com/free-photo/peanut-butter-sandwiches-toasts-with-raspberry-jam_114579-24592.jpg?t=st=1743529890~exp=1743533490~hmac=bdf9acd5773f821e7c6114ccfb946ca4ff39660ec3ab4294aaa10d9305342715&w=1380"
                    alt="Natural Products"
                    className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Content Wrapper */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto items-center">
                {/* Left Content */}
                <div className="text-white md:pr-10 text-center lg:text-left">
                    <h1 className="text-5xl font-extrabold leading-tight">
                        Discover the <span className="text-green-600">Power of Nature</span>
                    </h1>
                    <p className="mt-4 text-lg text-white">
                        Shop authentic shea butter, African black soap, and other nourishing natural products—crafted with care from the heart of Africa.
                    </p>

                    <div className="mt-6 flex items-center space-x-4 justify-center lg:justify-start">
                        <button  className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition">
                            Shop Now
                        </button>
                        <button className="px-6 py-3 bg-white border border-green-500 text-green-600 font-bold rounded-lg hover:bg-green-100 transition">
                            Learn More
                        </button>
                    </div>

                    <p className="mt-4 italic text-sm text-white">
                        Pure. Potent. Proudly African.
                    </p>

                    {/* Stats */}
                    <div className="mt-8 flex space-x-6 justify-center lg:justify-start">
                        <div>
                            <h3 className="text-2xl font-bold">100%</h3>
                            <p className="text-white">Natural Ingredients</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">500+</h3>
                            <p className="text-white">Satisfied Customers</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">30+</h3>
                            <p className="text-white">Trusted Retailers</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
