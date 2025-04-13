import Navbar from "../../components/Navbar.jsx";
import useProductStore from "../../store/productStore.jsx";
import { useEffect } from "react";
import ProductCard from "../../components/ProductCard.jsx";

export default function Shop() {
    const { getProducts, products, isLoading } = useProductStore();

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <Navbar />

            {/*/!* Hero: Ghanaian Elegance *!/*/}
            {/*<section className="relative py-28 px-6 overflow-hidden">*/}
            {/*    /!* Kente Pattern Overlay *!/*/}
            {/*    <div className="absolute inset-0 opacity-40 bg-[url('https://img.freepik.com/premium-vector/kente-seamless-digital-pattern_546783-157.jpg?w=826')] bg-cover bg-center z-0"></div>*/}

            {/*    <div className="relative z-10 max-w-5xl mx-auto text-center">*/}
            {/*        <h1 className="text-6xl font-extrabold text-green-800 leading-tight drop-shadow-lg">*/}
            {/*            Experience Ghana <br /> in Every Product*/}
            {/*        </h1>*/}
            {/*        <p className="mt-4 text-lg md:text-xl text-gray-900 max-w-2xl mx-auto">*/}
            {/*            Discover handcrafted pieces infused with culture — from baskets and beads to oils and more.*/}
            {/*        </p>*/}
            {/*        <button className="mt-6 px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full text-lg font-bold shadow-xl transition duration-300">*/}
            {/*            Explore the Culture 🇬🇭*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</section>*/}

            {/* Product Grid */}
            <section className="bg-white  py-16">
                <div className="max-w-7xl mx-auto">
                    {/*<h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">*/}
                    {/*    Popular Ghanaian Picks*/}
                    {/*</h2>*/}

                    {isLoading ? (
                        <div className="flex justify-center items-center h-48">
                            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {products.map((product, index) => (
                                <ProductCard key={index} {...product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center mt-16">
                            <p className="text-xl text-red-500 font-semibold">
                                No Ghana goodies available yet 😢
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <section className="relative bg-black text-white py-24 px-6">
                {/* Ghanaian pattern background, subtle */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://img.freepik.com/premium-vector/kente-seamless-digital-pattern_546783-157.jpg?w=826')] bg-cover bg-center"></div>

                {/* Content wrapper */}
                <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
                    {/* Text Content */}
                    <div className="md:w-2/3">
                        <h3 className="text-4xl font-extrabold leading-tight">
                            Unlock Exclusive Ghanaian Drops & Culture ✨
                        </h3>
                        <p className="mt-4 text-gray-300 text-lg">
                            Be the first to know when rare beads, shea bundles, or limited crafts land. Straight from artisans, straight to you.
                        </p>
                    </div>

                    {/* Call-to-Action */}
                    <div className="md:w-1/3 w-full">
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold px-6 py-4 rounded-lg shadow-md transition-all">
                            Subscribe to News Letter
                        </button>
                    </div>
                </div>
            </section>


        </>
    );
}
