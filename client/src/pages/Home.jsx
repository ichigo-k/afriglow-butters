import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Shop from "./user/Shop.jsx";
import Footer from "../components/Footer.jsx";

export default function Home(){
    return(
        <>
            <Navbar/>
            <Hero/>
            <Shop/>
            <Footer/>
        </>

    )
}