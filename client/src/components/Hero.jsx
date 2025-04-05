export default function Hero() {
    return (
        <section className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-100 px-6">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="https://img.freepik.com/free-photo/peanut-butter-sandwiches-toasts-with-raspberry-jam_114579-24592.jpg?t=st=1743529890~exp=1743533490~hmac=bdf9acd5773f821e7c6114ccfb946ca4ff39660ec3ab4294aaa10d9305342715&w=1380"
                    alt="Shea & Peanut Butter"
                    className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Content Wrapper */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto items-center">
                {/* Left Content */}
                <div className="text-white md:pr-10">
                    <h1 className="text-5xl font-extrabold leading-tight">
                        Indulge in the <span className="text-green-600">Natural Goodness</span>
                    </h1>
                    <p className="mt-4 text-lg text-white">
                        Experience the rich, creamy taste of 100% natural shea & peanut butter—crafted for health and made with care.
                    </p>

                    <div className="mt-6 flex items-center space-x-4">
                        <button className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition">
                            Shop Now
                        </button>
                        <button className="px-6 py-3 bg-white border border-green-500 text-green-600 font-bold rounded-lg hover:bg-green-100 transition">
                            Learn More
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="mt-8 flex space-x-6">
                        <div>
                            <h3 className="text-2xl font-bold">100%</h3>
                            <p className="text-white">Organic</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">500+</h3>
                            <p className="text-white">Happy Customers</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">30+</h3>
                            <p className="text-white">Stores Available</p>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    );
}
