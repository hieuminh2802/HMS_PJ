import Carousel1 from "../../Layouts/Frontend/CarouselFade";
import Product from "../../Layouts/Frontend/Product";
import Category from "../../Layouts/Frontend/Category";
import Footer from "../../Layouts/Frontend/Footer";
import Card from "../../Layouts/Frontend/Card";
import Content from "../../Layouts/Frontend/Content";
import HotProduct from "../../Layouts/Frontend/HotProduct";
import "../../Assets/frontend/css/product.css";

function Home () {

    
    return (
        <div className="container">
            <Carousel1 />
            <Category />  
            {/* <HotProduct />   */}
            <Product />
            <Content />
            <Card />
            <Footer />
        </div>
    );
}

export default Home;