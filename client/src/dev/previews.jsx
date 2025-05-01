import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Navbar from "../components/Navbar.jsx";
import ProductCard from "../components/ProductCard.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Navbar">
                <Navbar/>
            </ComponentPreview>
            <ComponentPreview path="/ProductCard">
                <ProductCard/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews