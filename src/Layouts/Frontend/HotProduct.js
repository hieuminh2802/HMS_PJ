import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {BsStarFill, BsStarHalf} from "react-icons/bs";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

function Product()
{   
    const numberFormatter = new Intl.NumberFormat('en-US', {
        style : 'currency',
        currency : 'USD'
    });
    const [hotproduct, setHotProduct] = useState([]);
    useEffect(() => {
        let isMountered = true;
        axios.get(`/api/getHotProduct`).then(res => {
            if(isMountered)
            {
                if(res.data.status === 200)
                {
                    setHotProduct(res.data.products);
                }
            }
        });
        return() => {
            isMountered = false;
        }
    },[]);
    var showProductList = '';
        showProductList = hotproduct.map( (item, idx)=>{
            return (
                    <div className="column-prod item"  key={idx}>
                        <div className="card-prod text-center">
                            <Link to={`/collections/${item.category.slug}/${item.slug}`} style={{ textDecoration: 'none' }} className="text-black">
                                <div className="img-prod">
                                    <img src={`http://localhost:8000/${item.image}`} alt={item.name} />
                                </div>
                                <h3>{item.name}</h3>
                                <div className="star-prod">
                                    <BsStarFill />
                                    <BsStarFill />
                                    <BsStarFill />
                                    <BsStarFill />
                                    <BsStarHalf />
                                </div>
                                <span className="descrip">{item.description}</span>
                                <h5>Price : {numberFormatter.format(item.selling_price)}</h5>
                            </Link>
                        </div>
                    </div>
            )
        });
    return(
        <div>
            <div className="container mt-3">
                <h3 className="d-flex p-4 border-bottom ">Hot Product</h3>
                    <div className="row">
                        <OwlCarousel
                            className="owl-theme"
                            item="3"
                            autoplay
                            nav
                            dots
                            loop
                            >{showProductList}
                        </OwlCarousel>
                    </div>
            </div>
        </div>
    )
}
export default Product;