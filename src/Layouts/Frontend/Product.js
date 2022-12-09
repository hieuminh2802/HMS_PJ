import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {BsStarFill, BsStarHalf} from "react-icons/bs";
import ReactPaginate from "react-paginate";

function Product()
{   
 
    const numberFormatter = new Intl.NumberFormat('en-US', {
        style : 'currency',
        currency : 'USD'
    });
    const [product, setProduct] = useState([]);

    useEffect(() => {
        let isMountered = true;
        axios.get(`/api/getProduct`).then(res => {
            if(isMountered)
            {
                if(res.data.status === 200)
                {
                    setProduct(res.data.products);
                }
            }
        });
        return() => {
            isMountered = false;
        }
    },[]);

    

    const  showProductList = product.map( (item, idx)=>{
            return (
                <div className="column-prod  fw-bold"  key={idx}>
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
                <h3 className="d-flex p-4 border-bottom ">All Product</h3>
                    <div className="row-prod">
                        {showProductList}
                    </div>
            </div>
            
        </div>
    )
}
export default Product;