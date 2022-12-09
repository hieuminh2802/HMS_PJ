import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import {Link} from "react-router-dom";


function ViewProduct(props)
{
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);


    const productCount = product.length;
    useEffect(()=>{

        let isMounted = true;

        const product_slug = props.match.params.slug;
        axios.get(`/api/fetchproducts/${product_slug}`).then(res => {
           if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setProduct(res.data.product_data.product);
                    setCategory(res.data.product_data.category);
                    setLoading(false);
                }
                else if(res.data.status === 400)
                {
                    swal("Warning",res.data.message,"");
                }
                else if(res.data.status === 404)
                {
                    history.push('/collections');
                    swal("Warning",res.data.message,"error");
                }
            } 
        });
        return() => {
            isMounted = false
        };
    }, [props.match.params.slug,history]);

    if(loading)
    {
        return (
            <div>
                <div className="vh-100 d-flex justify-content-center align-items-center">  
                    <div className="row">
                        <div className="loading d-flex justify-content-center align-items-center">
                            <div className="spinner-border text-dark" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    <h4 className="text-center">Loading Product</h4>
                    </div>
                </div>
            </div>
        );   
    }
    else
    {
        var showProductList = '';
        if(productCount)
        {
            showProductList = product.map((item,idx) =>{
                return(
                    <div className="column-prod"  key={idx}>
                        <div className="card-prod">
                            <div className="img-prod">
                                <Link to={`/collections/${item.category.slug}/${item.slug}`} style={{ textDecoration: 'none' }} className="text-black">
                                    <img src={`http://localhost:8000/${item.image}`} alt={item.name} />
                                </Link>
                            </div>
                            <h3>{item.name}</h3>
                        </div>
                    </div>
                )
            });
        }
        else
        {
            showProductList = 
            <div>
                <h4 className="infomation">No Product Availiable for {category.name}</h4>
            </div>
        }        
    }

    return(
        <div>
            <div className="py-3 bg-dark text-white">
                <div className="container mt-2">
                    <h6><Link to={"/Collections"} style={{ textDecoration: 'none' }} className="text-white" >Collections</Link> / {category.name}</h6>
                </div>
            </div>
            <div className="py-3">
                <div className="container">
                    <div className="row-prod">
                        {showProductList}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ViewProduct;